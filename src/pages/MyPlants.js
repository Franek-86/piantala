import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyPlants = () => {
  return (
    <div>
      <h1> MyPlants</h1>

      <Button variant='link'>
        <Link to={`/map`}>Go to map</Link>
      </Button>
    </div>
  );
};

export default MyPlants;
