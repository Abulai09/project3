import { stopSubmit } from "redux-form"
import { requestDAL } from "../requests/requests"

let initialState = {
    isAuth:false,
    email:null,
    login:null,
    id:null
}

let getAuthAC = (email,login,id,isAuth) => ({type:"getAuth",data:{email,login,id,isAuth}})

let authReducer = (state=initialState,action) => {
    switch(action.type){
        case "getAuth":
            return {
                ...state,
                ...action.data
            }
        default:
            return state
    }
}

export let getAuthThunk = () => {
    return (dispatch) => {
        requestDAL.authMe().then( response => {
            if(response.data.resultCode===0){
                let {email,login,id} = response.data.data
                dispatch(getAuthAC(email,login,id,true))
        }})
    }
}

export let loginThunk = (email,password,rememberMe) => {
    return (dispatch) => {
        requestDAL.login(email,password,rememberMe).then( response => {
            if(response.data.resultCode === 0){
                dispatch(getAuthThunk())
            }
            else{
                let message = response.data.messages.length>0 ? "Invalid passoword or email" : null
                dispatch( stopSubmit("login",{_error:message}) )
            }
        } )
    }
}

export let logOutThunk = () => {
    return (dispatch) => {
        requestDAL.logout().then( response => {
            if(response.data.resultCode===0){
                dispatch(getAuthAC(null,null,null,false))
            }
        } )
    }
}

export default authReducer