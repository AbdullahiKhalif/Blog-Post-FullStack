import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const naviagte = useNavigate();
    const handleSubmit = async(event) =>{
        try{
            const {data} = await axios.post("/api/v1/users/", {firstName, lastName, username, email, password})
            if(data){
                naviagte('/login');
            }
        }catch(err){
            console.log("ERROR AT Register Page, err");
        }
    }
  return (
    <div>
        <h1>Signup</h1>

        <form onSubmit={handleSubmit}>
            First Name: <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/><br/>
            Last Name: <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/><br/>
            Username : <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/><br/>
            Email    : <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
            Password    : <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/><br/>

            <button type='submit'>Register</button>
        </form>
    </div>
  )
}

export default Signup