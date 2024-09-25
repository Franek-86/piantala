import React from "react";
import { Link } from "react-router-dom";

const Buttons = () => {
  // const addPlant = () => {
  //   console.log("add plant");
  //   return;
  // };
  return (
    <div className='testButton'>
      {/* <button onClick={() => addPlant()}>add</button> */}
      <Link className='btn' to='/map/addPlant'>
        add
      </Link>
      <button>remove</button>
    </div>
  );
};

export default Buttons;
