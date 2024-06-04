import React, { useState } from 'react'
import './LoginForm.css'
import { Link, useNavigate } from 'react-router-dom'
import { doSignInWithEmailAndPassword} from '../../firebase/auth'
import { useAuth } from '../../contexts/AuthProvider'
import TestBackendAuth from '../testBackendAuth/TestBackendAuth'

function LoginForm() {

  const { userLoggedIn, token } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSigningIn, setIsSigningIn] = useState(false)

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isSigningIn) {
      setIsSigningIn(true)
      try {
        await doSignInWithEmailAndPassword(email, password);
        navigate('/home')
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message)
        }
        setIsSigningIn(false) // Reset signing-in state
      }
    }
  }

  return (
    <div>
      <div className= 'container' >
        <h2 className = "title"> Welcome Back </h2>
        <form action="/login" method="POST">
          <input type="email" name="email" placeholder="Email" 
              onChange={(e) => setEmail(e.target.value)}required />
          <input type="password" name="password" placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" onClick={event => onSubmit(event)}>Login</button>
        </form>
        <p className = 'other-page' > Don't have an account? 
            <Link to="/signup" className = 'other-page link'> Sign up </Link>
        </p>
        <p className = 'other-page' > Forgot your password? 
            <Link to="/reset-password" className = 'other-page link'> Reset password </Link>
        </p>
        <TestBackendAuth token={token}/>
      </div>
    </div>
  )
}

export default LoginForm