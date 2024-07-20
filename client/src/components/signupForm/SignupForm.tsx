import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { doCreateUser } from '../../firebase/auth';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSigningUp) {
      setIsSigningUp(true);
      setError(undefined);
      try {
        await doCreateUser(email, password, username);
        navigate('/home');
      } catch (error) {
        if (error instanceof Error) {
          setError('Error signing up, please enter valid email and password');
        }
        setIsSigningUp(false);
      }
    }
  };

  return (
    <div className="flex w-svw h-screen bg-gradient-to-r from-blue-200 to-orange-500">
      <div className="m-auto bg-white rounded-xl shadow-lg flex max-w-4xl">
        <div className="min-w-[30vw] p-8">
          <h2 className="text-2xl font-bold mb-2">MindMaze</h2>
          <h3 className="text-gray-400 mb-6">Join our community!</h3>
          <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
              <input
                type="text"
                id="username"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className={`w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-300 ${
                isSigningUp ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSigningUp}
            >
              {isSigningUp ? "Signing up..." : "Sign Up"}
            </button>
          </form>
          <p className="mt-4 text-sm text-center">
            Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;