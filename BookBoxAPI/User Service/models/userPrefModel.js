const mongoose = require('mongoose');
const validator = require('validator');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userPrefModel = new mongoose.Schema({
    userId: {
        type: Number,
        default : 1,
        required: [true, 'User Id is required'],
        unique: true
    },
    pfdCategories : {
        type : Array,
        required : [true, 'Preferred Categories are required'],
        validate : {
            validator : function(el){
                el.length > 0;
            }, 
            message : 'Preferred Categories cannot be empty'
        }
    }, 
    wishList : {
        type : Array,
        required : [true, 'Wishlist has to be created']
    },
    playlists : {
        type : [mongoose.Schema.ObjectId],
        ref : 'Playlist',
        required : [true, 'Playlists has to be created']
    }
});
userPrefModel.plugin(AutoIncrement, {inc_field: 'userId', start_seq: 2});
const UserPref = mongoose.model('User-Pref', userPrefModel);
module.exports = UserPref;