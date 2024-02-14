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
          user: {
            type: mongoose.Schema.Types.ObjectId,
            // required: [true, "User ref is required"],
            ref: "user",
          },
          comment:{
              type:String,
              // required: [true, "Comment is required"],
          },
          time : { type : Date, default: Date.now }
        }
    ],
    },
    {
        timestamps: true,
    }
)

module.exports = News = mongoose.model('news', NewsSchema);