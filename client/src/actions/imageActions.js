import { IMAGE_DATA } from './types';
import axios from 'axios';
// var y,x=0;
import { proxy } from "../config/default"


export const AddnewImage = ( imagereg ) => dispatch => {
    if(imagereg.get('myImage') === '') console.log('no image in front');
    else {
        axios({
            method: proxy+'post',
            url: '/upload',
            data: imagereg,
            headers: {
            'Content-Type': 'multipart/form-data'
        }
        }).then(item =>
            dispatch({
            type: IMAGE_DATA,
            payload: item.data
            })
        ).catch(err => {
            console.log(err)
        })
    }
}


// export const FetchImages= () =>dispatch => {
// axios.get(proxy+'/fetch')
//   // .then(res => res.json())
//       .then(images =>{
//         if (x===0){
//               console.log(x)
//               dispatch({
//                 type: FETCH_IMAGES,
//                 payload: images.data
//               })
//               x=1;
//               y=images.data.length;
//               console.log('first')
//               console.log(y)
//         }
//         else if (y!==images.data.length){
//                   console.log(y)
//                   dispatch({
//                     type: FETCH_IMAGES,
//                     payload: images.data
//                   })
//                   y=images.data.length;
//                   console.log('secound')
//         }

//       })
// }
