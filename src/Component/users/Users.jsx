import { useState } from "react"
import { Link } from "react-router-dom"
import './users.css'

let Paginator = (props) => {

    let portionSize = 5
    
    let pagesCount = Math.ceil(props.totalUsersCount/props.pageSize)

    let pages=[]

    for(let i=1;i<=pagesCount;i++){
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount/portionSize)
    let [portionNumber,setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1)*portionSize+1
    let rightPortionPageNumber = portionNumber * portionSize

    return(
        <div>
            { portionNumber>1 && <button className="Next" onClick={ ()=> {setPortionNumber(portionNumber-1)} } >Prev</button> }

            { pages
            .filter(p=> p>=leftPortionPageNumber && p<=rightPortionPageNumber)
            .map( p => <button className={ props.currentPage===p && "btn" } onClick={ () => props.onPageChanged(p) } >{p}</button> ) }

            { portionCount>portionNumber && <button className="Next" onClick={ ()=>{setPortionNumber(portionNumber+1)} } >Next</button> }

        </div>
    )
}


const Users = (props) => {

    return(
        <div>
            <h2>Users</h2>
            <Paginator onPageChanged={props.onPageChanged} currentPage={props.currentPage} pageSize={props.pageSize} totalUsersCount={props.totalUsersCount}/>
            {
                props.users.map( u => <div key={u.id}>
                    <Link to={"/" + u.id}><img width={250} height={300} src={u.photos.small || 'https://m.media-amazon.com/images/I/51L7OcSInzL.jpg'} alt="p" /></Link>
                    <h3>{u.name}</h3>
                    <span>{u.status || 'Not specified'}</span>
                    {
                        u.followed 
                        ? <button disabled={props.followingInProgress.some(id=>id===u.id)} onClick={()=>props.unFollowThunk(u.id)}>Unfollow</button> 
                        : <button disabled={props.followingInProgress.some(id=>id===u.id)} onClick={()=>props.followThunk(u.id) }>Follow</button>
                    }
                </div> )
            }
        </div>
    )
}

export default Users