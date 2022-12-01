import { requestDAL } from "../requests/requests"

let initialState = {
    posts:[
        {mes:"hey"},
        {mes:"hey hey"}
    ],
    profile:[]
}

export let addPostAC = (mes) => ({type:"addPost",mes})
let getProfileAC = (profile) => ({type:"getProfile",profile})

let ProfileReducer = (state=initialState,action) => {
    switch(action.type){
        case "addPost":
            let newPost= {mes:action.mes}
            return{
                ...state,
                posts:[...state.posts,newPost]
            }
        case "getProfile":
            return{
                ...state,
                profile:action.profile
            }
        default:
            return state
    }
}

export let getProfileThunk = (profile) => {
    return (dispatch) => {
        requestDAL.getProfile(profile).then( response => {
           
            dispatch(getProfileAC(response.data))
            
        } )
    }
}

export default ProfileReducer