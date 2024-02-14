import { FETCH_NFTS, MINT_NFT } from './types';
import axios from "axios"

import { proxy } from "../config/default"

export const fetchNfts = () => (dispatch, getState) => {
    //get token from local storage
    const token = getState().auth.token;

    //headers
    const config = {
        headers:{
            "Content-type":"application/json"
        }
    }
    if(token){
        config.headers['x-auth-token'] = token;
    }

    console.log(config)
    axios.post(proxy+'/api/fetchNfts',{},config)
    .then(nfts =>{
        dispatch({
            type: FETCH_NFTS,
            payload: nfts.data
        })
    }).catch(err => {
        console.log(err)
    })
        
};


export const mintNft = (nftdetails) => (dispatch, getState) => {
    //get token from local storage
    const token = getState().auth.token;

    //headers
    const config = {
        headers:{
            "Content-type":"application/json"
        }
    }
    if(token){
        config.headers['x-auth-token'] = token;
    }

    console.log(config)
    axios.post(proxy+'/api/mintNft',nftdetails,config)
    .then(nft =>{
        dispatch({
            type: MINT_NFT,
            payload: nft.data
        })
    }).catch(err => {
        console.log(err)
    })
        
};