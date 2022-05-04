const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const UserDetails = require('./../models/userDetailsModel');
const Plan = require('./../models/planModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const axios = require('axios');

exports.isLoggedIn = catchAsync(async (req, res, next) => {
    let cookie = '';
    if(req.cookies.jwt){
        cookie = req.cookies.jwt;
    }else if(req.body.headers){
        cookie = req.body.headers.Cookie.jwt;
    }
    else{
        cookie = req.headers.cookie;
    }
        
    if(cookie){
        try{
            const response = await axios.get(`http://${process.env.AUTHENTICATION_SERVICE_SERVICE_HOST}:3000/api/v1/users/auth/isLoggedIn`, {
                headers: {
                    Cookie: "jwt=" + cookie + ";"
                }
            });
            if(response.status != 200) {
                return next(
                    new AppError('You are not logged in! Please log in to get access.', 401)
                  );
            }
            res.locals.userId = response.data.currentUser.userId;
            } 
            catch(e){
                return next(
                    new AppError('You are not logged in! Please log in to get access.', 401)
                ); 
            }
        }else{
            return next(
                new AppError('You are not logged in! Please log in to get access.', 401)
            ); 
        }
            
    next();
  });
  
exports.signup =  catchAsync(async (req, res, next) => {
    const newUser = await UserDetails.create({userId : req.body.data.userId, name : req.body.data.name, email : req.body.data.email, plan : req.body.data.plan});
    let newUserPopulated = await UserDetails.findOne({ userId : newUser.userId }).populate('plan');
    var response = {};
    try{    
        if(req.body.data.admin || req.body.data.root){
            response = await axios.post(`http://${process.env.AUTHENTICATION_SERVICE_SERVICE_HOST}:3000/api/v1/users/auth/admin`, {
                data : {
                        userId : req.body.data.userId,
                        password : req.body.data.password,
                        passwordConfirm : req.body.data.passwordConfirm,
                        admin : req.body.data.admin,
                        root : req.body.data.root,
                        adminType : req.body.data.adminType
                    },
                headers: {
                    Cookie: req.body.headers.Cookie                
                }
            });
            if(response.status != 201) {
                const delUser = await UserDetails.findOneAndRemove({ userId : newUser.userId});
                return next(
                    new AppError('There was an error saving user credentials', response.status)
                );
            }
        }
        else{
            response = await axios.post(`http://${process.env.AUTHENTICATION_SERVICE_SERVICE_HOST}:3000/api/v1/users/auth/signUp`, {
                data : {
                    userId : req.body.data.userId,
                    password : req.body.data.password,
                    passwordConfirm : req.body.data.passwordConfirm
                }
            });
            if(response.status != 201) {
                const delUser = await UserDetails.findOneAndRemove({ userId : newUser.userId});
                return next(
                    new AppError('There was an error saving user credentials', response.status)
                );
            }
        }
        res.status(201).json({
            status: 'success',
            data: {
                userDetail : newUserPopulated,
                userAuth :  response.data.data.user,
                token :  response.data.data.token
            }
          });
        } 
        catch(e){
            const delUser = await UserDetails.findOneAndRemove({ userId : newUser.userId});
            return next(
                new AppError(e.response.data.message, e.response.data.error.statusCode)
            ); 
        }
});

exports.getUserDetailsByEmail = catchAsync(async (req, res, next) => {
    const userDetail = await UserDetails.findOne({email: req.params.email}).populate('plan');
    if(userDetail != null){
        res.status(200).json({
            status: 'success',
            data: {
                userDetail
            }
          });
    } else{
        return next(
            new AppError('User not found', 404)
          );
    }
})

exports.getUserDetails = catchAsync(async (req, res, next) => {
    const userDetail = await UserDetails.findOne({userId: res.locals.userId}).populate('plan');
    if(userDetail != null){
        res.status(200).json({
            status: 'success',
            data: {
                userDetail
            }
          });
    } else{
        return next(
            new AppError('User not found', 404)
          );
    }
})
  
exports.updateUser = catchAsync(async (req, res, next) => {
    const plan = await Plan.findOne({ planName : req.body.data.planName });
    if(plan){
        await UserDetails.findOneAndUpdate({userId: res.locals.userId}, {plan});
        res.status(200).json({
            status: 'success'
        });
    } else{
        return next(
            new AppError('Plan not found', 404)
        );
    }
    
  });

  exports.findUserById =  catchAsync(async (req, res, next) => {
    try{
        const userDetail = await UserDetails.findOne({userId : req.params.userId}).populate('plan');

        if(!userDetail){
          return next(new AppError('There are no users by this Id', 404));
        }
        response = await axios.get(`http://${process.env.AUTHENTICATION_SERVICE_SERVICE_HOST}:3000/api/v1/users/auth/user/`+req.params.userId, {
            headers: {
                Cookie: "jwt=" + req.headers.cookie + ";"                
            }
        });
        if(response.status != 200) {
            return next(
                new AppError('There was an error finding user auth details', response.status)
            );
        }
        res.status(200).json({
          status: 'success',
          data: {
            userDetail,
            userAuth :  response.data.data.userAuth
          }
        });
      } catch(e){
          return next(new AppError(e.response.data.message, e.response.status));
      }
  });
  
  