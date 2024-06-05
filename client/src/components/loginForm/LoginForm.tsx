import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { doSignInWithEmailAndPassword } from '../../firebase/auth';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
        navigate('/home');
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
        setIsSigningIn(false); // Reset signing-in state
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-r from-[#aa581d] to-[#d49144] text-white m-0">
      <div className="container bg-black bg-opacity-40 p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl mb-5">Welcome Back</h1>
        <form onSubmit={onSubmit} className="flex flex-col">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full text-black p-2 mb-4 border-none rounded-lg"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full text-black p-2 mb-4 border-none rounded-lg"
          />
          <button
            type="submit"
            disabled={isSigningIn}
            className={`bg-blue-500 text-white p-2 rounded-lg ${isSigningIn ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 transition duration-300'}`}
          >
            {isSigningIn ? 'Signing In...' : 'Login'}
          </button>
        </form>
        <p className="mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
        </p>
        <p className="mt-2">
          Forgot your password?{' '}
          <Link to="/reset-password" className="text-blue-500 hover:underline">Reset password</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
