const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth')

//post comment
router.post('/', auth, (req,res)=>{
    const { post_id, user_id, index, likeno } = req.body
    const newLike = {
        user_id,
    }
    const Like = {
        post_id,
        user_id,
        index,
        likeno
    }
    // console.log(Like)
    // Post.find( { $and: [
    //     {_id: post_id},
    //     {"likes.user_id": user_id}
    // ]}).then(likes => {
            // if(likes.length > 0){
            //     res.status(404).json('Already liked')
            //     console.log("Already liked")
            // }
            // else{
            if(likeno){
                Post.findOneAndUpdate({_id:post_id}, { $push: { likes: newLike} } )
                    .then(nlike => {
                        // console.log('added like')
                        res.json(Like)
                    }).catch(err => {
                        console.log(err)
                    })
            }else{
                Post.updateMany({_id:post_id}, { $pull: { likes: { user_id } } } )
                .then(nLike => {
                    // console.log('removed like')
                    // console.log(Like)
                    res.json(Like)
                }).catch(err => {
                    console.log(err)
                })
            }
            // }
        // }).catch(err => {
        //     console.log(err)
        // })
    
})

module.exports = router;