const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth')


router.post('/', auth, async (req,res) => {
    // let { page, limit } = req.body
    // const pageno = Number(page)
    // const limitno = Number(limit)
    // // console.log("page: "+page+" limit: "+limit)
    // Post.find({}) // {comments: {sort: {Date:-1}}} to sort latest comments
    //     .sort({ Date: -1 })
    //     .skip(limitno*pageno) //check for Number
    //     .limit(limitno) // check for Number
    //     // .slice('comments', 3) // for first 3 comments
    // .then(posts => {
    //     // console.log(posts[0])
    //     res.json(posts)
    // })
    // .catch(err => {
    //     res.status(400).json({msg:err})
    // })

    try {
        const { page, limit } = req.body
        console.log(page)
        // console.log(limit)
        const pageno = Number(page)
        const limitno = Number(limit)
  
          const postItems = await Post
              .find({})
              .skip(limitno*pageno) //check for Number
              .limit(limitno) // check for Number
              // .sort({ Date: -1 }) // for old time
              .sort("-createdAt") // for new timestamp
              // .slice('comments', 3) // for first 3 comments
              .populate("user", { email:0, password: 0 })
            //   .populate("likes.user", { email:0, password: 0 })
              .populate("comments.user", { email:0, password: 0 })
              
      
              // await newPost.populate("user", { email:0, password: 0 });
  
              // postItems.map(async (onePost) => {
              //   if(onePost.likes){
              //     await onePost.likes.map(oneLike => {
              //       oneLike.populate("user", { email:0, password: 0 })
              //     })
              //   }
            
              //   if(onePost.comments){
              //     await onePost.comments.map(oneComment => {
              //       oneComment.populate("user", { email:0, password: 0 })
              //     })
              //   }
              // })
              
          // console.log("post items")
          console.log(postItems[0]);
          res.status(200).json(postItems);
      } catch (error) {
          console.log(error)
          res.status(400).json({msg:error})
      }

})

module.exports = router;