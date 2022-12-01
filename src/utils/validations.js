export let required = (value) => {
    if(value){
        return undefined
    }
    else{
        return "Field is required"
    }
}

export let maxLength = (len) =>{
    return (value) => {
        if(value && value.length > len) return "Max length" + len
        return undefined
    }
}