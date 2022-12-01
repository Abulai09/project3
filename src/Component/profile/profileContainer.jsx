import React from "react"
import { connect } from "react-redux"
import { addPostAC } from "../../redux/profile-reducer"
import ProfilePost from "./profilePost"
import { Navigate } from "react-router-dom";


class ProfileContainer extends React.Component{
    render(){
        return(
            <div>
                <ProfilePost addPostAC={this.props.addPostAC} posts={this.props.posts}/>
                { !this.props.isAuth && <Navigate to="/login"/> }
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return{
        posts:state.ProfilePage.posts,
        isAuth:state.auth.isAuth
    }
} 

export default connect(mapStateToProps,{addPostAC})(ProfileContainer)