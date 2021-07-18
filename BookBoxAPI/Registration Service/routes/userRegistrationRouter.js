const express = require('express');
const registrationController = require('./../controllers/registrationController');

const router = express.Router();
router.post('/signup', registrationController.signup);
router.get('/user/:email', registrationController.getUserDetailsByEmail);
router.use(registrationController.isLoggedIn);
router.get('/user', registrationController.getUserDetails);
router.patch('/update', registrationController.updateUser);


module.exports = router;