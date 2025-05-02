import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiBell, FiUser, FiSettings, FiLogOut, FiChevronDown } from 'react-icons/fi';
import './Navbar.css';
import logo from '../../logo.png'

const Navbar = ({ onMenuClick, isMobile }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadCount] = useState(3);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        {isMobile && (
          <button className="menu-btn" onClick={onMenuClick}>
            <FiMenu />
          </button>
        )}
        {/* Use your logo and align as in the image */}
        <img src={logo} alt="Company Logo" className="navbar-logo" />
      </div>
      <div className="navbar-center">
        
      </div>
      <div className="navbar-right">
        <div className="nav-icon-container">
          <Link to="/notifications" className="nav-icon" aria-label="Notifications">
            <FiBell style={{ color: '#2196f3' }} />
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </Link>
        </div>
        <div className="user-profile" onClick={toggleDropdown} ref={dropdownRef}>
          <div className="profile-preview">
            <FiUser className="user-icon" />
          </div>
          <div className="nav-profile-info">
            <span className="profile-name">Admin User</span>
            <span className="profile-role">Warehouse Manager</span>
          </div>
          <FiChevronDown className={`dropdown-chevron ${showDropdown ? 'open' : ''}`} />
          {showDropdown && (
            <div className="profile-dropdown">
              <div className="dropdown-header">
                <FiUser className="header-icon" />
                <div className="header-info">
                  <span className="profile-name">Admin User</span>
                  <span className="profile-email">admin@wms.com</span>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <Link to="/profile" className="dropdown-item">
                <FiUser />
                <span>My Profile</span>
              </Link>
              <Link to="/settings" className="dropdown-item">
                <FiSettings />
                <span>Account Settings</span>
              </Link>
              <div className="dropdown-divider"></div>
              <div className="dropdown-item logout" onClick={handleLogout}>
                <FiLogOut />
                <span>Log Out</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;