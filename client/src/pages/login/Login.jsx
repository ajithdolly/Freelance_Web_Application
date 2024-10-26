import "./Login.scss";
import newRequest from "../../utils/newRequest";

import React, { useState } from "react";
import {Link, useNavigate } from "react-router-dom"
import {toast} from "react-toastify"

function Login() {
  
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{

      const res = await newRequest.post("/auth/login",{username,password});
      localStorage.setItem("currentUser",JSON.stringify(res.data));
      navigate("/");
    }catch(err){
      toast.error(err.response.data, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      
    }

  }

  return (
    <div className="container">
      <div className="login-container">

        <div className="login">
          <form onSubmit={handleSubmit}>
            <h1>Sign in</h1>
            <label htmlFor="">Username</label>
            <input
              name="username"
              type="text"
              placeholder="johndoe"
              onChange={e=>setUsername(e.target.value)}
            />

            <label htmlFor="">Password</label>
            <input
              name="password"
              type="password"
              onChange={e=>setPassword(e.target.value)}
              
            />
            <button type="submit">Login</button>
            
          </form>
          <div className="under-text" style={{fontSize:18}}>
              <p>Forgot Password? Click <Link className="link" style= {{color : 'blue'}}> here </Link> to reset password.</p>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Login;