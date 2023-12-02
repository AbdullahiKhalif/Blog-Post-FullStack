import axios from "axios";
import React, { useState } from "react";
import { UseAuth } from "../Context/Context";
import { useNavigate } from "react-router-dom";

const Sigin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {setcurrentUser} = UseAuth();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/users/login", {
        username,
        password,
      });
      if (data) {
        setcurrentUser(data)
        navigate('/create-post')
      }
    } catch (err) {
      console.log("ERROR ", err);
    }
  };
  return (
    <div>
      <h2>LOGIN</h2>
      <form onSubmit={handleSubmit}>
        username:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />{" "}
        <br />
        password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />{" "}
        <br />
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Sigin;
