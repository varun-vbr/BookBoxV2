const mongoose = require('mongoose');
const validator = require('validator');

const planModel = new mongoose.Schema({
    planId: {
        type: Number,
        required: [true, 'Plan Id is required'],
        unique: true
    },
    planName: {
        type: String,
        required: [true, 'Plan Name is required'],
        unique: true
    },
    costPerDay: {
        type: Number,
        required: [true, 'Cost per day is required']
    }
});
const Plan = mongoose.model('Plan', planModel);
module.exports = Plan;