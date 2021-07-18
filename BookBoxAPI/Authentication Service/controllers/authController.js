const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const UserAuth = require('./../models/userAuthModel');
const AdminType = require('../models/adminTypeModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const Email = require('./../utils/email');
const { db } = require('../models/adminTypeModel');
const axios = require('axios');


const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  
  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  });

  // Remove hidden fields from output
  user.password = undefined;
  user.admin = undefined;
  user.root = undefined;
  user.active = undefined;
  
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.signup =  catchAsync(async (req, res, next) => {
  const newUser = await UserAuth.create(req.body.data);
  createSendToken(newUser, 201, req, res);
 });

exports.login = catchAsync(async (req, res, next) => {
  const  password  = req.body.password;
  let userId = -1;
  
  try{
      const response = await axios.get('http://localhost:3001/api/v1/users/register/user/'+req.body.email);
      if(response.status != 200) {
          return next(
              new AppError('Invalid Email Address', response.status)
          );
      } 
      userId = response.data.data.userDetail.userId;
  } 
  catch(e){
      return next(
          new AppError('There was an error logging in', 500)
      ); 
  }
  // 1) Check if email and password exist
  if (!userId || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await UserAuth.findOne({ userId }).populate('adminType').select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, req, res);
});

exports.createAdmin = catchAsync(async (req, res, next) => {
  const newUser = await UserAuth.create(req.body);
  const newUserPopulated = await UserAuth.findOne({ userId : newUser.userId }).populate('adminType').select('+password');
  createSendToken(newUserPopulated, 201, req, res);
 });

exports.createAdminType = catchAsync(async (req, res, next) => {
  const newAdminType = await AdminType.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      newAdminType
    }
  });
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: 'success' });
};

exports.isUserSignUp = catchAsync(async (req, res, next) => {
  if(req.body.admin || req.body.root){
    return next(new AppError('You do not have permission to perform this action', 403));
  }
  next();
})

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await UserAuth.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }
  
  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.isUserloggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await UserAuth.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      next();
    } catch (err) {
      return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }
  }
  next();
};

exports.isUserAdmin = async (req, res, next) => {
     if(!res.locals.user && (!res.locals.user.admin || !res.locals.user.root))
          return next(new AppError('You do not have permission to perform this action', 403));
    next();
};

exports.restrictTo = () => {
  return (req, res, next) => {
    const requestedAdminType  = AdminType.findById(req.body.adminType);
    if(res.locals.user.root) next();
    let userAdmin = userAdmin && res.locals.user.userProfileAccessRW && requestedAdminType.userProfileAccessRW;
    let supportAdmin = userAdmin;
    userAdmin =  userAdmin && res.locals.user.adminProfileAccessRW && requestedAdminType.adminProfileAccessRW;
    bookAdmin = res.locals.user.bookMaintenanceAccess && requestedAdminType.bookMaintenanceAccess;
    bookAdmin = bookAdmin && res.locals.user.categoryMaintenanceAccess && requestedAdminType.categoryMaintenanceAccess;
    supportAdmin = supportAdmin && res.locals.user.userSupportRoleGranted && requestedAdminType.userSupportRoleGranted;
    const success = userAdmin || supportAdmin || bookAdmin
    if (!success) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};


// Only for rendered pages, no errors!
exports.isLoggedIn = catchAsync(async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await UserAuth.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      res.status(200).json({
        status: 'success',
        currentUser
      });
    } catch (err) {
        new AppError('You are not logged in! Please log in to get access.', 401);
    }
  } else{
      res.status(401).json({
        status: 'fail',
        message: 'You are not logged in! Please log in to get access.'
      });
  }
});
 
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await UserAuth.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  try {
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/auth/resetPassword/${resetToken}`;
    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await UserAuth.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  createSendToken(user, 200, req, res);
});

exports.delete = catchAsync(async (req, res, next) => {
  await UserAuth.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await UserAuth.findById(req.user.id).select('+password');

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, req, res);
});
