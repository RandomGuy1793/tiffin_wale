import React from "react";

import "../styles/navBar.css";

function NavBar(props) {
  const { isLoggedIn, isCustomer } = props;
  return (
    <nav className="navbar navbar-expand-md navbar-dark">
      <div className="container-fluid ">
        <a className="navbar-brand mx-4 fw-bold">Tiffin Wale</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {isLoggedIn && isCustomer ? (
            <ul className="navbar-nav ml-auto justify-content">
              <li className="nav-item pointer mx-1">
                <a className="nav-link">Subscriptions</a>
              </li>
              <li className="nav-item pointer mx-1">
                <a className="nav-link">Edit Details</a>
              </li>
              <li className="nav-item pointer mx-1">
                <a className="nav-link">Logout</a>
              </li>
            </ul>
          ) : (
            <div></div>
          )}
          {isLoggedIn && !isCustomer ? (
            <ul className="navbar-nav ml-auto justify-content">
              <li className="nav-item pointer mx-1">
                <a className="nav-link">Customer Subscriptions</a>
              </li>
              <li className="nav-item pointer mx-1">
                <a className="nav-link">Edit Details</a>
              </li>
              <li className="nav-item pointer mx-1">
                <a className="nav-link">Logout</a>
              </li>
            </ul>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
