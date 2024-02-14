import { NEWS_DATA, LATEST_NEWS, NEWS_COMPONENT, NEWS_COMMENT, ADD_NEWS } from './types';
import axios from "axios"

import { proxy } from "../config/default"

export const fetchNews = ({ oldData, page, limit }) => (dispatch, getState) => {

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

    axios.post(proxy+'/api/fetchNews',{ page, limit }, config)
    .then(news =>{

      oldData = [...oldData,...news.data]
    //   console.log('New:'+ newData.length)
      dispatch({
          type: NEWS_DATA,
          payload: oldData
      }) 
    // page = page + 1
  })
}

export const fetchLatestNews = () => (dispatch, getState) => {

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
      method: 'post',
      url: proxy+'/api/fetchNews/latest',
      headers: config.headers
    })
    .then(news =>{
      // console.log(news)
      dispatch({
          type: LATEST_NEWS,
          payload: news.data
      }) 
    })
}

export const fetchNewsComponent = (id) => (dispatch, getState) => {

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
    method: 'post',
    url: proxy+'/api/fetchNews/component',
    data: {id},
    headers: config.headers
  })
  .then(newsComponent =>{
    // console.log(newsComponent.data)
    dispatch({
        type: NEWS_COMPONENT,
        payload: newsComponent.data
    }) 
  })
}

export const addNewsComment = (newcomment) => (dispatch, getState) => {

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
    method: 'post',
    url: proxy+'/api/fetchNews/addComment',
    data: newcomment,
    headers: config.headers
  })
  .then(comment =>{
    // console.log(comment.data)
    dispatch({
        type: NEWS_COMMENT,
        payload: comment.data
    }) 
  })
}

export const clearNewsComponent = () => (dispatch) => {
    dispatch({
      type: NEWS_COMPONENT,
      payload:  {}
    }) 
}

export const addNews = (news) => (dispatch, getState) => {

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
      method: 'post',
      url: proxy+'/api/addNews',
      data: news,
      headers: config.headers
    })
    .then(newsData =>{
      // console.log(comment.data)
      dispatch({
          type: ADD_NEWS,
          payload: newsData.data
      }) 
    })
}