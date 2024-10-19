import React from "react";
import { MdLegendToggle } from "react-icons/md";
import { BsInfo } from "react-icons/bs";
import { FaMap } from "react-icons/fa";

import { PiPlantFill } from "react-icons/pi";
import { NavLink } from "react-router-dom";

{
  /* <MdOutlineInfo />; */
}
{
  /* <MdLegendToggle />; */
}
{
  /* <PiPlantFill />; */
}

const BottomBar = () => {
  return (
    <article className='bottom-bar'>
      <div className='h-100'>
        <ul className='d-flex justify-content-around h-100 p-0 m-0 list-unstyled align-items-center'>
          <li className='fs-5'>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-primary" : "text-dark"
              }
              to='/map'
            >
              <FaMap />
            </NavLink>
          </li>
          <li className='fs-5'>
            <NavLink
              to='/legend'
              className={({ isActive }) =>
                isActive ? "text-primary" : "text-dark"
              }
            >
              <MdLegendToggle />
            </NavLink>
          </li>
          <li className='fs-5'>
            <NavLink
              to='/myPlants'
              className={({ isActive }) =>
                isActive ? "text-primary" : "text-dark"
              }
            >
              <PiPlantFill />
            </NavLink>
          </li>
          <li className='fs-5'>
            <NavLink
              to='/info'
              className={({ isActive }) =>
                isActive ? "text-primary" : "text-dark"
              }
            >
              <BsInfo />
            </NavLink>
          </li>
        </ul>
      </div>
    </article>
  );
};

export default BottomBar;
