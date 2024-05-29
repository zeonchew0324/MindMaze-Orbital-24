import React, { useState } from 'react'
import './SignupForm.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthProvider'
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth'

function SignupForm() {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSigningUp, setIsSigningUp] = useState(false)

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isSigningUp) {
      setIsSigningUp(true)
      try {
        await doCreateUserWithEmailAndPassword(email, password);
        navigate('/home')
      } catch (error) {
        console.log('hello fail')
        if (error instanceof Error) {
          alert(error.message)
        }
        setIsSigningUp(false) // Reset signing-in state
      }
    }
  }

  return (
    <div className='container' >
        <h2 className="title"> Create an account </h2>
        <form action="/login" method="POST">
            <input type="email" name="email" placeholder="Email" 
              onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" name="password" placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit" onClick={(event) => onSubmit(event)}>Continue</button>
        </form>
        <p className='other-page' > Already have an account? 
            <Link to="/login" className='other-page link'> Login Here </Link>
        </p>
    </div>
  )
}

export default SignupForm