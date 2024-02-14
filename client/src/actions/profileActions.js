import { PROFILE_USER, PROFILE_POST, USER_IMAGE, USER_DETAILS } from './types';
import axios from "axios"
import { proxy } from "../config/default"


export const fetchProfilePost = ({ id, newData, page, limit }) => (dispatch, getState) => {

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

  // console.log("page:"+page)
  // console.log("newData")
  // console.log(newData)

    axios.post(proxy+'/api/fetchProfilePost',{ id, page, limit }, config)
    .then(posts =>{
      // console.log(posts.data)
      newData = [...newData,...posts.data]
    //   console.log('New:'+ newData.length)
      dispatch({
          type: PROFILE_POST,
          payload: newData
      }) 
    // page = page + 1
  })
}

export const fetchProfileUser = (id) => (dispatch, getState) => {

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
        url: proxy+'/api/fetchProfileUser',
        data: {id},
        headers: config.headers
    }).then(user => {
      dispatch({
        type: PROFILE_USER,
        payload: user.data
        })
    }
    ).catch(err => {
        console.log(err)
    })
}

export const updateUserImage = (profileUrl) => (dispatch, getState) => {
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
      url: proxy+'/api/updateUserImage',
      data: profileUrl,
      headers: config.headers
  }).then(userImage => {
    dispatch({
      type: USER_IMAGE,
      payload: userImage.data
      })
  }
  ).catch(err => {
      console.log(err)
  })
}

export const updateUserDetails = (profileUser) => (dispatch, getState) => {

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
      url: proxy+'/api/updateUserDetails',
      data: profileUser,
      headers: config.headers
  }).then(userData => {
    dispatch({
      type: USER_DETAILS,
      payload: userData.data
      })
  }
  ).catch(err => {
      console.log(err)
  })
}

// export const fetchEditProfile = () => dispatch => {
//   axios({
//       method: 'post',
//       url: proxy+'/api/fetchEditProfile',
//   }).then(profileData => {
//     dispatch({
//       type: FETCH_PROFILE,
//       payload: profileData.data
//       })
//   }
//   ).catch(err => {
//       console.log(err)
//   })
// }

export const clearProfilePosts = () => dispatch => {
  dispatch({
    type: PROFILE_POST,
    payload: []
  }) 
}