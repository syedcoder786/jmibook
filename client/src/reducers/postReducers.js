import { FETCH_POSTS, ADD_POST, ERROR_POST, POST_LOADING, POST_LOADED, ADD_COMMENT, ADD_LIKE } from '../actions/types';

const initialState={
    items:[],
    item:{},
    cmtitem:{},
    likeitem:{},
    itemerr:{},
    postLoading: false,
    limit: 10,
    page:0
}

export default function(state=initialState,action){
    switch(action.type){
        case POST_LOADING:
        return{
            ...state,
            postLoading:true
            }
        case POST_LOADED:
        return{
            ...state,
            postLoading:false
            }
        case FETCH_POSTS:
        return {
            ...state,
            items:[...state.items, ...action.payload],
            page: state.page + 1
        };
        case ADD_POST:
        return {
            ...state,
            items:[action.payload, ...state.items],
            item:action.payload
        };
        
        case ERROR_POST:
        return {
            ...state,
            itemerr:action.payload
        };
        case ADD_COMMENT:
            return {
                ...state,
                cmtitem:action.payload
        };
        case ADD_LIKE:
            return {
                ...state,
                likeitem:action.payload
        };
        default:
        return state;
    };
}