import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { doCreateUser } from '../../firebase/auth'

function SignupForm() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSigningUp) {
      setIsSigningUp(true);
      setError(undefined); // Reset previous error
      try {
        await doCreateUser(email, password, username)
        navigate('/home')
      } catch (error) {
        if (error instanceof Error) {
          setError('Error signing up, please enter valid email and password')
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
          type="username"
          name="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-2 mb-4 text-black rounded-md"
        />
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
        <div className='text-red-600'>
          {error}
        </div>
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
