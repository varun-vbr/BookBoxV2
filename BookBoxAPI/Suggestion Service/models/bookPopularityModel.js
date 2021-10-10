const mongoose = require('mongoose');
const validator = require('validator');

const bookPopularityModel = new mongoose.Schema({
        bookId : {
            type : Number,
            unique : true,
            required : [true, 'Book Id is required'],
            index : true
        },
        categoryId : {
            type : Number,
            required : [true, 'Category Id is required'],
            index : true
        },
        cpp : {
            type : Number,
            default : 0,
            required : [true, 'Cumulative Popularity Point is required']
        }   
});
const BookPopularityModel = mongoose.model('Book-Popularity', bookPopularityModel);
module.exports = BookPopularityModel;