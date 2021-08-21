const express = require('express');
const userReviewController = require('./../controllers/userReviewController');

const router = express.Router();

router.get('/review/:bookId', userReviewController.getReview);
router.use(userReviewController.protect);
router.post('/review', userReviewController.addReview);

module.exports = router;