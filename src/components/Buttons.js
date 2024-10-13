import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import { BiMenu } from "react-icons/bi";
import logo from "../assets/images/logo_albero_green.png";
import SideMenu from "./SideMenu";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Buttons = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3001/api/auth/logout"); // Your logout endpoint
      // Clear any user-related data from localStorage or context
      localStorage.removeItem("userToken"); // Adjust based on how you store the token
      navigate("/"); // Redirect to the login page
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  // const addPlant = () => {
  //   console.log("add plant");
  //   return;
  // };
  return (
    <div className='section buttons-section'>
      <div className='leftButton'>
        <div className='test1'>
          <img src={logo} alt='' className='map-logo' />
        </div>
        <button className='circle-button menu-button' onClick={toggleMenu}>
          <BiMenu />
        </button>
      </div>

      <div className='rightButtons'>
        {/* <CgMenuRound />
      <CiCirclePlus />
      <IoAdd />
      <MdAdd /> */}
        {/* <button onClick={() => addPlant()}>add</button> */}
        <Link className='circle-button' to='/map/addPlant'>
          <MdAdd />
        </Link>
        <Link className='circle-button' href='tel:00393485384563'>
          <MdLocalPhone />
        </Link>
      </div>
      {/* Include the SideMenu component */}
      <SideMenu
        showMenu={showMenu}
        toggleMenu={toggleMenu}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default Buttons;
