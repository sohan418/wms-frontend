import React, { useState, useRef } from 'react';
import Button from '../../components/Button/Button';
import { Input } from '../../components/Form/Input';
import { FiUser, FiMail, FiPhone, FiBriefcase, FiCalendar, FiLock } from 'react-icons/fi';
import './Profile.css';
import { FiCamera } from 'react-icons/fi';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [profileData, setProfileData] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@warehouse.com',
    role: 'Warehouse Manager',
    phone: '+1 234 567 8900',
    department: 'Operations',
    joinDate: '2024-01-01'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Handle profile update logic here
    setIsEditing(false);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Handle password change logic here
    console.log('Password data:', passwordData);
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-cover">
            <div className="profile-avatar-wrapper">
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Profile" 
                  className="profile-avatar"
                />
              ) : (
                <div className="profile-avatar">
                  {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
                </div>
              )}
              {isEditing && (
                <>
                <button 
                  className="change-photo-btn"
                  onClick={() => fileInputRef.current.click()}
                >
                  <FiCamera />
                </button>
                <FiUser />
                  <span>Change</span>
                </>
             
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                ref={fileInputRef}
              />
            </div>
          </div>
          
          <div className="profile-info">
            <div className="profile-title">
              <h1>{profileData.firstName} {profileData.lastName}</h1>
              <span className="role-badge">{profileData.role}</span>
            </div>
            <div className="profile-meta">
              <span><FiMail /> {profileData.email}</span>
              <span><FiPhone /> {profileData.phone}</span>
              <span><FiBriefcase /> {profileData.department}</span>
              <span><FiCalendar /> Joined {new Date(profileData.joinDate).toLocaleDateString()}</span>
            </div>
          </div>
          
          <Button 
            variant={isEditing ? "secondary" : "primary"}
            onClick={() => setIsEditing(!isEditing)}
            className="edit-profile-btn"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>

        <div className="profile-content">
          <div className="profile-main">
            <div className="profile-section">
              <h2><FiUser /> Personal Information</h2>
              <form onSubmit={handleProfileUpdate}>
                <div className="form-grid">
                  <Input
                    label="First Name"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Last Name"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    disabled={!isEditing}
                    icon={<FiMail />}
                  />
                  <Input
                    label="Phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    disabled={!isEditing}
                    icon={<FiPhone />}
                  />
                  <Input
                    label="Department"
                    value={profileData.department}
                    onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                    disabled={!isEditing}
                    icon={<FiBriefcase />}
                  />
                  <Input
                    label="Join Date"
                    type="date"
                    value={profileData.joinDate}
                    disabled={true}
                    icon={<FiCalendar />}
                  />
                </div>
                {isEditing && (
                  <div className="form-actions">
                    <Button 
                      variant="primary"
                      type="submit"
                    >
                      Save Changes
                    </Button>
                  </div>
                )}
              </form>
            </div>

            {isEditing && (
              <div className="profile-section">
                <h2><FiLock /> Security</h2>
                <form onSubmit={handlePasswordChange}>
                  <div className="form-grid">
                    <Input
                      label="Current Password"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      icon={<FiLock />}
                    />
                    <Input
                      label="New Password"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      icon={<FiLock />}
                    />
                    <Input
                      label="Confirm New Password"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      icon={<FiLock />}
                    />
                  </div>
                  <div className="form-actions">
                    <Button 
                      variant="primary"
                      type="submit"
                    >
                      Update Password
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;