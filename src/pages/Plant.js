import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MdWidthFull } from "react-icons/md";
const Plant = () => {
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  const [error, setError] = useState(null);
  const { plantId } = useParams(); // Extract the ID from the URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3001/api/piantine");

        const item = response.data.find(
          (item) => item.id === parseInt(plantId)
        );
        setPlant(item);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false); // Set loading to false once data fetching is done
      }
    };

    fetchData();
  }, [plantId]);
  console.log("test1", plant);
  if (loading) {
    <div className='loading'>loading</div>;
  }
  if (error) {
    <div className='error'>error</div>;
  }
  if (!plant) {
    return "ciao";
  }
  const { lat, lang, image_url } = plant;
  console.log(lat);
  return (
    <div>
      <h1>Plant details</h1>
      <div>
        <img className='plant-image' src={image_url} alt='' />
      </div>

      <ul>
        <li>
          <span>lat:</span> <span>{lat}</span>
        </li>
        <li>
          <span>lang:</span> <span>{lang}</span>
        </li>
      </ul>
      <Link to={"/map"}>go back</Link>
    </div>
  );
};

export default Plant;
