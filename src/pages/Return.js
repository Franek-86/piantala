import React, { useCallback, useState, useEffect, useContext } from "react";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { PlantsContext } from "../context/PlantsContext";
import { AuthContext } from "../context/AuthContext";
const serverDomain = process.env.REACT_APP_DOMAIN_NAME_SERVER;
export const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const [timer, setTimer] = useState(20);
  const { handleBookedPlant, clearBookedStorage } = useContext(PlantsContext);
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const test = () => {
    return setTimeout(() => {
      console.log("timeout");
      clearBookedStorage();
      navigate("/map");
    }, 20000);
  };
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");
    fetch(`${serverDomain}/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
        test();
      });
  }, []);

  if (status === "open") {
    return <Navigate to='/checkout' />;
  }

  if (status === "complete") {
    handleBookedPlant();
    setIsAuthenticated(true);

    return (
      <section id='success'>
        <div class='card text-center'>
          <div class='card-header'>Piantami per amore</div>
          <div class='card-body'>
            <h5 class='card-title'>Grazie per l'acquisto</h5>
            <p class='card-text'>
              Ci fa molto piacere che tu abbia voluto dare il tuo contributo!
              Una email di conferma sarà inviata al {customerEmail}. In caso di
              domande contattaci all'indirizzo
              <a href='mailto:amicidiernestverner@gmail.com'>
                amicidiernestverner@gmail.com
              </a>
              .
            </p>
            <Link
              to='/map'
              class='btn btn-primary'
              onClick={() => clearBookedStorage()}
            >
              Torna alla mappa
            </Link>
          </div>
          <div class='card-footer text-body-secondary'>
            tornerai automaticamente alla mappa tra {timer}
          </div>
        </div>
      </section>
    );
  }

  return null;
};
