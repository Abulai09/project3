import React from "react";
import { connect } from "react-redux";
import { Route,Routes } from "react-router-dom";
import HedaderContainer from "./Component/header/headerContainer";
import Login from "./Component/Login/Login";
import ProfileInfo from "./Component/profile/profileinfo";
import UsersContainer from "./Component/users/UsersContainer";
import { setInitializedThunk } from "./redux/app-reducer";

class App extends React.Component {

  componentDidMount(){
    this.props.setInitializedThunk()
  }  
  
  render(){
    if(!this.props.isInitialized){
      return <div><h2>Loading...</h2></div>
    }else{
    return (
      <div>
        <div>
          <HedaderContainer/>
          <Routes>
              <Route path="/" element={<ProfileInfo/>}/>
              <Route path="/:userID" element={<ProfileInfo/>}/>
              <Route path="/users" element={<UsersContainer/>}/>
              <Route path="/login" element={<Login/>}/>
          </Routes>
        </div>
      </div>
  )}}
}

let mapStateToProps = (state) => {
  return{
    isInitialized:state.app.isInitialized
  }
}

export default connect(mapStateToProps,{setInitializedThunk})(App);