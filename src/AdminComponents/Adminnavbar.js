import { Dropdown } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";

const Adminnavbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-0">
        <div className="container">
          <Link to="/index" className="navbar-brand">
            AdminPanel
          </Link>
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav">
              
              <li className="nav-item px-2">
                <Link to="/productdata" className="nav-link">
                  Products
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link to="/categoriesdata" className="nav-link">
                  Categories
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link to="/users" className="nav-link">
                  Users
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Admin Settings
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <li className="nav-item">
                <Link to="/Adminlogin" className="nav-link">
                  <i className="fas fa-user-times" /> Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Adminnavbar;
