import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiBox, FiPlusSquare, FiList, FiSettings, FiSearch } from 'react-icons/fi';
import './Sidebar.css';
import { FiX } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import { FaToriiGate } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [searchQuery, setSearchQuery] = useState('');
  
  const menuItems = [
    { text: 'Dashboard', icon: <FiHome />, path: '/dashboard' },
    { text: 'Gatepass', icon: <FaToriiGate />, path: '/gatepass' },

    { text: 'Inventory', icon: <FiBox />, path: '/inventory' },
    { text: 'SKU', icon: <FiPlusSquare />, path: '/skus' },
    { text: 'GRN', icon: <FiList />, path: '/grn' },
    { text: 'Settings', icon: <FiSettings />, path: '/settings' },
    { text: 'Profile', icon: <FiUser />, path: '/profile' },
    
  ];

  // Add SKU search functionality
  const filteredMenuItems = menuItems.filter(item =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.path.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <img src="/logo.png" alt="Logo" className="logo" />
        {isOpen && (
          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        )}
      </div>
      <nav className="sidebar-nav">
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="nav-items-container">
          {filteredMenuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${currentPath === item.path ? 'active' : ''}`}
              onClick={onClose}
            >
              {item.icon}
              <span>{item.text}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;