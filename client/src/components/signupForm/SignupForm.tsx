import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth';

function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSigningUp) {
      setIsSigningUp(true);
      try {
        await doCreateUserWithEmailAndPassword(email, password);
        navigate('/home');
      } catch (error) {
        console.log('hello fail');
        if (error instanceof Error) {
          alert(error.message);
        }
        setIsSigningUp(false); // Reset signing-in state
      }
    }
  };

  return (
    <div className="bg-black/40 p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl mb-6">Create an account</h2>
      <form onSubmit={onSubmit} method="POST">
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 mb-4 text-black rounded-md"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 mb-4 text-black rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 mt-4 rounded-md hover:bg-blue-700 transition-colors duration-300 ease-in-out"
        >
          Continue
        </button>
      </form>
      <p className="mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login Here
        </Link>
      </p>
    </div>
  );
}

export default SignupForm;
