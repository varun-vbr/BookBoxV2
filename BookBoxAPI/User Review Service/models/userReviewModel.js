const mongoose = require('mongoose');
const validator = require('validator');

const userReviewModel = new mongoose.Schema({
    userId : {
        type: Number,
        required: [true, 'User Id is required'],
        index: true
    },
    userName : {
        type: String,
        required: [true, 'User name is required']
    },
    bookId : {
        type: Number,
        required: [true, 'Book Id is required'],
        index: true
    },
    bookName: {
        type: String,
        required: [true, 'Book name is required']
    },
    rating: {
        type: Number,
        required: [true, 'Please provide a rating']    
    },
    review: {
        type: String
    },
    reviewDate: {
        type: Date, 
        default: Date.now()
    }
});
const UserReview = mongoose.model('User-Review', userReviewModel);
module.exports = UserReview;