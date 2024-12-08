import React, { useContext, useEffect } from "react";
import { MdBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { PlantsContext } from "../context/PlantsContext";
import Table from "react-bootstrap/Table";

const OwnedPlants = () => {
  const { getMyPlants, myPlants } = useContext(PlantsContext);
  const { userId, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const backToMap = () => {
    navigate("/map");
  };
  useEffect(() => {
    getMyPlants(userId);
  }, [userId]);
  const goToPlantPage = (prop) => {
    navigate(`/map/${prop}`, { state: { from: "/bookedPlants" } });
  };
  return (
    <section className='section-background section-full-page'>
      <div className='section-center'>
        <div className='back-btn'>
          <MdBackspace
            onClick={() => {
              backToMap();
            }}
          />
        </div>
        <h1 className='section-title'>Le mie piante</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>Data acquisto</th>
              <th>Tipo</th>
              <th>Targa</th>
            </tr>
          </thead>
          <tbody>
            {myPlants &&
              myPlants.map((plant, index) => {
                return (
                  <tr
                    onClick={() => {
                      goToPlantPage(plant.id);
                    }}
                    key={index}
                  >
                    <td>{index + 1}</td>
                    <td className='bg-info'>
                      {plant.purchase_date.substring(0, 10)}
                    </td>
                    <td className='bg-info'>{plant.plant_type}</td>
                    <td className='bg-info'>{plant.user_comment}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </section>
  );
};

export default OwnedPlants;
