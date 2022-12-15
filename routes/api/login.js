const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth')


router.post('/', async(req,res) => {
    const { email, password } = req.body;
    // if(!email || !password){
    //     return res.status(400).json({msg:'Please enter all fields'})
    // }

    try{
        const user = await User.findOne({email})
            if(!user) return res.status(400).json({msg:'User does not exist'})


            // Compare hash
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({msg:'Invalid credentials'});

                    jwt.sign(
                        {id: user.id},
                        config.get('jwtSecret'),
                        (err, token) => {
                            if(err) throw err;

                                res.json({
                                token,
                                user: {
                                    _id:user._id,
                                    fname:user.fname,
                                    lname:user.lname,
                                    email:user.email,
                                    gender:user.gender,
                                    dob:user.dob,
                                    semester:user.semester,
                                    branch:user.branch,
                                    profile_imgsrc:user.profile_imgsrc,
                                    backprofile_imgsrc:user.backprofile_imgsrc,
                                    address:user.address,
                                    phoneno:user.phoneno
                                }
                            })
                        }
                    )
                })
        }catch(err){
            console.log(err)
            res.status(400).json({ err })
        }

})

router.get('/user', auth, async(req,res)=>{
    try{
        const user = 
        await User
        .findById(req.user.id)
        .select('-password')

        if(user){
            res.json(user)
        }
    }catch(err) {
        console.log(err)
        res.status(400).json({ err })
    }
})

module.exports = router;