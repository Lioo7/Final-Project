import React from "react";
import "./SignUp.css";

const Login = () => {
  return (
    <div className="sign-main">
      <div className="sign-navbar">
        <div className="sign-icon">
          <h3 className="sign-logo">People's Budget</h3>
        </div>
      </div>

      <div className="sign-form">
        <h2>Sign Up</h2>
        <input type="email" name="email" placeholder="Enter Email Here"/>
        <input type="password" name="" placeholder="Enter Password Here"/>
        <input type="password" name="" placeholder="Repeat Password"/><br/>
        <input type="checkbox" id="checkbox"/><label for="checkbox"><span></span>Remember me</label>
        <button className="sign-btnn"><a href="#">Sign Up</a></button>
      </div>
    </div>
  );
};

export default Login;
