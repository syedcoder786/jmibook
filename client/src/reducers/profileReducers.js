import { PROFILE_USER, PROFILE_POST, USER_IMAGE, USER_DETAILS } from '../actions/types';

const initialState={
    profileUser:{},
    profilePost:[],
    updateUserImage:{},
    updateUserDetails:{},
    editProfileUser:{},
}

export default function(state=initialState,action){
    switch(action.type){
        case PROFILE_USER:
        return{
            ...state,
            profileUser:action.payload,
            // profileUserLoading:true
            }
        case PROFILE_POST:
        return{
            ...state,
            profilePost:action.payload,
            }
        case USER_IMAGE:
            return{
                ...state,
                updateUserImage:action.payload,
                }
        case USER_DETAILS:
            return{
                ...state,
                updateUserDetails:action.payload,
                }
        // case FETCH_PROFILE:
        //     return{
        //         ...state,
        //         editProfileUser:action.payload,
        //         }
        default:
            return state;
    };
}