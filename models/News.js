const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const NewsSchema = new Schema({
    news_img: {
        type:String,
        required:true
    },
    heading: {
        type:String,
        required:true
    },
    content: {
        type:String,
        required:true
    },
    comments: [
        {
            user_id:{
                type:String,
                required: true
            },
            fname:{
                type:String,
                required:true
            },
            lname:{
                type:String,
                required:true
            },
            user_img:{
                type:String,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    Date: {
        type:Date,
        default:Date.now

    }
})

module.exports = News = mongoose.model('news', NewsSchema);