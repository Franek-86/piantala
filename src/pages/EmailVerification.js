import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const [timer, setTimer] = useState(5);
  useEffect(() => {
    test();
    const interval = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);
  const navigate = useNavigate();
  const test = () => {
    return setTimeout(() => {
      navigate("/");
    }, 5000);
  };

  return (
    <section className='section section-center'>
      <p>
        Verifica del'indirizzo mail avvenuta con successo e registrazione
        completata
      </p>
      <p>
        Clicca in basso per andare alla pagina di login o attendi {timer}{" "}
        secondi per essere reinderizzato automaticamente.
      </p>
      <a href='/'>pagina login</a>
    </section>
  );
};

export default EmailVerification;
