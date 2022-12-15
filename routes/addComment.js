const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth')
//post comment
router.post('/', auth, (req,res)=>{
    const { post_id, user_id, fname, lname, user_img, comment, index } = req.body
    const newComment = {
        user_id,
        fname,
        lname,
        user_img,
        comment
    }
    const Comment = {
        post_id,
        user_id,
        fname,
        lname,
        user_img,
        comment,
        index 
    }
    Post.findOneAndUpdate({_id:post_id}, { $push: { comments: newComment } } )
        .then(comment => {
            // console.log(comment)
            res.json(Comment)
        }).catch(err => {
            console.log(err)
        })
    
})

module.exports = router;