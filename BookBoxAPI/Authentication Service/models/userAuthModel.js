const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AdminType = require('./adminTypeModel');

const userAuthSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: [true, 'User Id is required'],
    unique : true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!'
    }
  },
  passwordChangedAt: {type : Date, select: false},
  passwordResetToken: {type : String, select: false},
  passwordResetExpires: {type : Date, select: false},
  active: {
    type: Boolean,
    default: true
  },
  admin: {
    type: Boolean,
    default: false
  },
  root: {
    type: Boolean,
    default: false
  },
  adminType: {
    type: mongoose.Schema.ObjectId,
    ref : 'Admin-Type',
    required: [
      function() { return this.admin; },
      'Admin type is required for an admin'
    ]
  }
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
}
);



userAuthSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userAuthSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userAuthSchema.pre(/^find/, function(next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

userAuthSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userAuthSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userAuthSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
const UserAuth = mongoose.model('User-Auth', userAuthSchema);
module.exports = UserAuth;
