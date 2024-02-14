const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth')


router.post('/', auth, (req,res) => {
    const { id } = req.body
    // console.log(id)
    User.findById(id)
    .select('-password -email')
    .then(profileUser => {
        // console.log(posts[0])
        res.json(profileUser)
    })
    .catch(err => {
        // console.log(err)
        res.json({id:-1})
    })

})

module.exports = router;