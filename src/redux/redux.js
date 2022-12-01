import { combineReducers, createStore,applyMiddleware } from "redux";
import ProfileReducer from "./profile-reducer";
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk'
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";


let reducers = combineReducers({
    ProfilePage:ProfileReducer,
    usersPage:usersReducer,
    auth:authReducer,
    app:appReducer,
    form: formReducer
})

let store = createStore(reducers,applyMiddleware(thunk))

window.store=store

export default store