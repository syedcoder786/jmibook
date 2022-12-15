import { NEWS_DATA, LATEST_NEWS, NEWS_COMPONENT, NEWS_COMMENT, ADD_NEWS } from '../actions/types';

const initialState={
    newsData: [],
    latestNews: [],
    newsComponent: {},
    newsCommment: null,
    addNewsData: null,
}

export default function(state=initialState,action){
    switch(action.type){
        case NEWS_DATA:
        return{
            ...state,
            newsData:action.payload,
            }

        case LATEST_NEWS:
            return{
                ...state,
                latestNews:action.payload,
                }

        case NEWS_COMPONENT:
            return{
                ...state,
                newsComponent:action.payload,
                }
        case NEWS_COMMENT:
            return{
                ...state,
                newsCommment:action.payload,
                }
        case ADD_NEWS:
            return{
                ...state,
                addNewsData:action.payload,
                }
        default:
            return state;
    };
}