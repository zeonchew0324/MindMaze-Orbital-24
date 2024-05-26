import React from 'react'
import './SignupForm.css'

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
            <a className='other-page link' href = 'login.html'> Login Here </a>
        </p>
    </div>
  )
}

export default SignupForm