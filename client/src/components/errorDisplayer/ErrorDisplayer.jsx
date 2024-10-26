import "./ErrorDisplayer.scss";

import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorDisplayer = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/')
  }

  return (
    <div className="container">
      <div className="error-container">
        <h1 class="heading"> 404 </h1>
        <h3 class="sub-heading">Oops! Error loading data...</h3>
        <div class="buttons">
          <button class="btn active" id="home" onClick={handleNavigate}>
            Return home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplayer;
