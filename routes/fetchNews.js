const express = require('express');
const router = express.Router();
const News = require('../models/News');
const auth = require('../middleware/auth')


router.post('/', auth, (req,res) => {
    let { page, limit } = req.body
    const pageno = Number(page)
    const limitno = Number(limit)
    // console.log("page: "+page+" limit: "+limit)
    News.find()
        // .sort({ Date: -1 })
        .sort("-createdAt")
        .skip(limitno*pageno) //check for Number
        .limit(limitno) // check for Number
        .populate("comments.user", { email:0, password: 0 })
    .then(news => {
        // console.log(news)
        const blogs = news.sort( (a,b) => b.comments.length - a.comments.length );
        res.json(blogs)
    })
    .catch(err => {
        res.status(400).json({msg:err})
    })

})

router.post('/latest', auth, (req,res) => {

    News.find()
    .sort({ Date: -1 })
    .limit(4)
    .then(news => {
        // console.log(news[0])
        res.json(news)
    })
    .catch(err => {
        res.status(400).json({msg:err})
    })

})

router.post('/component', auth, (req,res) => {
    const { id } = req.body
    News.findById(id)
        .populate("comments.user", { email:0, password: 0 })
    .then(newsComponent => {
        // console.log(news[0])
        res.json(newsComponent)
    })
    .catch(err => {
        // console.log(err)
        res.json({_id:-1})
    })

})

router.post('/addComment', auth, async (req,res) => {
    const { news_id, user_id, comment } = req.body

    // console.log(comment)
    const newComment = {
        // _id:"0",
        user:user_id,
        // fname,
        // lname,
        // user_img,
        comment
    }

    await News.findOneAndUpdate({_id:news_id}, { $push: { comments: newComment } } )

    
    News.findById(news_id)
        .populate("comments.user", { email:0, password: 0 })
    .then(newsComponent => {
        console.log(newsComponent)
        res.json(newsComponent)
    })
    .catch(err => {
        console.log(err)
        // res.json({_id:-1})
    })

        // .then(newcomment => {
        //     // console.log(newcomment)
        //     res.json(newComment)
        // }).catch(err => {
        //     console.log(err)
        // })

})

module.exports = router;