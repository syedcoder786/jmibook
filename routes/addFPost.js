const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth')

//post image
router.post('/', auth, async (req,res)=>{
    const { user_id, discp, myImageURL } = req.body

    // const newPost = new Post({ 
    //     user: user_id,
    //     // fname,
    //     // lname,
    //     // branch,
    //     // semester,
    //     // user_img,
    //     discp,
    //     post_img:myImageURL,
    // });

    // //Save Post in database
    // newPost.save()
    //     .then(post => {
    //         console.log(post)
    //         return res.json(post)
    //     })

    try {
        let newPost = await Post.create({
          user: user_id,
          discp,
          post_img:myImageURL,
        });

        // console.log(newPost)

        let onePost = await Post.findById(newPost._id)
            .populate("user", { email:0, password: 0 })
            // .populate("likes.user", { email:0, password: 0 })
            .populate("comments.user", { email:0, password: 0 })

            
        // return io.emit("addPost", onePost) // broadcast
        console.log("onepost")
        console.log(onePost)
        res.status(200).json(onePost);
      } catch (e) {
        res.status(400).json({message:e})
        console.log(e);
      }      
})

module.exports = router;