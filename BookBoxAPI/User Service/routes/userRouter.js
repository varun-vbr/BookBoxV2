const express = require('express');
const userController = require('./../controllers/userController');

const router = express.Router();
router.post('/signup', userController.signup);
router.post('/login', userController.login);

router.use(userController.protect);
router.patch('/update', userController.update);
router.get('/logout', userController.logout);
router.patch('/password', userController.updatePassword);
router.post('/playlist', userController.addPlaylist);
router.patch('/playlist', userController.addPlaylistBook);
router.put('/playlist', userController.removePlaylistBook);
router.patch('/wishlist', userController.addWishlistBook);
router.put('/wishlist', userController.removeWishlistBook);
router.patch('/pfdcatagory', userController.addPfdCategory);
router.put('/pfdcatagory', userController.removePfdCategory);


module.exports = router;