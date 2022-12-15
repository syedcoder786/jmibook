const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const config = require('config');
const jwt = require('jsonwebtoken');


router.post('/', (req,res) => {
    const { fname, lname, email, password, gender, dob, semester, branch, profile_imgsrc, backprofile_imgsrc, address, phoneno } = req.body;
    console.log('inside server')
    console.log(fname)
    // if(!name || !email || !password || !password2){
    //     return res.status(400).json({msg:'Please enter all fields'})
    // }
    // else if(name.trim()==='' || email.trim()==='' || password==='' || password2===''){
    //     return res.status(400).json({msg:'Please enter all fields'})
    // }
    // else if(name.length < 3 || name.length > 8){
    //     return res.status(400).json({msg:'Name must contain 3-8 characters'})
    // }
    // else if(password.length < 6 || password.length > 16 ){
    //     return res.status(400).json({msg:'Password must contain 6-16 characters'})
    // }
    // else if(password !==password2){
    //     return res.status(400).json({msg:'Password does not match'})
    // }

    User.findOne({email})
        .then(user => {
            if(user) return res.status(400).json({msg:'Email already exist'})

            const newUser = new User({
                fname,
                lname,
                email,
                password,
                gender,
                dob,
                semester,
                branch,
                profile_imgsrc,
                backprofile_imgsrc,
                address,
                phoneno
            })
            console.log('inside signup server')
            // Create salt and hash
            bcrypt.genSalt(10, (err,salt) => {
                bcrypt.hash(newUser.password, salt, (err,hash) => {
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {

                            jwt.sign(
                                {id: user.id},
                                config.get('jwtSecret'),
                                (err, token) => {
                                    if(err) throw err;

                                        res.json({
                                        token,
                                        user: {
                                            id:user._id,
                                            fname:user.fname,
                                            lname:user.lname,
                                            email:user.email
                                        }
                                    })
                                }
                            )

                        })
                })
            })
        }).catch(err => {
            console.log(err)
            res.status(400).json({ err })
        })

})

module.exports = router;