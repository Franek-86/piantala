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
                let dateObj = new Date(plant.purchase_date);
                let myDate = dateObj.toLocaleDateString("it-IT");
                let date = myDate.split("T")[0];

                let [year, month, day] = date.split("-");
                day = day < 10 ? "0" + day : day;
                month = month < 10 ? "0" + month : month;
                let formattedDate = `${day}/${month}/${year}`;

                return (
                  <tr
                    onClick={() => {
                      goToPlantPage(plant.id);
                    }}
                    key={index}
                  >
                    <td>{index + 1}</td>
                    <td className='bg-info'>{date}</td>
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
