import React, { useState } from 'react';
import { FiCheckCircle, FiAlertTriangle, FiInfo, FiBell } from 'react-icons/fi';
import './Notifications.css';
import { useTheme } from '../../contexts/ThemeContext';

const Notifications = () => {
  const { theme } = useTheme();
  const [notifications] = useState([
    {
      id: 1,
      type: 'success',
      message: 'New inventory items received',
      timestamp: '2 mins ago',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      message: 'Low stock alert: Safety Gloves',
      timestamp: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      message: 'System maintenance scheduled',
      timestamp: '5 hours ago',
      read: true
    }
  ]);

  return (
    <div className={`notifications-container ${theme === 'dark' ? 'dark-theme' : ''}`}>
      <div className="notifications-header">
        <FiBell className="header-icon" />
        <h1>Notifications</h1>
        <span className="unread-count">{notifications.filter(n => !n.read).length}</span>
      </div>
      
      <div className="notifications-list">
        {notifications.map(notification => (
          <div 
            key={notification.id} 
            className={`notification-item ${!notification.read ? 'unread' : ''} ${theme === 'dark' ? 'dark-theme' : ''}`}
          >
            <div className="notification-icon">
              {notification.type === 'success' && <FiCheckCircle />}
              {notification.type === 'warning' && <FiAlertTriangle />}
              {notification.type === 'info' && <FiInfo />}
            </div>
            <div className="notification-content">
              <p className="message">{notification.message}</p>
              <p className="timestamp">{notification.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;