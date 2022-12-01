import React from "react"
import { connect } from "react-redux"
import { logOutThunk } from "../../redux/auth-reducer"
import Header from "./header"

class HedaderContainer extends React.Component{
    render(){
        return(
            <div><Header logOutThunk={this.props.logOutThunk} login={this.props.login} email={this.props.email} isAuth={this.props.isAuth}/></div>
        )
    }
}

let mapStateToProps = (state) => {
    return{
        isAuth:state.auth.isAuth,
        email:state.auth.email,
        login:state.auth.login
    }
}

export default connect(mapStateToProps,{logOutThunk})(HedaderContainer)