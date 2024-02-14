const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const PostSchema = new Schema({
    // user_id: {
    //     type:String,
    //     required:true
    // },
    // fname: {
    //     type:String,
    //     required:true
    // },
    // lname: {
    //     type:String,
    //     required:true
    // },
    // branch: {
    //     type:String,
    //     required:true
    // },
    // semester: {
    //     type:String,
    //     required:true
    // },
    // user_img:{
    //     type:String,
    //     required:true
    // },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "User ref is required"],
        ref: "user",
    },
    discp: {
        type:String,
        required:true
    },
    post_img: {
        type:String,
        required:true
    },
    likes: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            // required: [true, "User ref is required"],
            ref: "user",
            // unique: true
          }
        }
      ],
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

module.exports = Post = mongoose.model('post', PostSchema);