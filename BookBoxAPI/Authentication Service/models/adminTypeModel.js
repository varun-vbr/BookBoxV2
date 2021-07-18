const mongoose = require('mongoose');
//const UserAuth = require('./userAuthModel');
const Schema = mongoose.Schema;
const adminTypeModel = new mongoose.Schema({
    typeName: {
      type: String,
      required: [true, 'Please provide a type name'],
      unique: true
    },
    userProfileAccessRW: {
        type: Boolean,
        default: false
    },
    adminProfileAccessRW: {
        type: Boolean,
        default: false
    },
    bookMaintenanceAccess: {
        type: Boolean,
        default: false
    },
    categoryMaintenanceAccess: {
        type: Boolean,
        default: false
    },
    userSupportRoleGranted: {
        type: Boolean,
        default: false
    },
    users : [{ type: Schema.Types.ObjectId, ref: 'User-Auth' }]
  });
  const AdminType = mongoose.model('Admin-Type', adminTypeModel);
  module.exports = AdminType;
  