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
    const cookie = req.cookies.jwt;
    if(cookie){
        try{
            const response = await axios.get('http://localhost:3000/api/v1/users/auth/isLoggedIn', {
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
    const newUser = await UserDetails.create({userId : req.body.userId, name : req.body.name, email : req.body.email, plan : req.body.plan});
    try{
            const response = await axios.post('http://localhost:3000/api/v1/users/auth/signUp', {
                data : {
                    userId : req.body.userId,
                    password : req.body.password,
                    passwordConfirm : req.body.passwordConfirm
                }
            });
            if(response.status != 201) {
                return next(
                    new AppError('There was an error saving user credentials', response.status)
                );
            }
        } 
        catch(e){
            return next(
                new AppError('There was an error saving user credentials', 500)
            ); 
        }
    res.status(201).json({
        status: 'success',
        data: {
          newUser
        }
      });
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
    const plan = await Plan.findOne({ planName : req.body.planName });
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
  
  