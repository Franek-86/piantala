import React from "react";
import { Link } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import { BiMenu } from "react-icons/bi";
import logo from "../assets/images/logo_albero_green.png";
const Buttons = () => {
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
        <Link className='circle-button' to='/map/addPlant'>
          <BiMenu />
        </Link>
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
        <Link className='circle-button' to='/map/addPlant'>
          <MdLocalPhone />
        </Link>
      </div>
    </div>
  );
};

export default Buttons;
