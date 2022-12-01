import { requestDAL } from "../requests/requests"

let initialState = {
    users:[],
    currentPage:1,
    pageSize:5,
    totalUsersCount:20,
    isFetching:false,
    followingInProgress:[]
}

let getUsersAC = (users) => ({type:"getUsers",users})
export let setCurrentPageAC = (currentpage) => ({type:'setCurrentPage',currentpage})
 let FollowAC = (userId) => ({type:"Follow",userId})
 let UnfollowAC = (userId) => ({type:"Unfollow",userId})
let settotalUsersCountAC = (totalUsersCount) => ({type:"setTotalUsersCount",totalUsersCount})
let setIsFetchingAC = (fetching) => ({type:'setIsFetching',fetching})
let toggleFollowingInProgress = (boool,userId) => ({type:"followingInProgress",boool,userId})

let usersReducer = (state=initialState,action) => {
    switch(action.type){
        case "getUsers":
            return{
                ...state,
                users:action.users
            }
        case "followingInProgress":
            return{
                ...state,
                followingInProgress:action.boool
                ?[...state.followingInProgress,action.userId]
                :state.followingInProgress.filter(id=> id != action.userId)
            }
        case "setCurrentPage":
            return{
                ...state,
                currentPage:action.currentpage
            }
        case 'setIsFetching':
            return{
                ...state,
                isFetching:action.fetching
            }
        case "setTotalUsersCount":
            return{
                ...state,
                totalUsersCount:action.totalUsersCount
            }
        case "Follow":
            return{
                ...state,
                users:state.users.map(u=>{
                    if(u.id===action.userId){
                        return {...u,followed:true}
                    }
                    return u
                })
            }
        
            case "Unfollow":
                return{
                    ...state,
                    users:state.users.map(u=>{
                        if(u.id===action.userId){
                            return {...u,followed:false}
                        }
                        return u
                    })
                }
        default:
            return state
    }
}

export let getUsersThunk = (currentPage,pageSize) => {
    return (dispatch) => {
        dispatch(setIsFetchingAC(true))
        requestDAL.getUsers(currentPage,pageSize).then( data => {
            dispatch(setIsFetchingAC(false))
            dispatch(getUsersAC(data.items))
            dispatch(settotalUsersCountAC(data.totalCount))
        })
    }
}

export let followThunk = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingInProgress(true,userId))
        requestDAL.Follow(userId).then( response => {
            if(response.data. resultCode===0){
                dispatch(FollowAC(userId))
            }
            dispatch(toggleFollowingInProgress(false,userId))
        } )
    }
}

export let unFollowThunk = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingInProgress(true,userId))
        requestDAL.Unfollow(userId).then( response => {
            if(response.data.resultCode===0){
                dispatch(UnfollowAC(userId))
            }
            dispatch(toggleFollowingInProgress(false,userId))
        } )
    }
}

export default usersReducer