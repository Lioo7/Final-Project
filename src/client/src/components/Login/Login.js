import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-main">
      <div className="login-navbar">
        <div className="login-icon">
          <h3 className="login-logo">People's Budget</h3>
        </div>
      </div>

      <div className="login-form">
        <h2>Login Here</h2>
        <input type="email" name="email" placeholder="Enter Email Here"/>
        <input type="password" name="" placeholder="Enter Password Here"/>
        <button className="login-btnn"><a href="#">Login</a></button>
        <p className="login-link">Don't have an account<br/>
        <a href="#">Sign up </a> here</p>
      </div>
    </div>
  );
};

export default Login;
