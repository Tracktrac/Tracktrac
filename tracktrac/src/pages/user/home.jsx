import React from 'react';
import Avatar from '@mui/material/Avatar';
import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../hooks/useProfile';
import '../../styles/account.css';

const Account = () => {
  const { logout } = useAuth();
  const { profileData, loading, error } = useProfile();

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="profile-container">
      <div className="avatar-section">
        <h1>Your Account</h1>
        <Avatar
          alt={profileData.display_name}
          src={profileData.images && profileData.images[0]?.url}
          sx={{ width: 192, height: 192 }}
        />
        <h2>{profileData.display_name}</h2>
      </div>
      <div className="info-section">
        <ul>
          <li>Email: {profileData.email}</li>
          <li>Country: {profileData.country}</li>
          <li>Followers: {profileData.followers?.total}</li>
          <li>Product: {profileData.product}</li>
          <li>
            Spotify URL:{' '}
            <a
              href={profileData.external_urls?.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              {profileData.external_urls?.spotify}
            </a>
          </li>
        </ul>
      </div>
      <button onClick={logout} className="logout-button">
        Log Out
      </button>
    </div>
  );
};

export default Account;
