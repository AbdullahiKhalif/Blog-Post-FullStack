import { Outlet, useNavigate } from "react-router-dom"
import Header from "./Components/Header"
import { UseAuth } from "./Context/Context"
import { useEffect } from "react";
import axios from "axios";

function App() {
  const {setcurrentUser} = UseAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserProfile = async() => {
      try{
        const {data} = await axios.get("/api/v1/users/getUserProfile");
        if(data){
          setcurrentUser(data);
        }
      }catch(err){
        console.log("ERROR AT Fetch User Profile ", err)
        if(err.response.status = 403){
          navigate('/')
        }
      }
    }

    fetchUserProfile();
  }, [setcurrentUser])
  return (
    <>
      <Header/>
      <Outlet />
    </>
  )
}

export default App
