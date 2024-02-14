const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
    fname: {
        type:String,
        required:true
    },
    lname: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    gender: {
        type:String,
        required:true
    },
    dob: {
        type:String,
        required:true
    },
    semester: {
        type:String,
        required:true
    },
    branch: {
        type:String,
        required:true
    },
    profile_imgsrc: {
        type:String,
        required:true
    },
    backprofile_imgsrc: {
        type:String,
        required:true
    },
    address: {
        type:String,
        required:true
    },
    phoneno: {
        type:String,
        required:true
    },
    Date: {
        type:Date,
        default:Date.now

    }
})

module.exports = User = mongoose.model('user', UserSchema);