import React, { useState } from 'react';
import { doSendPasswordResetEmail } from '../../firebase/auth';

function ResetPasswordForm() {
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSending) {
      setIsSending(true);
      try {
        await doSendPasswordResetEmail(email);
        alert('Email sent!');
        setTimeout(() => setIsSending(false), 10000);
      } catch (error) {
        if (error instanceof Error) {
          alert('An error occured, try again later');
        }
        setTimeout(() => setIsSending(false), 10000); // Reset signing-in state
      }
    } else {
      alert('You can only do this every 10 seconds!');
    }
  };

  return (
    <div className="bg-black bg-opacity-50  text-white py-8 px-4 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-8">Reset your password</h2>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 bg-white text-black rounded-lg shadow-md focus:outline-none focus:ring focus:border-blue-500"
        />
        <button
          type="submit"
          onClick={onSubmit}
          disabled={isSending}
          className={`w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md transition duration-300 ${isSending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
        >
          {isSending ? 'Sending...' : 'Send Password Reset Email'}
        </button>
      </form>
    </div>
  );
}

export default ResetPasswordForm;
