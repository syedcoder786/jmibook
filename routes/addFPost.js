const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth')

//post image
router.post('/', auth, (req,res)=>{
    const { user_id, fname, lname, branch, semester, user_img, discp, myImageURL } = req.body

    const newPost = new Post({ 
        user_id,
        fname,
        lname,
        branch,
        semester,
        user_img,
        discp,
        post_img:myImageURL,
    });

    //Save Post in database
    newPost.save()
        .then(post => {
            return res.json(post)
        })
})

module.exports = router;