import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const MyPlants = () => {
  const fetchUserPlants = async () => {
    try {
      const response = await axios.get("/api/plants/user-plants");
      const plants = response.data;
      console.log(plants);
    } catch (error) {
      console.log(error);
    }
  };
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
