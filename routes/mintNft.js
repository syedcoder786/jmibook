const { csonParser } = require('config/parser');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Nft = require('../models/Nft');

//post comment
router.post('/', auth, async (req,res)=>{
    const { id, tokenId, ownerId, ownerAddress, isMinted } = req.body

    console.log(id)
    console.log(tokenId)

    try {
        const oldNft = await Nft.findById(id)
        if(!oldNft.isMinted){
            await Nft.findOneAndUpdate({_id:id}, {$set:{tokenId, ownerId, ownerAddress, isMinted}})
            const nft = await Nft.findById(id)
            console.log(nft)
            res.status(200).json(nft)
        }else{
            res.status(400).json({ err: "Already Minted" })
        }
    } catch (err) {
        console.log(err)
        res.status(400).error({ err })
    }
    
})

module.exports = router;