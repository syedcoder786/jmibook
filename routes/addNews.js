const express = require('express');
const router = express.Router();
const News = require('../models/News');
const auth = require('../middleware/auth')

//post image
router.post('/', auth, (req,res)=>{
    const { news_img, heading, content } = req.body

    const newNews = new News({ 
        news_img,
        heading,
        content,
        comments:[],
    });

    //Save News in database
    newNews.save()
        .then(news => {
            return res.json(news)
        })
})

module.exports = router;