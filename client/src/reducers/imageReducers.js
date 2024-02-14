import { FETCH_POST } from '../actions/types';

const initialState = {
    item:{},
    // items:[]
}
export default function(state = initialState, action){
    switch( action.type ){
        case FETCH_POST:
        return {
            ...state,
            item:action.payload
        };
        // case FETCH_IMAGES:
        // return {
        //     ...state,
        //     items:action.payload
        // };
        default:
        return state;
    };
}