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
router.get('/userAdmin', authController.isUserAdmin, authController.hasUserAdminPrevilege);
router.get('/bookAdmin', authController.isUserAdmin, authController.hasBookAdminPrevilege);
router.get('/supportAdmin', authController.isUserAdmin, authController.isUserSupportAdmin);
router.get('/rootAdmin', authController.isUserAdmin, authController.isRoot);
router.get('/user/:userId', authController.isUserAdmin, authController.findUserById);
//router.use(authController.restrictTo('admin'));

module.exports = router;