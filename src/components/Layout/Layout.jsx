import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import './Layout.css';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '../../contexts/ThemeContext';  // Fixed path

export const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <ThemeProvider>
      <div className="app-container">
        <Navbar onMenuClick={handleToggle} isMobile={isMobile} />
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        {/* Overlay for mobile */}
        {isMobile && sidebarOpen && (
          <div  onClick={() => setSidebarOpen(false)} />
        )}
        <div className={`main-content${sidebarOpen && isMobile ? ' sidebar-open' : ''}`}>
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
