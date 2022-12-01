import React from "react";
import { connect } from "react-redux";
import {  followThunk, getUsersThunk, setCurrentPageAC, UnfollowAC, unFollowThunk } from "../../redux/users-reducer";
import Users from "./Users";

class UsersContainer extends React.Component{

    componentDidMount(){
        this.props.getUsersThunk(this.props.currentPage,this.props.pageSize)
    }

    onPageChanged = (num) => {
        this.props.setCurrentPageAC(num)
        this.props.getUsersThunk(num,this.props.pageSize)
    }

    render(){
        return(
            <div>
                { this.props.isFetching ? <h1>Loading...</h1> : <Users followingInProgress={this.props.followingInProgress} unFollowThunk={this.props.unFollowThunk} followThunk={this.props.followThunk} onPageChanged={this.onPageChanged} totalUsersCount={this.props.totalUsersCount} currentPage={this.props.currentPage} pageSize={this.props.pageSize} users={this.props.users}/>
}
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return{
        users:state.usersPage.users,
        pageSize:state.usersPage.pageSize,
        currentPage:state.usersPage.currentPage,
        totalUsersCount:state.usersPage.totalUsersCount,
        isFetching:state.usersPage.isFetching,
        followingInProgress:state.usersPage.followingInProgress
    }
}
export default connect(mapStateToProps,{getUsersThunk,setCurrentPageAC,followThunk,unFollowThunk})(UsersContainer)