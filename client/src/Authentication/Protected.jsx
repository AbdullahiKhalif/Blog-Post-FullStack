import React, { useEffect } from 'react'
import { UseAuth } from '../Context/Context'
import { useNavigate } from 'react-router-dom';

const Protected = ({children}) => {
    const {currentUser} = UseAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if(!currentUser){
            navigate('/login')
        }
    },[currentUser])
  return <div>{children}</div>
}

export default Protected