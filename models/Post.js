const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const PostSchema = new Schema({
    user_id: {
        type:String,
        required:true
    },
    fname: {
        type:String,
        required:true
    },
    lname: {
        type:String,
        required:true
    },
    branch: {
        type:String,
        required:true
    },
    semester: {
        type:String,
        required:true
    },
    user_img:{
        type:String,
        required:true
    },
    discp: {
        type:String,
        required:true
    },
    post_img: {
        type:String,
        required:true
    },
    // likes: {
    //     type:Number,
    //     default:0
    // },
    likes: [
        {
            user_id:{
                type:String,
                // min: 1
            },
        }
    ],
    comments: [
        {
            user_id:{
                type:String,
                // min: 1
            },
            fname:{
                type:String,
                // min: 1
            },
            lname:{
                type:String,
                // min: 1
            },
            user_img:{
                type:String,
                // min:1
            },
            comment:{
                type:String,
                // min: 1
            }
        }
    ],
    Date: {
        type:Date,
        default:Date.now

    }
})

module.exports = Post = mongoose.model('post', PostSchema);