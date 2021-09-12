const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const UserTicket = require('./../models/userTicketModel');
const IssueCategory = require('./../models/issueCategoryModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const axios = require('axios');
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

exports.createAdmin = catchAsync(async (req, res, next) => {
    try{
        const response = await axios.post('http://localhost:3002/api/v1/user/signup', {
             data : {
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
                 Cookie: req.cookies.jwt ? req.cookies : req.body.headers.Cookie
             }
         });
         if(response.status != 201) {
             return next(
                 new AppError('There was an error saving user credentials', response.status)
             );
         }
         res.status(201).json({
             status: 'success',
             token :  response.data.data.token,
             data: {
                 userDetail : response.data.data.userDetail,
                 userAuth :  response.data.data.userAuth,
                 userPrefs : response.data.data.userPrefs
             }
           });
     } 
     catch(e){
         return next(
             new AppError(e.response.data.message, e.response.status)
         ); 
     }
});

exports.createAdminType = catchAsync(async (req, res, next) => {
    try{
        const response = await axios.post('http://localhost:3000/api/v1/users/auth/adminType', {
             data : {
                typeName : req.body.typeName, 
                userProfileAccessRW : req.body.userProfileAccessRW,
                adminProfileAccessRW : req.body.adminProfileAccessRW,
                bookMaintenanceAccess : req.body.bookMaintenanceAccess,
                categoryMaintenanceAccess : req.body.categoryMaintenanceAccess,
                userSupportRoleGranted : req.body.userSupportRoleGranted
             },
             headers: {
                 Cookie: req.cookies
             }
         });
         if(response.status != 201) {
             return next(
                 new AppError('There was an error saving user credentials', response.status)
             );
         }
         res.status(201).json({
             status: 'success',
             data: {
                 adminType : response.data.data.newAdminType
             }
           });
     } 
     catch(e){
         return next(
             new AppError(e.response.data.message, e.response.status)
         ); 
     }
});

exports.hasUserAdminPrevilege = catchAsync(async (req, res, next) => {
    try{
        const response = await axios.get('http://localhost:3000/api/v1/users/auth/userAdmin', {
                headers: {
                    Cookie: "jwt=" + req.cookies.jwt + ";"
                }
            });
        if(response.status != 200) {
            return next(
                new AppError(response.data.message, response.status)
            );
        } else{
            next();
        }   
    } catch(e){
        return next(
            new AppError(e.response.data.message, e.response.status)
        );
    }
});

exports.hasBookAdminPrevilege = catchAsync(async (req, res, next) => {
    try{
        const response = await axios.get('http://localhost:3000/api/v1/users/auth/bookAdmin', {
                headers: {
                    Cookie: "jwt=" + req.cookies.jwt + ";"
                }
        });
        if(response.status != 200) {
            return next(
                new AppError(response.data.message, response.status)
            );
        } else{
            next();
        }  
    } catch(e){
        return next(
            new AppError(e.response.data.message, e.response.status)
        );
    }
});

exports.hasUserSupportAdminPrevilege = catchAsync(async (req, res, next) => {
    try{
        const response = await axios.get('http://localhost:3000/api/v1/users/auth/supportAdmin', {
                headers: {
                    Cookie: "jwt=" + req.cookies.jwt + ";"
                }
        });
        if(response.status != 200) {
            return next(
                new AppError(response.data.message, response.status)
            );
        } else{
            next();
        }  
    } catch(e){
        return next(
            new AppError(e.response.data.message, e.response.status)
        );
    }
});

exports.isRoot = catchAsync(async (req, res, next) => {
    try{
        const response = await axios.get('http://localhost:3000/api/v1/users/auth/rootAdmin', {
                headers: {
                    Cookie: "jwt=" + req.cookies.jwt + ";"
                }
        });
        if(response.status != 200) {
            return next(
                new AppError(response.data.message, response.status)
            );
        } else{
            next();
        }      
    } catch(e){
        return next(
            new AppError(e.response.data.message, e.response.status)
        );
    }
});

exports.findUserById =  catchAsync(async (req, res, next) => {
    try{
      const response = await axios.get('http://localhost:3002/api/v1/user/' + req.params.userId, {
        headers: {
            Cookie: "jwt=" + req.cookies.jwt + ";"
        }
    });
    if(response.status != 200) {
        return next(
            new AppError('There was an error saving user credentials', response.status)
        );
    }
    res.status(200).json({
        status: 'success',
        data: {
            userDetail : response.data.data.userDetail,
            userAuth :  response.data.data.userAuth,
            userPrefs : response.data.data.userPrefs
        }
      });
    } catch(e){
        return next(
            new AppError(e.response.data.message, e.response.status)
        );
    }
});

exports.createUserTicket = catchAsync(async (req, res, next) => {
    try{
        const useerTicket = await UserTicket.create(req.body);
        res.status(201).json({
          status: 'success',
          data: {
            useerTicket
          }
        });
    }catch(e){
        return next(new AppError(e.message, e.status));
    }
});

exports.createIssueType = catchAsync(async (req, res, next) => {
  try{
      const category = await IssueCategory.create(req.body);
      res.status(200).json({
        status: 'success',
        data: {
            category
        }
      });
  }catch(e){
      return next(new AppError(e.message, e.status));
  }
});

exports.updateUserTicket = catchAsync(async (req, res, next) => {
    try{
        let userTicket = await UserTicket.findOne({ticketRefNo : req.body.ticketRefNo});
        if(userTicket){
            if(req.body.subject){
                userTicket.subject = req.body.subject;
            }
            if(req.body.description){
                userTicket.description = req.body.description;
            }
            if(req.body.assignedAdmin){
                userTicket.assignedAdmin = req.body.assignedAdmin;
            }
            if(req.body.issueCategory){
                userTicket.issueCategory = req.body.issueCategory;
            }
            if(req.body.status){
                userTicket.status = req.body.status;
            }
            userTicket.lastUpdated = Date.now();
            await userTicket.save();
            res.status(200).json({
                status: 'success',
                data: {
                    userTicket
                }
              });
        } else {
            return next(new AppError('Ticket not found', 404)); 
        }
    } catch(e){
        return next(new AppError(e.message, e.status));
    }
});

exports.getAllUserTickets = catchAsync(async (req, res, next) => {
    try{
        const tickets = await UserTicket.find({});
        res.status(200).json({
            status: 'success',
            data: {
                tickets
            }
          });
    } catch(e){
        return next(new AppError(e.message, e.status));
    }
    
});

exports.getTicketsForUser = catchAsync(async (req, res, next) => {debugger;
    try{
        const tickets = await UserTicket.find({userId : req.params.userId});
        res.status(200).json({
            status: 'success',
            data: {
                tickets
            }
          });
    } catch(e){
        return next(new AppError(e.message, e.status));
    }
    
});

exports.getUserTicket = catchAsync(async (req, res, next) => {
    try{
        const ticket = await UserTicket.findOne({ticketRefNo : req.params.ticketRefNo});
        if(ticket){
            res.status(200).json({
                status: 'success',
                data: {
                    ticket
                }
              });
        } else{
            return next(new AppError('Ticket not found', 404));
        }
        
    } catch(e){
        return next(new AppError(e.message, e.status));
    }
    
});



