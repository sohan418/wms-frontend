import React from 'react';
import { FiMenu, FiBell, FiUser } from 'react-icons/fi';
import './Navbar.css';

const Navbar = ({ onMenuClick, isMobile }) => {
  return (
    <header className="navbar">
      <div className="navbar-left">
        {/* Conditional rendering for mobile only */}
        {isMobile && (
          <button className="menu-btn" onClick={onMenuClick}>
            <FiMenu />
          </button>
        )}
        <h1 className="navbar-title">Warehouse Management System</h1>
      </div>
      <div className="navbar-right">
        <button className="nav-icon-btn">
          <FiBell />
        </button>
        <div className="user-profile">
          <FiUser className="user-icon" />
          <span>Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;