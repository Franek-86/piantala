import React from "react";
import { Link } from "react-router-dom";

const AddPlant = () => {
  return (
    <div>
      <h1>add plant</h1>
      <Link to={"/map"}>go back</Link>
    </div>
  );
};

export default AddPlant;
