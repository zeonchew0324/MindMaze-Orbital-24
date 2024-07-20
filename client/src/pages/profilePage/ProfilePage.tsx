import React, { useState, useEffect } from "react";
import {
  getCurrentUser,
  updateUsername,
  doPasswordChange,
  deleteAccount,
  getMazeCompleted,
} from "../../firebase/auth";
import { useAuth } from "../../contexts/AuthProvider";
import { User, Lock, Trash2 } from "lucide-react";

const ProfilePage = () => {
    const [username, setUsername] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [mazeCompleted, setMazeCompleted] = useState(0);
    const [message, setMessage] = useState('');
    const [showUsernameInput, setShowUsernameInput] = useState(false);
    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const { currentUser } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = getCurrentUser();
      if (user) {
        setUsername(user.displayName || "");
      }
    };

    fetchUserData();
  }, []);

    const handleAccountDeletion = async () => {
        try {
          await deleteAccount();
          setMessage('Account deleted successfully');
          setShowDeleteConfirm(false);
        } catch (error) {
          setMessage('Error deleting account');
        }
    };

    return (
        <div className="flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4">Profile Info</h1>
            {message && <p className="mb-4 text-sm text-red-500">{message}</p>}
            
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Username: {username}</h2>
                {showUsernameInput ? (
                  <div className="flex items-center space-x-2 mt-2">
                    <input
                      type="text"
                      placeholder="New Username"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      className="border p-2 rounded"
                    />
                    <button onClick={handleUsernameChange} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                  </div>
                ) : (
                  <button onClick={() => setShowUsernameInput(true)} className="flex items-center mt-2 text-blue-500">
                    <User className="mr-2 h-4 w-4" />
                    Change Username
                  </button>
                )}
              </div>

              <div>
                <h2 className="text-lg font-semibold">Mazes Completed: {mazeCompleted}</h2>
              </div>

              <div>
                {showPasswordInput ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="border p-2 rounded"
                    />
                    <button onClick={handlePasswordChange} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                  </div>
                ) : (
                  <button onClick={() => setShowPasswordInput(true)} className="flex items-center text-blue-500">
                    <Lock className="mr-2 h-4 w-4" />
                    Change Password
                  </button>
                )}
              </div>

              <div>
                <button onClick={() => setShowDeleteConfirm(true)} className="flex items-center text-red-500">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </button>
              </div>

              {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-6 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Are you sure you want to delete your account?</h2>
                    <p className="mb-4">This action cannot be undone. All your data will be permanently deleted.</p>
                    <div className="flex justify-end space-x-2">
                      <button onClick={() => setShowDeleteConfirm(false)} className="px-4 py-2 border rounded">Cancel</button>
                      <button onClick={handleAccountDeletion} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
    );
}


export default ProfilePage;