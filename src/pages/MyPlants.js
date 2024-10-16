import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

const MyPlants = () => {
  const [myPlants, setMyPlants] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const fetchUserPlants = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      if (!userToken) {
        console.error("No user token found");
        return;
      }

      const payload = JSON.parse(atob(userToken.split(".")[1]));
      const userId = payload.id;

      const response = await axios.get(
        `http://localhost:3001/api/plants/user-plants`,
        {
          params: { userId },
        }
      );
      setMyPlants(response.data); // Store the plants in state
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchUserPlants(); // Fetch plants on component mount
  }, []);

  const renderStatusIndicator = (status) => {
    const statusStyles = {
      approved: { backgroundColor: "green", color: "white" },
      pending: { backgroundColor: "yellow", color: "black" },
      rejected: { backgroundColor: "red", color: "white" },
    };

    return (
      <div
        style={{
          ...statusStyles[status],
          borderRadius: "50%",
          width: "15px",
          height: "15px",
        }}
      />
    );
  };

  return (
    <div>
      <div className='d-flex justify-content-between'>
        <h1>Le mie segnalazioni</h1>
        <div style={{ textAlign: "right", marginBottom: "10px" }}>
          <Button variant='link'>
            <Link to={`/map`} style={{ textDecoration: "none" }}>
              <i className='fas fa-arrow-left'></i> Go to map
            </Link>
          </Button>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : myPlants.length === 0 ? (
        <p>You have no plants.</p>
      ) : (
        <table className='table'>
          <thead>
            <tr>
              <th>Image</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {myPlants.map((plant) => (
              <tr key={plant.id}>
                <td>
                  <img
                    src={`http://localhost:3001${plant.image_url}`}
                    alt={`Plant ${plant.id}`}
                    style={{ width: "50px" }}
                  />
                </td>
                <td>{plant.lat}</td>
                <td>{plant.lang}</td>
                <td>{renderStatusIndicator(plant.status_piantina)}</td>
                <td>{new Date(plant.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyPlants;
