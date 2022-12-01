import axios from "axios";

let instance = axios.create({
    withCredentials:true,
    baseURL:'https://social-network.samuraijs.com/api/1.0/',
    headers:{
        'API-KEY':'b25d5b20-c3b5-4eec-b816-871b79bcd299'
    }
})

export let requestDAL = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then( response => response.data )
    },
    authMe(){
        return instance.get(`auth/me`)
    },
    Follow(userId){
        return instance.post(`follow/${userId}`)
    },
    Unfollow(userId){
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId){
        return instance.get(`profile/${userId}`)
    },
    login(email,password,rememberMe=false){
        return instance.post('auth/login',{email,password,rememberMe})
      },
    logout(){
        return instance.delete(`auth/login`)
    }
}