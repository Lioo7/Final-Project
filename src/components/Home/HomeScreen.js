import React from "react";
import "./HomeScreen.css";

const HomeScreen = () => {
  return (
    <div className="home-main">
      <div className="home-navbar">
        <div className="home-icon">
          <h3 className="home-logo">People's Budget</h3>
        </div>
        <div className="home-menu">
          <ul>
            <li><a href="#">HOME</a></li>
            <li><a href="#">VOTE</a></li>
            <li><a href="#">INFORMATION</a></li>
            <li><a href="#">STATISTICS</a></li>
            <li><a href="#">RESULTS</a></li>
          </ul>
        </div>
      </div>
      <div className="home-content">
        <h1>Your votes, your budget 💰</h1>
        <p className="home-par">The site is a platform for citizens to participate in the division of the people's budget.<br/>
         Citizens can view the current budget distribution and make changes based on their preferences.<br/>
         The site provides information on the proposed projects and allows citizens to vote on the budget distribution.<br/>
         The results of the voting, including comparisons to the existing budget, will be published on the website.</p>
      </div>
    </div>
  );
};

export default HomeScreen;
