import React from 'react'
import { Link } from 'react-router-dom'
import { UseAuth } from '../Context/Context'
import axios from 'axios';

const Header = () => {
    const {currentUser} = UseAuth();
    const {setcurrentUser} = UseAuth();
    const handleLogout = async() => {
        try{
            const {data} = await axios.post("/api/v1/users/logout");
            if(data){
                setcurrentUser(null)
            }
        }catch(err){
            console.log("Error At Logout Page ", err)
        }
    }
  return (
    <div style={{"display": "flex", "justifyContent": "space-between", "maxWidth": "1140", "marginInline": "auto"}}>
        <h3>LOGO</h3>
        <ul>
            {currentUser?.username ? <>
                <Link to='/create-post'>Post </Link>
                <Link to='/create-post'>create-post</Link>
            </> : <>
            <Link to='/'>Posts</Link>
            </>}
            </ul>

            {currentUser ? <>
            <button onClick={handleLogout}>Logout</button>
            <p>Welcome {currentUser?.username}</p>
            </> :
            <>
            <ul>
            <Link to='/login'>Signin</Link>
            <Link to='/signup'>Signup</Link>
            </ul>
            </>
            }
           
            
       
    </div>
  )
}

export default Header