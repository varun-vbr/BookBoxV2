const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const UserPref = require('./../models/userPrefModel');
const Playlist = require('./../models/playlistModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const axios = require('axios');

exports.signup =  catchAsync(async (req, res, next) => {
    const newUser = await UserPref.create({pfdCategories : req.body.pfdCategories, wishList : req.body.wishList, playlists: req.body.playlists});
    try{
       const response = await axios.post('http://localhost:3001/api/v1/users/register/signup', {
            data : {
                userId : newUser.userId,
                name : req.body.name, 
                email : req.body.email, 
                plan : req.body.plan,
                admin : req.body.admin,
                root : req.body.root,
                adminType : req.body.adminType,
                password : req.body.password,
                passwordConfirm : req.body.passwordConfirm
            },
            headers: {
                Cookie: req.cookies
            }
        });
        if(response.status != 201) {
            const delUser = await UserPref.findOneAndRemove(newUser.userId);
            return next(
                new AppError('There was an error saving user credentials', response.status)
            );
        }
        res.cookie('jwt', response.data.data.token, {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
            secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
        });
        res.status(201).json({
            status: 'success',
            token :  response.data.data.token,
            data: {
                userDetail : response.data.data.userDetail,
                userAuth :  response.data.data.userAuth,
                userPrefs : newUser
            }
          });
    } 
    catch(e){
        const delUser = await UserPref.findOneAndRemove({ userId : newUser.userId});
        return next(
            new AppError(e.response.data.message, e.response.data.error.statusCode)
        ); 
    }
});

exports.login =  catchAsync(async (req, res, next) => {
    let responseUserDetail = {};
    let responseUserAuth = {};    
    try{
         responseUserDetail = await axios.get('http://localhost:3001/api/v1/users/register/user/'+req.body.email);
         if(responseUserDetail.status != 200) {
             return next(
                 new AppError('There was an error logging in', responseUserDetail.status)
             );
         }
         const userPrefs = await UserPref.findOne({userId : responseUserDetail.data.data.userDetail.userId}).populate('playlists');
         responseUserAuth = await axios.post('http://localhost:3000/api/v1/users/auth/login', {
            data : {
                userId : responseUserDetail.data.data.userDetail.userId,
                password : req.body.password
            }
        });
        if(responseUserAuth.status != 200) {
             return next(
                 new AppError('There was an error logging in', responseUserAuth.status)
             );
         }
         res.cookie('jwt', responseUserAuth.data.data.token, {
             expires: new Date(
               Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
             ),
             httpOnly: true,
             secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
         });
         res.status(200).json({
             status: 'success',
             token :  responseUserAuth.data.data.token,
             data: {
                 userDetail : responseUserDetail.data.data.userDetail,
                 userAuth :  responseUserAuth.data.data.user,
                 userPrefs
             }
           });
     } 
     catch(e){
         return next(
             new AppError(e.response.data.message, e.response.data.error.statusCode)
         ); 
     }
});

exports.protect = catchAsync(async (req, res, next) => {
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

exports.update = catchAsync(async (req, res, next) => {
    try{
            response = await axios.patch('http://localhost:3001/api/v1/users/register/update',{
                data : {
                    planName : req.body.planName
                },
                headers: {
                    Cookie: req.cookies
                }
            });
            if(response.status != 200) {
                return next(
                    new AppError('There was an error updating plan', response.status)
                );
            }
        }
    catch(e){
        return next(
            new AppError(e.response.data.message, e.response.data.error.statusCode)
        ); 
    }
    res.status(200).json({
        status: 'success'
    });
  });

  exports.logout = catchAsync(async (req, res, next) => {
    try{
        const response = await axios.get('http://localhost:3000/api/v1/users/auth/logout', {
                    headers: {
                        Cookie: req.cookies
                    }
        });
        if(response.status != 200) {
            return next(
                new AppError('There was an error logging out', response.status)
            );
        }else{
            res.cookie('jwt', 'loggedout', {
                expires: new Date(Date.now() + 10 * 1000),
                httpOnly: true
              });
            res.status(200).json({ status: 'success' });
        }
    }
    catch(e){
        return next(
            new AppError(e.response.data.message, e.response.data.error.statusCode)
        ); 
    }  
  });

  exports.updatePassword = catchAsync(async (req, res, next) => {
    try{
        const response = await axios.patch('http://localhost:3000/api/v1/users/auth/updatePassword', {
                    headers: {
                        Cookie: req.cookies
                    }
        });
        if(response.status != 200) {
            return next(
                new AppError('There was an error updating password', response.status)
            );
        }
        else{
            res.status(200).json({ status: 'success' });
        }
    }
    catch(e){
        return next(
            new AppError(e.response.data.message, e.response.data.error.statusCode)
        ); 
    }
  });

  exports.addPlaylist = catchAsync(async (req, res, next) => {
    try{
      const playlist = await Playlist.create(req.body);
      let user = await UserPref.findOne({userId : req.body.userId});
      if(!user){
        return next(
            new AppError('There was an error assigning playlist to user: User not found', 404)
        ); 
      }
      user.playlists.push(playlist._id);
      await user.save();
      res.status(201).json({
        status: 'success',
        data: {
            user
        }
      });
    }
    catch(e){
        return next(
            new AppError(e.response.data.message, 500)
        ); 
    }
  })

  exports.addPlaylistBook = catchAsync(async (req, res, next) => {
    try{
        const playlist = await Playlist.findOne({playlistId : req.body.playlistId});
        if(!playlist){
            return next(
                new AppError('There was an error updating playlist of the user: Playlist not found', 404)
            ); 
          } 
            playlist.playlistBooks.push(req.body.bookId);
            await playlist.save();
            res.status(200).json({
                status: 'success',
                data: {
                    playlist
                }
              });
    }
    catch(e){
        return next(
            new AppError(e.response.data.message, 500)
        );
    }  
  })

  exports.removePlaylistBook = catchAsync(async (req, res, next) => {
    try{
        const playlist = await Playlist.findOne({playlistId : req.body.playlistId});;
        if(!playlist){
            return next(
                new AppError('There was an error updating playlist of the user: Playlist not found', 404)
            ); 
          } 
            for(let i = 0; i < playlist.playlistBooks.length; i++)
                {
                    if(req.body.bookId == playlist.playlistBooks[i]){
                        playlist.playlistBooks.splice(i, 1);
                    }
            }
            await playlist.save();
            res.status(200).json({
                status: 'success',
                data: {
                    playlist
                }
            });
    }
    catch(e){
        return next(
            new AppError(e.response.data.message, 500)
        );
    }
  })

  exports.addWishlistBook = catchAsync(async (req, res, next) => {
    try{
        const userPrefs = await UserPref.findOne({userId : req.body.userId});
        if(!userPrefs){
            return next(
                new AppError('There was an error updating wishlist of the user: Preferences not found', 404)
            ); 
          } 
          userPrefs.wishList.push(req.body.bookId);
            await userPrefs.save();
            res.status(200).json({
                status: 'success',
                data: {
                    userPrefs
                }
              });
    }
    catch(e){
        return next(
            new AppError(e.message, 500)
        );
    }  
  })

  exports.removeWishlistBook = catchAsync(async (req, res, next) => {
    try{
        const userPrefs = await UserPref.findOne({userId : req.body.userId});
        if(!userPrefs){
            return next(
                new AppError('There was an error updating wishlist of the user: Preferences not found', 404)
            ); 
          } 
            for(let i = 0; i < userPrefs.wishList.length; i++){
                    if(req.body.bookId == userPrefs.wishList[i]){
                        userPrefs.wishList.splice(i, 1);
                    }
            }
            await userPrefs.save();
            res.status(200).json({
                status: 'success',
                data: {
                    userPrefs
                }
            });
    }
    catch(e){
        return next(
            new AppError(e.response.data.message, 500)
        );
    }
  })

  exports.addPfdCategory = catchAsync(async (req, res, next) => {
    try{
        const userPrefs = await UserPref.findOne({userId : req.body.userId});
        if(!userPrefs){
            return next(
                new AppError('There was an error updating preferred categories of the user: Preferences not found', 404)
            ); 
          } 
          userPrefs.pfdCategories.push(req.body.categoryId);
            await userPrefs.save();
            res.status(200).json({
                status: 'success',
                data: {
                    userPrefs
                }
              });
    }
    catch(e){
        return next(
            new AppError(e.response.data.message, 500)
        );
    }  
  })

  exports.removePfdCategory = catchAsync(async (req, res, next) => {
    try{
        const userPrefs = await UserPref.findOne({userId : req.body.userId});
        if(!userPrefs){
            return next(
                new AppError('There was an error updating preferred categories of the user: Preferences not found', 404)
            ); 
          } 
            for(let i = 0; i < userPrefs.pfdCategories.length; i++){
                    if(req.body.categoryId == userPrefs.pfdCategories[i]){
                        userPrefs.pfdCategories.splice(i, 1);
                    }
            }
            await userPrefs.save();
            res.status(200).json({
                status: 'success',
                data: {
                    userPrefs
                }
            });
    }
    catch(e){
        return next(
            new AppError(e.response.data.message, 500)
        );
    }
  })
