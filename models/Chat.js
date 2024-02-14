const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ChatSchema = new Schema({
    id: {
        type:String,
        required:true
    },
    name: {
        type:String,
        required:true
    },
    message: {
        type:String,
        required:true
    },
    // Date: {
    //     type:Date,
    //     default:Date.now
    // }
})

module.exports = Chat = mongoose.model('chat', ChatSchema);