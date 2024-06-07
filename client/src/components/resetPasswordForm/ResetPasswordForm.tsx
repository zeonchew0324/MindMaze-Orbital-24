import React, { useState } from 'react';
import './ResetPasswordForm.css';
import { doSendPasswordResetEmail } from '../../firebase/auth';

function ResetPasswordForm() {
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message
  const [rateLimitMessage, setRateLimitMessage] = useState<string | null>(null); // State for rate-limit message

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSending) {
      setIsSending(true);
      setErrorMessage(null); // Reset error message
      setRateLimitMessage(null); // Reset rate-limit message
      try {
        await doSendPasswordResetEmail(email);
        alert('Email sent!');
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message); // Set error message
        }
        setTimeout(() => setIsSending(false), 10000); // Reset signing-in state
      }
    } else {
      setRateLimitMessage('You can only do this every 10 seconds!');
    }
  };

  return (
    <div className="container">
      <h2 className="title">Reset your password</h2>
      <form action="/login" method="POST">
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" onClick={(e) => onSubmit(e)}>Send Password Reset Email</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
      {rateLimitMessage && <p className="rate-limit-message">{rateLimitMessage}</p>} {/* Display rate-limit message */}
    </div>
  );
}

export default ResetPasswordForm;
