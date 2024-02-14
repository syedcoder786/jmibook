const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth')

//post comment
router.post('/', auth, (req,res)=>{
    const { id, downloadURL } = req.body

    const updatedImage = {
        id,
        downloadURL
    }

    User.findOneAndUpdate({_id:id}, {$set:{profile_imgsrc:downloadURL}})
        .then(user => {
            // Post.updateMany({user_id:id}, {user_img:downloadURL}, {"multi":true})
            // .then(post => {
            //     // console.log(post)

            //     News.updateMany(
            //         {"comments.user_id": id},
    
            //         { "$set": { 
            //             "comments.$[].user_img": downloadURL,
            //         }}, {"multi": true})
            //         .then(news => {
            //             // console.log("inside")
            //             // console.log(details)
            //             // res.json(updatedImage)
            //         }).catch(err => {
            //             console.log(err)
            //         })

            //     Post.updateMany(
            //         {"comments.user_id": id},
    
            //         { "$set": { 
            //             "comments.$[].user_img": downloadURL,
            //         }}, {"multi": true})
            //         .then(details => {
            //             // console.log("inside")
            //             // console.log(details)
            //             res.json(updatedImage)
            //         }).catch(err => {
            //             console.log(err)
            //         })


            // }).catch(err => {
            //     console.log(err)
            // })
            // // console.log(updatedImage)
            res.json(updatedImage)
        }).catch(err => {
            console.log(err)
        })
    
})

module.exports = router;