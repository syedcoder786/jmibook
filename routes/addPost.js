const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Post = require('../models/Post');

// set storage engine
const storage = multer.diskStorage({
    destination:'./client/public/uploads/',
    filename:(req,file,cb)=>{
        cb(null,file.originalname.replace(/ /g,'')+'-'+Date.now()+path.extname(file.originalname));
    }
});


//init upload
const upload = multer({
    storage:storage,
    limits:{fileSize:1000000000000000000000},
    fileFilter:(req,file,cb)=>{
        checkFileType(file,cb);
    }
}).single('myImage');

//Check file type
function checkFileType(file,cb){
    //allowed ext
    const filetypes=/jpeg|jpg|png|gif/;
    //check extname
    const extname=filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mime
    const mimetype=filetypes.test(file.mimetype);
    if(extname && mimetype){
        return cb(null,true);
    }
    else{
        cb('Images only');
    }
}

//post image
router.post('/',(req,res)=>{

    upload(req,res,(err)=>{
        const { user_id, fname, lname, user_img, discp } = req.body
        console.log(req.body);
        // console.log(req.file.filename.replace(/ /g,''));
        if(err) {
            return res.status(400).json({ msg:err })
        }
        else if(!req.file) {
            console.log('no file was there')
        }else if(!req.file.filename){
            return res.status(400).json({ msg:'Check extention' })
        }
        else {
            const newPost = new Post({ 
                user_id,
                fname,
                lname,
                user_img,
                discp,
                post_img:req.file.filename.replace(/\s+/g, ' ').trim(),
            });

            //Save Post in database
            newPost.save()
                .then(post => {
                    return res.json(post)
                })
        }
    })
})

module.exports = router;