import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Plant = () => {
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { plantId } = useParams();

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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [plantId]);

  const handleStatusChange = async (newStatus) => {
    const token = localStorage.getItem("userToken"); // Retrieve the token from localStorage
    console.log(newStatus, plantId);
    try {
      await axios.patch(
        `http://localhost:3001/api/piantine/${plantId}/status`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
      setPlant((prevPlant) => ({ ...prevPlant, status_piantina: newStatus }));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className='loading'>Loading...</div>;
  if (error) return <div className='error'>{error}</div>;
  if (!plant) return <div>No plant found.</div>;

  const { lat, lang, image_url, status_piantina } = plant;

  return (
    <div>
      <h1>Plant details</h1>
      <div>
        <img
          className='plant-image'
          src={`http://localhost:3001${image_url}`}
          alt=''
        />
      </div>
      <ul>
        <li>
          <span>Lat:</span> <span>{lat}</span>
        </li>
        <li>
          <span>Lang:</span> <span>{lang}</span>
        </li>
        <li>
          <span>Status:</span> <span>{status_piantina}</span>
        </li>
      </ul>
      <button onClick={() => handleStatusChange("approved")}>Approve</button>
      <button onClick={() => handleStatusChange("rejected")}>Reject</button>
      <Link to={"/map"}>Go back</Link>
    </div>
  );
};

export default Plant;
