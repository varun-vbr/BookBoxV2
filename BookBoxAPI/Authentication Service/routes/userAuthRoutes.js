const express = require('express');
const authController = require('./../controllers/authController');

const router = express.Router();
router.post('/signup', authController.isUserSignUp, authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);
router.post('/admin', 
authController.isUserloggedIn, 
authController.isUserAdmin, 
authController.restrictTo, 
authController.createAdmin);
router.get('/isLoggedIn', authController.isLoggedIn);
router.patch('/updatePassword', authController.updatePassword);
router.delete('/delete', authController.delete);
router.post('/adminType', authController.createAdminType);

//router.use(authController.restrictTo('admin'));

module.exports = router;