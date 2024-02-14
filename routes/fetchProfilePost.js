const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth')


router.post('/', auth, (req,res) => {
    const { id, page, limit } = req.body
    const pageno = Number(page)
    const limitno = Number(limit)
    
    Post.find({user:id})
        // .sort({ Date: -1 })
        .skip(limitno*pageno) //check for Number
        .limit(limitno) // check for Number
        .sort("-createdAt")
        .populate("user", { email:0, password: 0 })
        .populate("comments.user", { email:0, password: 0 })
    .then(posts => {
        // console.log(posts)
        if(posts.length > 0)
            res.json(posts)
    })
    .catch(err => {
        console.log(err)
        res.status(400).json({msg:err})
    })

})

module.exports = router;