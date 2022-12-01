import { getAuthThunk } from "./auth-reducer"

let initialState = {
    isInitialized:false
}

let setInitializedAC = () => ({type:"setInitialized"})

let appReducer = (state=initialState,action) => {
    switch(action.type){
        case "setInitialized":
            return{
                ...state,
                isInitialized:true
            }
        default:
            return state
    }
}

export let setInitializedThunk = () => {
    return (dispatch) => {
        let promise = dispatch(getAuthThunk())
        Promise.all([promise]).then( () =>{
            dispatch(setInitializedAC())
        } )
    }
}

export default appReducer