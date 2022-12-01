import { connect } from "react-redux"
import { Field, reduxForm } from "redux-form"
import Input from "../FormControl/input"
import {Navigate} from 'react-router-dom'
import { loginThunk } from "../../redux/auth-reducer"
import { required } from "../../utils/validations"


const LoginForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}> 
            <Field validate={[required]} name="login" component={Input} placeholder="login" />
            <Field validate={[required]}  name="password" component={Input} placeholder="password" type={"password"}/>
            <div><Field component={"input"} name="checkbox" type="checkbox" />remember</div>
            { props.error && <div><span>{props.error}</span></div> }
            <button>login</button>
        </form>
    )
}

let LoginFormRedux = reduxForm({form:"login"})(LoginForm)

const Login = (props) => {

    if(props.isAuth){
        return <Navigate replace to='/'/>
    }

    let onSubmitLogin = (data) => {
        props.loginThunk(data.login,data.password,data.checkbox)
    }
    
    return(
        <div>
            <h1>Login</h1>
            <LoginFormRedux onSubmit={ onSubmitLogin }/>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        isAuth : state.auth.isAuth
    }
}

export default connect(mapStateToProps,{loginThunk})(Login)