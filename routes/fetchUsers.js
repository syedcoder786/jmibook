const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth')


router.post('/', auth, async(req,res) => {
    // console.log(id)
    try{
    const allUsers = await User.find()
    .select('-password -email -gender -branch -semester -dob -address -phoneno')
        res.status(200).json(allUsers)
    }catch(err) {
        console.log(err)
        res.status(400).json({err})
    }

})

module.exports = router;