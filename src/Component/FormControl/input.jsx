import s from './formControl.module.css'

let Input = ({input,meta,...props}) => {

    let hasError = meta.touched && meta.error

    return (
        <div  className={ s.formControl + " " + (hasError ? s.error : + " ") }>
            <input {...input} {...props} />
            {hasError ? <span>{meta.error}</span> : null } 
        </div>
    )
}

export default Input