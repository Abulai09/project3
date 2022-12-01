import React from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { getProfileThunk } from "../../redux/profile-reducer"
import withRouterr from "../HOC/withRouter"
import UserProfile from "./userProfile"

class UserProfileContainer extends React.Component{

    componentDidMount(){
        let userId = this.props.params.userID 
        if(!userId){
            userId=this.props.authedId
        }
        this.props.getProfileThunk(userId)
    }

    render(){
        return(
            <div>
                <UserProfile profile={this.props.profile}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return{
        profile:state.ProfilePage.profile,
        authedId:state.auth.id
    }
}

export default compose(
    withRouterr,
    connect(mapStateToProps,{getProfileThunk})
)
(UserProfileContainer)