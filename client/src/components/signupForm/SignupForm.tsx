import React, { useState } from 'react';
import './SignupForm.css';
import { Link, useNavigate } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth';

function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSigningUp) {
      setIsSigningUp(true);
      setError(null); // Reset previous error
      try {
        await doCreateUserWithEmailAndPassword(email, password);
        navigate('/home');
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message); // Set error message to state
        }
        setIsSigningUp(false); // Reset signing-in state
      }
    }
  };

  return (
    <div className='container'>
      <h2 className="title">Create an account</h2>
      <form onSubmit={onSubmit} method="POST">
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Continue</button>
      </form>
      {error && <p className="error-message">{error}</p>} 
      <p className='other-page'>
        Already have an account? <Link to="/login" className='other-page link'>Login Here</Link>
      </p>
    </div>
  );
}

export default SignupForm;
