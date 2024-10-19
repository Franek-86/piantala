import React from "react";
import { Link } from "react-router-dom";

const SideMenu = ({ showMenu, toggleMenu, onLogout }) => {
  return (
    <div
      className={`offcanvas offcanvas-start ${showMenu ? "show" : ""}`}
      tabindex='-1'
      id='offcanvasMenu'
      aria-labelledby='offcanvasMenuLabel'
    >
      <div className='offcanvas-header'>
        <h5 className='offcanvas-title' id='offcanvasMenuLabel'>
          Menu
        </h5>
        <button
          type='button'
          className='btn-close'
          onClick={toggleMenu}
          aria-label='Close'
        ></button>
      </div>
      <div className='offcanvas-body'>
        <ul className='list-unstyled'>
          <li>
            <button className='btn btn-danger' onClick={onLogout}>
              Logout
            </button>
          </li>
          <li>
            <Link to='/myPlants' onClick={toggleMenu}>
              Link 2
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
