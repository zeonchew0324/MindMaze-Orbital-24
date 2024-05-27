import React from 'react'
import './LoginForm.css'
import { Link } from 'react-router-dom'

function LoginForm() {
  return (
    <div>
      <div className= 'container' >
        <h2 className = "title"> Welcome Back </h2>
        <form action="/login" method="POST">
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
        <p className = 'other-page' > Don't have an account? 
            <Link to="/signup" className = 'other-page link'> Sign up </Link>
        </p>
        <p className = 'other-page' > Forgot your password? 
            <Link to="/reset-password" className = 'other-page link'> Reset password </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginForm