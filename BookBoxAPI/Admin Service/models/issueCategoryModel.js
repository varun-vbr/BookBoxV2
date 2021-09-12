const mongoose = require('mongoose');
const validator = require('validator');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const issueCategoryModel = new mongoose.Schema({
    issueCategoryId : {
        type : Number,
        default : 1,
        unique : true,
        required : [true, 'Issue Category Id is required']
    },
    issueCategoryName : {
        type : String,
        required : [true, 'Issue Category Name is required']
    },
    issueCategoryDescription : {
        type : String,
        required : [true, 'Issue Category Description is required']
    },
    sla : {
        type : Number,
        required : [true, 'Resolution SLA is required']
    }
});
issueCategoryModel.plugin(AutoIncrement, {inc_field: 'issueCategoryId', start_seq: 1});
const IssueCategory = mongoose.model('Issue-Category', issueCategoryModel);
module.exports = IssueCategory;