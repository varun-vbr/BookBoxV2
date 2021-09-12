const mongoose = require('mongoose');
const moment = require('moment');
const validator = require('validator');
const IssueCategory = require('./../models/issueCategoryModel');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userTicketModel = new mongoose.Schema({
    ticketRefNo : {
        type: Number,
        default : 1,
        required: [true, 'Ticket Reference is required'],
        unique: true
    },
    userId : {
        type: Number,
        required: [true, 'User Id is required'],
        index: true
    },
    subject : {
        type : String,
        required : [true, 'Issue Subject is required']
    },
    description : {
        type : String,
        required : [true,'Please briefly describe the issue']
    },
    assignedAdmin : {
        type : Number
    },
    issueCategory : {
        type : mongoose.Schema.ObjectId, 
        ref : 'Issue-Category',
        required: [true, 'Issue Category is required']
    },
    status : {
        type : String,
        required: [true, 'Status is required']
    },
    loggedOn : {
        type : Date, 
        default : Date.now(),
        required: [true, 'Issue logged date is required']
    },
    fixBy : {
        type : Date
    },
    lastUpdated : {
        type : Date,
        default : Date.now(),
        required : [true, 'Last Updated Date is required']
    }
});

userTicketModel.pre('save',async function(next){
    const cat = await IssueCategory.findById(this.issueCategory).exec();
    const fixby = moment().add(await cat.sla, 'd').format('YYYY-MM-DD[T00:00:00.000Z]');
    this.fixBy = fixby;
    next();
});

userTicketModel.post('save',async function(doc, next){
    const cat = await IssueCategory.findById(this.issueCategory).exec();
    const fixby = moment().add(await cat.sla, 'd').format('YYYY-MM-DD[T00:00:00.000Z]');
    this.fixBy = fixby;
    next();
});

userTicketModel.plugin(AutoIncrement, {inc_field: 'ticketRefNo', start_seq: 1});
const UserTicket = mongoose.model('User-Ticket', userTicketModel);
module.exports = UserTicket;