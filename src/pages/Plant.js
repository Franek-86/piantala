import React from "react";
import { Link } from "react-router-dom";

const Plant = () => {
  return (
    <div>
      <h1>Plant details</h1>
      <Link to={"/map"}>go back</Link>
    </div>
  );
};

export default Plant;
