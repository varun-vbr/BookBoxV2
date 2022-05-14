const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const UserReview = require('./../models/userReviewModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const axios = require('axios');

exports.protect = catchAsync(async (req, res, next) => {
    const cookie = req.body.token;
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

exports.addReview = catchAsync(async (req, res, next) => {
    try{
        const userReview = await UserReview.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                userReview
            }
        });
    } catch(e){
        return next(
            new AppError(e.response.data.message, 500)
        );
    }
});

exports.getReview = catchAsync(async (req, res, next) => {
    try{
        const reviews = await UserReview.find({bookId: req.params.bookId});
        res.status(200).json({
            status: 'success',
            data: {
                reviews
            }
        });
    }catch(e){
        return next(
            new AppError(e.response.data.message, 500)
        ); 
    }
});