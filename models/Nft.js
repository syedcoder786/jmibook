const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const NftSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    rarity: {
        type:String,
        required:true
    },
    price: {
        type:Number,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    imageUri: {
        type:String,
        required:true
    },
    uri: {
        type:String,
        required:true
    },
    tokenId: {
        type:Number,
        required:true
    },
    ownerId:{
        type:String,
        required:true
    },
    ownerAddress:{
        type:String,
        required:true
    },
    isMinted: {
        type:Boolean,
        required:true
    },
},
{
    timestamp: true
}
)

module.exports = Nft = mongoose.model('nft', NftSchema);