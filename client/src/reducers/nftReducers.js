import { FETCH_NFTS, MINT_NFT } from '../actions/types';

const initialState={
    nfts: [],
    mintedNft: null,
}

export default function(state=initialState,action){
    switch(action.type){
        case FETCH_NFTS:
        return {
            ...state,
            nfts:action.payload
        };
        case MINT_NFT:
        return {
            ...state,
            mintedNft:action.payload
        };
        default:
        return state;
    };
}