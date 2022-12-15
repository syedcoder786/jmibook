const express = require('express');
const router = express.Router();
const Nft = require('../models/Nft');
const auth = require('../middleware/auth')


router.post('/', auth, async (req,res) => {
    try{
        const nfts = await Nft.find()
        res.status(200).json(nfts)
    }catch(e){
        console.log(e)
        res.status(400).json({ err:e })
    }
})

module.exports = router;