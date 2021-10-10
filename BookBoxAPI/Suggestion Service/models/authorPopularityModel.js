const mongoose = require('mongoose');
const validator = require('validator');

const authorPopularityModel = new mongoose.Schema({
        authorId : {
            type : Number,
            unique : true,
            required : [true, 'Author Id is required'],
            index : true
        },
        cpp : {
            type : Number,
            default : 0,
            required : [true, 'Cumulative Popularity Point is required']
        }   
});
const AuthorPopularityModel = mongoose.model('Author-Popularity', authorPopularityModel);
module.exports = AuthorPopularityModel;