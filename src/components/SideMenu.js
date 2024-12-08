import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";
import { TbReportMedical } from "react-icons/tb";
import { RiContactsLine } from "react-icons/ri";
import sidebarLogo from "../assets/images/logo_albero_dritto_sidebar.png";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
const SideMenu = ({ onLogout, ...props }) => {
  const { handleLogout } = useContext(AuthContext);
  return (
    <Offcanvas show={props.show} onHide={props.handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <img class='sidebar-logo' src={sidebarLogo} alt='' srcset='' />
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <Link to='/bookedPlants' class='nav-link text-truncate'>
              <TbReportMedical />
              <span class='ms-2 d-sm-inline'>Le mie piante</span>
            </Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Link to='/contacts' class='nav-link text-truncate'>
              <RiContactsLine />
              <span class='ms-2 d-sm-inline'>Contattaci</span>
            </Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Link to='/' onClick={handleLogout} class='nav-link text-truncate'>
              <RiLogoutBoxLine />
              <span class='ms-2 d-sm-inline'>Log out</span>
            </Link>
          </ListGroup.Item>
        </ListGroup>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SideMenu;
