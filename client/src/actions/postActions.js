import { ADD_POST, FETCH_POSTS, ADD_COMMENT, ADD_LIKE } from './types';
import axios from 'axios';
import { proxy } from "../config/default"

const CancelToken = axios.CancelToken;
let cancel;

// let x = 0;
// let newData = [];
// let limit = 10, page = 0;

export const fetchPosts = ({ page, limit }) => (dispatch, getState) => {
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


    // if(x === 0){
    //     axios.post('/api/fetchPosts',{ page, limit }, config)
    //     .then(posts => {
    //       newData = posts.data
    //       console.log(newData)
    //       dispatch({
    //           type: FETCH_POSTS,
    //           payload: posts.data
    //       })
    //       page = page + 1
    //       x=1
    //   })
    // }
    // else{

    // if(firstPage){
    //     if(newData.length > 0){
    //         return;
    //     }else{
    //         page=0
    //     }
    // }

    console.log("Page: "+page)

    
      axios.post(proxy+'/api/fetchPosts',{ page, limit }, config)
        .then(posts =>{
            // console.log("fetch triggered")
            
            // if(firstPage)
            //     newData = [...posts.data]
            // else
            //     newData = [...newData,...posts.data]
            
            // console.log(newData)
            dispatch({
                type: FETCH_POSTS,
                payload: posts.data
            }) 
            // page = page + 1
        
        }).catch(err => {
            console.log(err)
        })
        
};


// export const addPost = ( post ) => dispatch => {
//   if(post.get('myImage') === '') console.log('no image in front');
//   else {
//       axios({
//           method: 'post',
//           url: '/api/addPost',
//           data: post,
//           headers: {
//           'Content-Type': 'multipart/form-data'
//       }
//       }).then(item =>
//           dispatch({
//           type: ADD_POST,
//           payload: item.data
//           })
//       ).catch(err => {
//           console.log(err)
//       })
//   }
// }



export const addFPost = ( post ) => (dispatch, getState) => {
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
    
    //   console.log(post)
      axios({
          method: 'post',
          url: proxy+'/api/addFPost',
          data: post,
          headers: config.headers
      }).then(item => {
        dispatch({
          type: ADD_POST,
          payload: item.data
          })
      }
      ).catch(err => {
          console.log(err)
      })
}

export const addComment = ( comment ) => (dispatch, getState) => {
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
          url: proxy+'/api/addComment',
          data: comment,
          headers: config.headers
      }).then(item =>
          dispatch({
          type: ADD_COMMENT,
          payload: item.data
          })
      ).catch(err => {
          console.log(err)
      })
}

export const addLike = ( like ) => (dispatch, getState) => {
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

    if (cancel !== undefined) cancel();
  
  axios({
      method: 'post',
      url: proxy+'/api/addLike',
      data: like,
      headers: config.headers,
      cancelToken: new CancelToken(c => cancel = c),
  }).then(item => {
        console.log(item.data)
        dispatch({
            type: ADD_LIKE,
            payload: item.data
        })
    }
  ).catch(err => {
      console.log(err)
  })
}
