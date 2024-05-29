import React, { useState } from 'react'
import './ResetPasswordForm.css'
import { doSendPasswordResetEmail } from '../../firebase/auth'
import { on } from 'events'

function ResetPasswordForm() {
  
  const [email, setEmail] = useState('')
  const [isSending, setIsSending] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isSending) {
      setIsSending(true)
      try {
        await doSendPasswordResetEmail(email);
        alert('Email sent!')
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message)
        }
        setTimeout(() => setIsSending(false), 10000) // Reset signing-in state
      }
    } else {
      alert('You can only do this every 10 seconds!')
    }
  }

  return (
    <div className="container">
        <h2 className="title"> Reset your password </h2>
        <form action="/login" method="POST">
        <input type="email" name="email" placeholder="Email" 
              onChange={(e) => setEmail(e.target.value)}required />
            <button type="submit" onClick={(e) => onSubmit(e)}>Send Password Reset Email</button>
        </form>
    </div>
  )
}

export default ResetPasswordForm