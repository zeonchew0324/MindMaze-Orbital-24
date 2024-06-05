import React, { useState, useEffect } from "react";
import { getCurrentUser, updateUsername, doPasswordChange, deleteAccount, getMazeCompleted } from '../../firebase/auth';
import { updatePassword } from "firebase/auth";

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
    };

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
        <div className="p-6 text-left">
          <h1 className="text-7xl">Profile Page</h1>
          <p>{message}</p>
          <div>
            <h2>Username: {username}</h2>
            {showUsernameInput ? (
              <>
                <input
                  type="text"
                  placeholder="New Username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="p-2 m-2 rounded-lg border"
                />
                <button onClick={handleUsernameChange} className="bg-blue-500 text-white p-2 rounded-lg">Save</button>
              </>
            ) : (
              <button onClick={() => setShowUsernameInput(true)} className="bg-blue-500 text-white p-2 rounded-lg">Change Username</button>
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
                  className="p-2 m-2 rounded-lg border"
                />
                <button onClick={handlePasswordChange} className="bg-blue-500 text-white p-2 rounded-lg">Save</button>
              </>
            ) : (
              <button onClick={() => setShowPasswordInput(true)} className="bg-blue-500 text-white p-2 rounded-lg">Change Password</button>
            )}
          </div>
          <div className="profile-section">
            <h2>Mazes Completed: {mazeCompleted}</h2>
          </div>
          <div className="profile-section">
            <button onClick={handleAccountDeletion} className="bg-red-500 text-white p-2 rounded-lg">Delete Account</button>
          </div>
        </div>
      );
}

export default ProfilePage;
