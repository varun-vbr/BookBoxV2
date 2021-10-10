const mongoose = require('mongoose');
const validator = require('validator');

const publisherPopularityModel = new mongoose.Schema({
        publisherId : {
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
const PublisherPopularityModel = mongoose.model('Publisher-Popularity', publisherPopularityModel);
module.exports = PublisherPopularityModel;