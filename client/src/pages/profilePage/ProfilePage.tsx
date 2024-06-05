import React, {useState, useEffect} from "react";
import {getCurrentUser, updateUsername, doPasswordChange, deleteAccount, getMazeCompleted} from '../../firebase/auth';
import { updatePassword } from "firebase/auth";
import './ProfilePage.css';

const ProfilePage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [mazeCompleted, setMazeCompleted] = useState(0);
    const [message, setMessage] = useState('');
    const [showUsernameInput, setShowUsernameInput] = useState(false);
    const [showPasswordInput, setShowPasswordInput] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
          const user = getCurrentUser();
          if (user) {
            setUsername(user.displayName || '');
            const completedMazes = await getMazeCompleted();
            setMazeCompleted(completedMazes);
          }
        };
    
        fetchUserData();
      }, []);


    const handleUsernameChange = async () => {
    try {
        await updateUsername(newUsername);
        setUsername(newUsername);
        setNewUsername('');
        setMessage('Username updated successfully');
    } catch (error) {
        setMessage('Error updating username');
    }
    };

    const handlePasswordChange = async () => {
        try {
            await doPasswordChange(newPassword);
            setNewPassword('');
            setMessage('Password changed successfully');

        } catch (error) {
            setMessage('Error changing password');
        }
    }

    const handleAccountDeletion = async () => {
        try {
          await deleteAccount();
          setMessage('Account deleted successfully');
        } catch (error) {
          setMessage('Error deleting account');
        }
      };

    /*no complete logic */
    const getMazeCompleted = async () => {
        return 0;
    };

    return (
        <div className="profile-page">
          <h1>Profile Page</h1>
          <p>{message}</p>
          <div className="profile-section">
            <h2>Username: {username}</h2>
            {showUsernameInput ? (
              <>
                <input
                  type="text"
                  placeholder="New Username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
                <button onClick={handleUsernameChange}>Save</button>
              </>
            ) : (
              <button onClick={() => setShowUsernameInput(true)}>Change Username</button>
            )}
          </div>
          <div className="profile-section">
            {showPasswordInput ? (
              <>
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button onClick={handlePasswordChange}>Save</button>
              </>
            ) : (
              <button onClick={() => setShowPasswordInput(true)}>Change Password</button>
            )}
          </div>
          <div className="profile-section">
            <h2>Mazes Completed: {mazeCompleted}</h2>
          </div>
          <div className="profile-section">
            <button onClick={handleAccountDeletion} className="delete-button">Delete Account</button>
          </div>
        </div>
      );
    }

export default ProfilePage;