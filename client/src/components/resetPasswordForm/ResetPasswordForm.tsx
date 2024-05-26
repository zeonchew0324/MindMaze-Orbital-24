import React from 'react'
import './ResetPasswordForm.css'

function ResetPasswordForm() {
  return (
    <div className="container">
        <h2 className="title"> Reset your password </h2>
        <form action="/login" method="POST">
            <input type="old-password" name="old-password" placeholder="Old password:" required />
            <input type="new-password" name="new-password" placeholder="New password:" required />
            <input type="confirm-new-password" name="confirm-new-password" placeholder="Confirm new password:" required />
            <button type="submit">Continue</button>
        </form>
    </div>
  )
}

export default ResetPasswordForm