import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const MyPlants = () => {
  // const fetchUserPlants = async () => {
  //   try {
  //     const response = await axios.get("/api/plants/user-plants");
  //     const plants = response.data;
  //     console.log(plants);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const fetchUserPlants = async () => {
    try {
      // Step 1: Retrieve the token from local storage
      const userToken = localStorage.getItem("userToken");
      if (!userToken) {
        console.error("No user token found");
        return;
      }

      // Step 2: Decode the token if it's a JWT
      const payload = JSON.parse(atob(userToken.split(".")[1]));
      console.log("ijxsidcbwdhuc wbch", payload.id);
      // Step 3: Extract the user ID
      const userId = payload.id; // Adjust based on your token structure

      // Step 4: Make the GET request with the user ID as a query parameter
      const response = await axios.get(
        `http://localhost:3001/api/plants/user-plants`,
        {
          params: { userId },
        }
      );
      console.log(response);
      const plants = response.data;
      console.log(plants);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1> MyPlants</h1>
      <button onClick={() => fetchUserPlants()}>test</button>
      <Button variant='link'>
        <Link to={`/map`}>Go to map</Link>
      </Button>
    </div>
  );
};

export default MyPlants;
