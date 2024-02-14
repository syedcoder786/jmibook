const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');
const auth = require('../middleware/auth')

//post comment
router.post('/', auth, (req,res)=>{
    const { id, fname, lname, gender, dob, branch, semester } = req.body

    const updatedDetails = {
        id,
        fname,
        lname,
        gender,
        dob,
        branch,
        semester,
    }

    User.findOneAndUpdate({_id:id}, {$set:{fname, lname, gender, dob, branch, semester}})
        .then(user => {
            // console.log(user)
            // Post.updateMany({user_id:id}, {$set:{fname, lname, branch, semester}}, {"multi":true})
            // .then(newpost => {
            //     // console.log(newpost)
            //     Post.updateMany(
            //     {"comments.user_id": id},

            //     { "$set": { 
            //         "comments.$[].fname": fname,
            //         "comments.$[].lname": lname,
            //     }}, {"multi": true})
            //     .then(details => {
            //         // console.log("inside")
            //         // console.log(details)
            //         res.json(updatedDetails)
            //     }).catch(err => {
            //         console.log(err)
            //     })
            // }).catch(err => {
            //     console.log(err)
            // })
            // console.log(updatedImage)
            // res.json(updatedImage)
            res.json(updatedDetails)
        }).catch(err => {
            res.status(400).json({message:err})
            console.log(err)
        })
    
})

module.exports = router;