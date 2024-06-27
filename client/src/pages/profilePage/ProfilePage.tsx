import React, { useState, useEffect } from "react";
import { getCurrentUser, updateUsername, doPasswordChange, deleteAccount, getMazeCompleted } from '../../firebase/auth';

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
            setShowUsernameInput(false);
            setMessage('Username updated successfully');
        } catch (error) {
            setMessage('Error updating username');
        }
    };

    const handlePasswordChange = async () => {
        try {
            await doPasswordChange(newPassword);
            setNewPassword('');
            setShowPasswordInput(false);
            setMessage('Password changed successfully');
        } catch (error) {
            console.error(error);
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
        <div className="flex justify-center items-center bg-black bg-opacity-60 border-stone-800 border-4 rounded-xl top-[100px]">
          <div className="py-16 px-20 rounded-lg shadow-lg w-full max-w-lg">
            <h1 className="text-4xl font-bold mb-4 leading-relaxed">Profile Info</h1>
            <p className="mb-4 text-xl text-red-500">{message}</p>
            <div className="border-t border-white my-4"></div>
            <div className="mb-4">
              <h2 className="text-2xl mb-2 leading-relaxed">Username: {username}</h2>
              <div className="mb-4">
              <div className="border-t border-white my-4"></div>
              <h2 className="text-2xl leading-relaxed">Mazes Completed: {mazeCompleted}</h2>
            </div>
              <div className="border-t border-white my-4"></div>
              {showUsernameInput ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="New Username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="p-2 m-2 rounded-lg border w-full text-black"
                  />
                  <button onClick={handleUsernameChange} className="bg-blue-500 text-white p-2 my-1.5 leading-relaxed rounded-lg">Save</button>
                </div>
              ) : (
                <button onClick={() => setShowUsernameInput(true)} className="bg-blue-500 text-white p-2 my-1.5 leading-relaxed rounded-lg">Change Username</button>
              )}
            </div>
            <div className="border-t border-white my-4"></div>
            <div className="mb-4">
              {showPasswordInput ? (
                <div className="flex items-center text-black space-x-2">
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="p-2 m-2 rounded-lg border w-full"
                  />
                  <button onClick={handlePasswordChange} className="bg-blue-500 text-white my-1.5 leading-relaxed p-2 rounded-lg">Save</button>
                </div>
              ) : (
                <button onClick={() => setShowPasswordInput(true)} className="bg-blue-500 text-white my-1.5 leading-relaxed p-2 rounded-lg">Change Password</button>
              )}
            </div>
            
            <div className="mb-4">
              <div className="border-t border-white my-4"></div>
              <button onClick={handleAccountDeletion} className="bg-red-500 mt-2 text-xl leading-relaxed text-white p-2 rounded-lg">Delete Account</button>
            </div>
          </div>
        </div>
      );
}

export default ProfilePage;
