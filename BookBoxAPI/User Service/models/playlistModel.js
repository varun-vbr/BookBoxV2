const mongoose = require('mongoose');
const validator = require('validator');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const playlistModel = new mongoose.Schema({
    playlistId : {
        type: Number,
        default : 1,
        required: [true, 'Playlist Id is required'],
        unique: true
    },
    playlistName : {
        type : String,
        required: [true, 'Playlist name is required']
    },
    userId: {
        type: Number,
        required: [true, 'User Id is required'],
    },
    playlistBooks: {
        type : Array,
        required : [true, 'Playlist Books field required']
    }
});
playlistModel.plugin(AutoIncrement, {inc_field: 'playlistId', start_seq: 1});
const Playlist = mongoose.model('Playlist', playlistModel);
module.exports = Playlist;