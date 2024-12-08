import React from "react";
import BottomBar from "../components/BottomBar";
import greenPlant from "../assets/images/ti pianto per amore-APP-verde.png";
import yellowPlant from "../assets/images/ti pianto per amore-APP-giallo.png";
import redPlant from "../assets/images/ti pianto per amore-APP-rosso.png";
import bluePlant from "../assets/images/ti pianto per amore-APP-azzurro.png";
const Legend = () => {
  return (
    <>
      <section className='section-page section-background'>
        <div className='section-center'>
          <h2 className='section-title'>legenda</h2>
          <ul>
            <li className='plants-list'>
              <div className='legend-box-container'>
                <div className='legend-image approved'>
                  <img src={greenPlant} alt='' />
                </div>
                <span className='legend-description'>piante approvate</span>
              </div>
            </li>
            <li className='plants-list'>
              <div className='legend-box-container'>
                <div className='legend-image pending'>
                  <img src={yellowPlant} alt='' />
                </div>
                <span className='legend-description'>
                  piante in attesa di approvazione
                </span>
              </div>
            </li>
            <li className='plants-list'>
              <div className='legend-box-container'>
                <div className='legend-image rejected'>
                  <img src={redPlant} alt='' />
                </div>
                <span className='legend-description'>piante non approvate</span>
              </div>
            </li>
            <li className='plants-list'>
              <div className='legend-box-container'>
                <div className='legend-image booked'>
                  <img src={bluePlant} alt='' />
                </div>
                <span className='legend-description'>piante acquistate</span>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <BottomBar />
    </>
  );
};

export default Legend;
