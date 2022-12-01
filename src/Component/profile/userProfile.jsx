const UserProfile = (props) => {
    return(
        <div>
             <h3>name:{props.profile.fullName}</h3>
            <h4>lookingForAJobDescription:{props.profile.lookingForAJobDescription || "Not"}</h4>
            <img src={"https://starpri.ru/wp-content/uploads/2018/12/image.jpg"} alt="photo" />
        </div>
    )
}

export default UserProfile