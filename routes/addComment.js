const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const auth = require('../middleware/auth')
//post comment
router.post('/', auth, async (req,res)=>{
    const { post_id, user_id, comment, index } = req.body
    const newComment = {
        // user_id,
        // fname,
        // lname,
        // user_img,
        user: user_id,
        comment
    }
    try {
        await Post.findOneAndUpdate({_id:post_id}, { $push: { comments: newComment } } )

        const data = await User.findOne({ _id: user_id })
            .populate("user", { email:0, password: 0 })
            // .populate("likes.user", { email:0, password: 0 })
            // .populate("comments.user", { email:0, password: 0 })

        // console.log(data)
        const Comment = {
            user:data,
            comment,
            index 
        }
        // console.log(Comment)
        // console.log(comment)
        res.json(Comment)
    } catch (error) {
        console.log(error)
    }
    
})

module.exports = router;