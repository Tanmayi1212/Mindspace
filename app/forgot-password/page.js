'use client';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      setSent(true);
    } else {
      setError('Failed to send reset link');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form onSubmit={handleSubmit} className="card max-w-md w-full mx-auto p-8 rounded-2xl shadow-lg bg-white">
        <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
        {sent ? (
          <p className="text-green-600">A reset link has been sent to your email.</p>
        ) : (
          <>
            {error && <p className="text-red-500 mb-3">{error}</p>}
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full p-2 border mb-3 rounded"
              required
            />
            <button className="bg-blue-600 text-white w-full py-2 rounded">Send Reset Link</button>
          </>
        )}
      </form>
    </div>
  );
}
