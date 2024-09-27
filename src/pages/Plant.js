import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Plant = () => {
  const [item, setItem] = useState();
  const { plantId } = useParams(); // Extract the ID from the URL

  useEffect(() => {
    console.log("aaa", plantId);
    // fetch("/api/piantine")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("testtesttest", data);
    //     const item = data.find((item) => item.plantId === parseInt(plantId));
    //     setItem(item);
    //   })
    //   .catch((error) => console.error("Error fetching items:", error));
  }, []);

  return (
    <div>
      <h1>Plant details</h1>
      <p>{plantId}</p>
      <Link to={"/map"}>go back</Link>
    </div>
  );
};

export default Plant;
