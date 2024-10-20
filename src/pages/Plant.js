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
        const response = await axios.get("http://localhost:3001/api/plants");
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
        `http://localhost:3001/api/plants/${plantId}/status`,
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
    <section className='section-background plant-section'>
      <div className='section-center'>
        <h2 className='section-title'>Informazioni piantina</h2>

        <ul>
          <li>
            <div className='d-flex align-items-center'>
              {/* <span>image:</span>
              <div
                className='plant-picture'
                style={{
                  // backgroundColor: "red",
                  backgroundImage: `url("http://localhost:3001${image_url}")`,
                  backgroundColor: "red",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
              </div> */}
            </div>
          </li>
          <li>
            <span>image:</span>{" "}
            <span>
              {" "}
              <a href={`http://localhost:3001${image_url}`}>piantina</a>{" "}
            </span>
          </li>
          <li>
            <span>Lat:</span> <span>{lat}</span>
          </li>
          <li>
            <span>Lang:</span> <span>{lang}</span>
          </li>
          <li>
            <span>Stato:</span> <span>{status_piantina}</span>
          </li>
        </ul>
        <div className='admin-controls mt-5'>
          <button onClick={() => handleStatusChange("approved")}>
            Approve
          </button>
          <button onClick={() => handleStatusChange("rejected")}>Reject</button>
        </div>
        <Link className='d-block' to={"/map"}>
          Go back
        </Link>
      </div>
    </section>
  );
};

export default Plant;
