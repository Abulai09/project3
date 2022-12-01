import { Link } from "react-router-dom"

const Header = (props) => {

    let logout = () => {
        props.logOutThunk()
    }

    return(
        <div>
            { props.isAuth && <div><h1>{props.login}</h1> <h2>{props.email}</h2></div>}
            { props.isAuth &&  <div><button onClick={logout}>Logout</button></div>}
            <Link to={"/"}>Profile</Link>
            <Link to={"/users"}>Users</Link>
        </div>
    )
}

export default Header