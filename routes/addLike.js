const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//post comment
router.post('/',(req,res)=>{
    const { post_id, user_id, index } = req.body
    const newLike = {
        user_id,
    }
    const Like = {
        post_id,
        user_id,
        index
    }
    Post.find( { $and: [
        {_id: post_id},
        {"likes.user_id": user_id}
    ]}).then(likes => {
            if(likes.length > 0){
                res.status(404).json('Already liked')
                console.log("Already liked")
            }else{
                Post.findOneAndUpdate({_id:post_id}, { $push: { likes: newLike} } )
                    .then(nlike => {
                        console.log('added like')
                        res.json(Like)
                    }).catch(err => {
                        console.log(err)
                    })
            }
        }).catch(err => {
            console.log(err)
        })
    
})

module.exports = router;