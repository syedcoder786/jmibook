import { 
    USER_LOADED, 
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGESTER_SUCCESS,
    REGESTER_FAIL,
    FETCH_USERS,
    LOGIN_LOADING,
} from '../actions/types';

const initialState={
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: localStorage.getItem('user'),
    allUsers: []
}

export default function(state=initialState,action){
    switch(action.type){
        case USER_LOADING:
        return {
            ...state,
            isLoading: true
        };
        case LOGIN_LOADING:
        return {
            ...state,
            isLoading: true
        };
        case USER_LOADED:
        localStorage.setItem('user', action.payload)
        return {
            ...state,
            isAuthenticated:true,
            isLoading: false,
            user:action.payload
        };
        case LOGIN_SUCCESS:
        case REGESTER_SUCCESS:
        localStorage.setItem('token', action.payload.token)
        return {
            ...state,
            ...action.payload,
            isAuthenticated:true,
            isLoading: false,
        };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGESTER_FAIL:
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return{
            ...state,
            token:null,
            user:null,
            isAuthenticated:false,
            isLoading:false,
        }

        case FETCH_USERS:
            return {
                ...state,
                allUsers: action.payload
            };

        default:
        return state;
    };
}