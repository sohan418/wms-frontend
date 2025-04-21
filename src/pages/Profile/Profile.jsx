import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@warehouse.com',
    role: 'Manager',
    phone: '+1 234 567 890'
  });

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>User Profile</h1>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="avatar">JD</div>
          
          <div className="profile-details">
            <div className="detail-item">
              <label>Name:</label>
              <span>{profile.name}</span>
            </div>
            <div className="detail-item">
              <label>Email:</label>
              <span>{profile.email}</span>
            </div>
            <div className="detail-item">
              <label>Role:</label>
              <span>{profile.role}</span>
            </div>
            <div className="detail-item">
              <label>Phone:</label>
              <span>{profile.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;