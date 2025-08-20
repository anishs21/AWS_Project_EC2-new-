// components/Navbar.js
import React from 'react';
import './Navbar.css';
import logo from '../assets/vinsys-logo.png';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="logo" />
        <span className="brand">VINSYS</span>
      </div>
      {/* <ul className="navbar-links">
        <li><a href="/">Enquiry</a></li>
        <li><a href="/admin">Admin Login</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
      </ul> */}
    </nav>
  );
}

export default Navbar;