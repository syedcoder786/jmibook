import {combineReducers} from 'redux';
import postReducer from './postReducers';
import errorReducer from './errorReducers';
import authReducer from './authReducers';
import profileReducer from './profileReducers';
import newsReducer from './newsReducers';
import nftReducers from './nftReducers';

export default combineReducers({
    post:postReducer,
    error:errorReducer,
    auth:authReducer,
    profile:profileReducer,
    news:newsReducer,
    nft:nftReducers,
});