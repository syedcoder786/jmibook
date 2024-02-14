import { 
    USER_LOADED, 
    USER_LOADING,
    AUTH_ERROR,
    REGESTER_SUCCESS,
    REGESTER_FAIL,
    LOGOUT_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    FETCH_USERS,
    LOGIN_LOADING
} from './types';
import {returnErrors} from './errorActions'
import axios from 'axios';

import { proxy } from "../config/default"

export const loadUser = () => (dispatch, getState) => {
    //user loading
    dispatch({type:USER_LOADING})

    //get token from local storage
    const token = getState().auth.token;

    //headers
    const config = {
        headers:{
            "Contect-type":"application/json"
        }
    }
    if(token){
        config.headers['x-auth-token'] = token;
    }

    axios.get(proxy+'/api/login/user', config)
        .then( res => dispatch({
            type:USER_LOADED,
            payload:res.data
        }))
        .catch( err => {
            if(err.response){
                dispatch(returnErrors(err.response.data, err.response.status))
                dispatch({
                type:AUTH_ERROR
                })
            }
        })
}

// Sign up
export const signup = (user) => (dispatch) => {
    console.log("action: "+user.email)
    axios({
        method: 'post',
        url: proxy+'/api/signup',
        data: user
      }).then(user =>dispatch({
        type:REGESTER_SUCCESS,
        payload:user.data
        // console.log(user)
      })).catch(err => {
        console.log(err)
        if(err.response){
            dispatch(returnErrors(err.response.data, err.response.status,'REGESTER_FAIL'));
            dispatch({
                type:REGESTER_FAIL
            })
        }
    })
}

//Log out

export const logout = () => {
    return {
        type:LOGOUT_SUCCESS
    }
}

//Login
export const login = (user) => (dispatch) => {
    dispatch({
        type: LOGIN_LOADING
    })
    axios({
        method:'post',
        url:proxy+'/api/login',
        data: user
    }).then(user => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload:user.data
        })
    }).catch(err => {
        console.log(err.response)
        if(err.response){
            dispatch(returnErrors(err.response.data, err.response.status,'LOGIN_FAIL'));
            dispatch({
                type:LOGIN_FAIL
            })
        }
    })
}

export const fetchUsers = () => (dispatch, getState) => {

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

    axios({
        method:'post',
        url: proxy+'/api/fetchUsers',
        headers: config.headers
    }).then(users => {
        dispatch({
            type: FETCH_USERS,
            payload:users.data
        })
    }).catch(err => {
        console.log(err)
    })
}