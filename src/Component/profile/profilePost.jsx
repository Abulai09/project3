import { Field, reduxForm } from "redux-form"
import { maxLength, required } from "../../utils/validations"
import Input from "../FormControl/input"

let ProfileForm = (props) => {

    let maxLength5=maxLength(5)

    return(
        <form onSubmit={props.handleSubmit}>
            <Field validate={[required,maxLength5]} placeholder="type.." name="profileInput" component={Input}/>
            <button>send</button>
        </form>
    )
}

let ProfileFormRedux = reduxForm({form:"profileForm"})(ProfileForm)

let ProfilePost = (props) => {

    let posting = (values) => {
        props.addPostAC(values.profileInput)
        values.profileInput=""
    }

    let post = [...props.posts].reverse().map( p => <div>{p.mes}</div> )

    return (
        <div>
            <ProfileFormRedux onSubmit={posting}/>
            {post}
        </div>
    )
}

export default ProfilePost