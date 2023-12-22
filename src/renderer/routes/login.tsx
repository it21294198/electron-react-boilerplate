import React, { useState } from "react";
import logo from '../../../assets/logo.png'
import '../styles/login.css'

function Login() {

    const [error, setError] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = () => {
        // Simulate an error for demonstration purposes
        setError("Invalid username or password");
    };

    return (
    <div>
        <div className="loginDiv">
            <img src={logo} alt="logo" className="loginImage"/>
            {error && <div className="loginError">{error}</div>}
            <input type="text" placeholder="Enter user name" onChange={(e)=>{setUsername(e.target.value)}} className="username"/>
            <input type="password" placeholder="Enter password" onChange={(e)=>{setPassword(e.target.value)}} className="password"/>
            <button onClick={()=>{handleLogin()}} className="login-btn">Login</button>
            {/* {username}--{password} */}
        </div>
    </div>)

}

export default Login;