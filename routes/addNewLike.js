const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth')

//post comment
router.post('/', auth, async (req,res)=>{
    const { post_id, user_id, index, likeno } = req.body
    // const newLike = {
    //     user_id,
    // }
    // const Like = {
    //     post_id,
    //     user_id,
    //     index,
    //     likeno
    // }
    // // console.log(Like)
    // // Post.find( { $and: [
    // //     {_id: post_id},
    // //     {"likes.user_id": user_id}
    // // ]}).then(likes => {
    //         // if(likes.length > 0){
    //         //     res.status(404).json('Already liked')
    //         //     console.log("Already liked")
    //         // }
    //         // else{
    //         if(likeno){
    //             Post.findOneAndUpdate({_id:post_id}, { $push: { likes: newLike} } )
    //                 .then(nlike => {
    //                     // console.log('added like')
    //                     res.json(Like)
    //                 }).catch(err => {
    //                     console.log(err)
    //                 })
    //         }else{
    //             Post.updateMany({_id:post_id}, { $pull: { likes: { user_id } } } )
    //             .then(nLike => {
    //                 // console.log('removed like')
    //                 // console.log(Like)
    //                 res.json(Like)
    //             }).catch(err => {
    //                 console.log(err)
    //             })
    //         }
    //         // }
    //     // }).catch(err => {
    //     //     console.log(err)
    //     // })

    console.log(post_id)
    console.log(user_id)

    try {
        // const index = req.body.index

        const Like = {
            post_id,
            user_id,
            index,
            likeno
        }
    
        const likes = 
            await Post.find( { $and: [
              {_id: post_id},
              {"likes.user": user_id}
            ]})

            console.log("index "+index)
            console.log(likes)
    
        // console.log("check")
    
        // console.log(likes)
    
        if(likes.length > 0){
    
            await Post.findOneAndUpdate(
              { _id: post_id }, 
              { $pull: { likes: {user: user_id} } }
            );
    
            const pulldata = await Post.find({ _id: post_id })
                  .populate("user", { email:0, password: 0 })
                //   .populate("likes.user", { email:0, password: 0 })
                  .populate("comments.user", { email:0, password: 0 })
    
            console.log("Already liked")
            // console.log(pulldata)
            Like.likeno = 0;
            console.log(Like)
            return res.status(200).json(Like)
        }
    
        await Post.findOneAndUpdate(
          { _id: post_id }, 
          { $addToSet: { likes: {user: user_id} } }
        );
    
        const data = await Post.findOne({ _id: post_id })
                .populate("user", { email:0, password: 0 })
                // .populate("likes.user", { email:0, password: 0 })
                .populate("comments.user", { email:0, password: 0 })
    
        //   console.log(data)
        Like.likeno = 1;
        console.log(Like)
        res.status(200).json(Like);
      } catch (e) {
        res.status(400).json({message:e})
        console.log(e);
      }
    
})

module.exports = router;