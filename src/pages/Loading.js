import React from "react";
import logo from "../assets/images/logo_albero_green.png";
const Loading = () => {
  return (
    <div className='loading-container'>
      <div className='loading-content'>
        <img src={logo} alt='loading-logo' className='loading-logo' />
        <div className='spinner'></div>
      </div>
    </div>
  );
};

export default Loading;
