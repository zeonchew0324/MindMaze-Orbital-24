import React from 'react';
import Navbar from '../../components/navBar/NavBar';
import ProfilePage from '../profilePage/ProfilePage';

const ProfileLayout: React.FC = () => {
  return (
    <div className="container">
      <Navbar />
      <div className="content">
        <ProfilePage />
      </div>
    </div>
  );
};

export default ProfileLayout;
