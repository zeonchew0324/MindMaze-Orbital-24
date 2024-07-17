import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doSignOut } from '../../firebase/auth';
import DashboardHabits from '../../components/dashboard/dashboardhabits';
import DashboardTodos from '../../components/dashboard/DashboardTodos';
import DashboardReminder from '../../components/dashboard/DashboardReminder';
import Maze from '../../components/maze/Maze';

const HomePage: React.FC = () => {
  const [errMessage, setErrMessage] = useState('');
  const [isSigningOut, setIsSigningOut] = useState(false);
  const navigate = useNavigate();

  const onSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isSigningOut) {
      setIsSigningOut(true);
      try {
        await doSignOut();
        navigate('/login');
      } catch (error) {
        if (error instanceof Error) {
          setErrMessage(error.message);
        }
        setIsSigningOut(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-orange-500">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Welcome to MindMaze</h1>
            <button
              onClick={onSignOut}
              className={`bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300 ${
                isSigningOut ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSigningOut}
            >
              {isSigningOut ? "Signing out..." : "Sign out"}
            </button>
          </div>
          {errMessage && <p className="text-red-500 mb-4">{errMessage}</p>}
          <div className="mb-8">
            <Maze />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-100 rounded-lg shadow-md">
              <DashboardHabits />
            </div>
            <div className="bg-gray-100 rounded-lg shadow-md">
              <DashboardTodos />
            </div>
          </div>
          <div className="mt-8 shadow-md">
            <DashboardReminder />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;