import React from 'react'
import './SignupForm.css'
import { Link } from 'react-router-dom'

function SignupForm() {
  return (
    <div className='container' >
        <h2 className="title"> Create an account </h2>
        <form action="/login" method="POST">
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Continue</button>
        </form>
        <p className='other-page' > Already have an account? 
            <Link to="/login" className='other-page link'> Login Here </Link>
        </p>
    </div>
  )
}

export default SignupForm