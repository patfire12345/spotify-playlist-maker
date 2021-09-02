import React from "react";
import "./Home.css";

export const Home = (props) => {
  return (
    <div className="home-container">
      <div className="home-start-button">
        <button onClick={props.changeStart}>Start</button>
      </div>
    </div>
  );
};
