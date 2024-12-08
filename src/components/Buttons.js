import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import { MdCenterFocusStrong } from "react-icons/md";
import { BiMenu } from "react-icons/bi";
import logo from "../assets/images/logo_albero_green.png";
import SideMenu from "./SideMenu";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useMap } from "react-leaflet";
import { MdAddLocation } from "react-icons/md";
import L from "leaflet";
const Buttons = ({ setPosition, langMatch, latMatch, markerRef }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate(); // Initialize the navigate function
  const map = useMap();

  console.log("setPosition", setPosition);
  return (
    <div className='section buttons-section'>
      <div className='leftButton'>
        <div className='test1'>
          <img src={logo} alt='' className='map-logo' />
        </div>
        <Button
          variant='primary'
          onClick={handleShow}
          className='circle-button menu-button p-0'
        >
          <BiMenu />
        </Button>
      </div>

      <div className='rightButtons'>
        <Link className='circle-button' to='addPlant'>
          <MdAdd />
        </Link>
        <Link className='circle-button' href='tel:00393485384563'>
          <MdLocalPhone />
        </Link>
        <Button
          onClick={() =>
            map.locate().on("locationfound", function (e) {
              // setPosition(e.latlng);
              map.flyTo(e.latlng, 17);
              setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
              // const marker = markerRef.current;
              // console.log("aooo", marker);
              // if (marker) {
              //   console.log("aoooa", marker);
              //   marker.openPopup();
              // }
              // console.log(markerRef);
            })
          }
          className='circle-button p-0'
        >
          <MdAddLocation />
        </Button>
        <Button
          onClick={() => {
            console.log("ciao");
            map.flyTo([41.118778112249046, 16.871917818963464], 13);
          }}
          className='circle-button p-0 '
        >
          <MdCenterFocusStrong />
        </Button>
      </div>
      {/* Include the SideMenu component */}
      <SideMenu
        data-bs-target='#staticBackdrop'
        // onLogout={handleLogout}
        handleClose={handleClose}
        show={show}
      />
    </div>
  );
};

export default Buttons;
