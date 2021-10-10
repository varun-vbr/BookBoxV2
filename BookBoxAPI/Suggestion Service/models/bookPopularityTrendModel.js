const mongoose = require('mongoose');
const validator = require('validator');

const bookPopularityTrendModel = new mongoose.Schema({
        bookId : {
            type : Number,
            unique : true,
            required : [true, 'Book Id is required'],
            index : true
        },
        lastActivity : {
            type : Date,
            default : Date.now(),
            required : [true, 'Last Activity is required']
        }   
});
const BookPopularityTrendModel = mongoose.model('Book-Popularity-Trend', bookPopularityTrendModel);
module.exports = BookPopularityTrendModel;