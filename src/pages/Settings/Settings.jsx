import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    twoFactorAuth: false,
    language: 'en',
    email: 'admin@wms.com',
    phone: '+1 234 567 890',
    darkMode: false,
    smsNotifications: true,
    timezone: 'UTC-05:00',
    dateFormat: 'MM/DD/YYYY'
  });

  const [profileImage, setProfileImage] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Add to existing state
  const [errors, setErrors] = useState({
    email: '',
    phone: ''
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!validateEmail(settings.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!/^\+\d{1,3}\s\d{9,15}$/.test(settings.phone)) {
      newErrors.phone = 'Invalid phone format (e.g. +1 2345678901)';
    }

    if (Object.keys(newErrors).length === 0) {
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 3000);
      console.log('Valid settings saved:', settings);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="settings-container">
      {/* Add profile upload section */}
      <div className="profile-picture-upload">
        <div className="profile-preview">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="profile-preview" />
          ) : (
            <div className="profile-preview placeholder">JD</div>
          )}
        </div>
        <label className="upload-btn">
          Upload Photo
          <input type="file" hidden onChange={handleImageUpload} />
        </label>
      </div>

      {/* Add Account Details */}
      <div className="settings-card">
        <h2>Account Details</h2>
        <div className="form-group">
          <label>Email Address *</label>
          <input
            type="email"
            value={settings.email}
            onChange={(e) => setSettings({...settings, email: e.target.value})}
            className={errors.email && 'error-input'}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Phone Number *</label>
          <input
            type="tel"
            value={settings.phone}
            onChange={(e) => setSettings({...settings, phone: e.target.value})}
            className={errors.phone && 'error-input'}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
      </div>

      {/* Add System Preferences */}
      <div className="settings-card">
        <h2>System Preferences</h2>
        <div className="form-group">
          <label>Timezone</label>
          <select
            value={settings.timezone}
            onChange={(e) => setSettings({...settings, timezone: e.target.value})}
          >
            <option value="UTC-05:00">Eastern Time (UTC-5)</option>
            <option value="UTC-06:00">Central Time (UTC-6)</option>
            <option value="UTC-08:00">Pacific Time (UTC-8)</option>
          </select>
        </div>
        <div className="form-group">
          <label>Date Format</label>
          <select
            value={settings.dateFormat}
            onChange={(e) => setSettings({...settings, dateFormat: e.target.value})}
          >
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
      </div>

      {/* Removed Danger Zone section */}
      {/* Feedback animation remains */}
      {showFeedback && (
        <div className="feedback-message">
          Settings saved successfully!
        </div>
      )}

      <button onClick={handleSubmit} className="save-btn">
        Save Settings
      </button>
    </div>
  );
};

export default Settings;