const mongoose = require('mongoose');
const validator = require('validator');

const userDetailsModel = new mongoose.Schema({
    userId: {
        type: Number,
        required: [true, 'User Id is required'],
        unique : true
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'] 
    },
    userSince: {
        type: Date,
        select: false,
        default: Date.now()
    },
    plan: {
        type: mongoose.Schema.ObjectId,
        ref : 'Plan',
        required: [true, 'Plan is required']
    }  
});
const UserDetails = mongoose.model('User-Details', userDetailsModel);
module.exports = UserDetails;