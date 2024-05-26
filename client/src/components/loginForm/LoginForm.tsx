import React from 'react'
import './LoginForm.css'

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
            <a className = 'other-page link' href = 'signup.html'> Sign up </a>
        </p>
        <p className = 'other-page' > Forgot your password? 
            <a className = 'other-page link' href = 'resetpassword.html'> Reset password </a>
        </p>
      </div>
    </div>
  )
}

export default LoginForm