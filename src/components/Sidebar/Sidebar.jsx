import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiBox, FiPlusSquare, FiList, FiSettings, FiUser, FiX, FiPackage, FiShoppingBag, FiChevronDown } from 'react-icons/fi';
import './Sidebar.css';
import { useLocation } from 'react-router-dom';
import { FaToriiGate } from 'react-icons/fa';
import SearchInput from '../SearchInput/SearchInput';
import logo from '../../logo.png'

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [searchQuery, setSearchQuery] = useState('');
  const [openSubmenus, setOpenSubmenus] = useState({});

  const menuItems = [
    { text: 'Dashboard', icon: <FiHome />, path: '/dashboard' },
    { text: 'Gatepass', icon: <FaToriiGate />, path: '/gatepass' },
    {
      text: 'Inventory',
      icon: <FiBox />,
      submenu: [
        { text: 'Overview', path: '/inventory' },
        { text: 'SKU Management', icon: <FiPackage />, path: '/skus' },
        { text: 'GRN', icon: <FiList />, path: '/grn' }
      ]
    },
    {
      text: 'Orders',
      icon: <FiShoppingBag />,
      submenu: [
        { text: 'Order List', path: '/orders' },
        { text: 'Create Order', path: '/create-order' }
      ]
    },
    { text: 'Settings', icon: <FiSettings />, path: '/settings' },
    { text: 'Profile', icon: <FiUser />, path: '/profile' },

  ];

  const toggleSubmenu = (index) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const filteredMenuItems = menuItems.filter(item =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.path && item.path.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.submenu && item.submenu.some(subItem =>
      subItem.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subItem.path.toLowerCase().includes(searchQuery.toLowerCase())
    ))
  );

  useEffect(() => {
    if (isOpen && window.innerWidth <= 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <div className={`sidebar${isOpen ? ' open' : ''}`}>
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="logo" width={"400px"} height={"400px"} />
          {isOpen && (
            <button className="close-btn" onClick={onClose}>
              <FiX />
            </button>
          )}
        </div>
        <nav className="sidebar-nav">
          <SearchInput
            placeholder="Search modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="sidebar-search"
          />
          <div className="nav-items-container">
            {filteredMenuItems.map((item, index) => (
              <div key={item.path || index}>
                {item.submenu ? (
                  <div className="nav-item-wrapper">
                    <div
                      className={`nav-item${openSubmenus[index] ? ' active' : ''}`}
                      onClick={() => toggleSubmenu(index)}
                    >
                      <div className="nav-item-content">
                        {item.icon}
                        <span>{item.text}</span>
                      </div>
                      <FiChevronDown className={`submenu-icon${openSubmenus[index] ? ' open' : ''}`} />
                    </div>
                    <div className={`submenu${openSubmenus[index] ? ' open' : ''}`}>
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={`submenu-item${currentPath === subItem.path ? ' active' : ''}`}
                          onClick={onClose}
                        >
                          {subItem.icon}
                          <span>{subItem.text}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`nav-item${currentPath === item.path ? ' active' : ''}`}
                    onClick={onClose}
                  >
                    <div className="nav-item-content">
                      {item.icon}
                      <span>{item.text}</span>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;