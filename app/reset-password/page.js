'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      setSuccess(true);
      setTimeout(() => router.push('/signin'), 2000);
    } else {
      setError('Failed to reset password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form onSubmit={handleSubmit} className="card max-w-md w-full mx-auto p-8 rounded-2xl shadow-lg bg-white">
        <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
        {success ? (
          <p className="text-green-600">Password updated! Redirecting to sign in...</p>
        ) : (
          <>
            {error && <p className="text-red-500 mb-3">{error}</p>}
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="New password"
              className="w-full p-2 border mb-3 rounded"
              required
            />
            <button className="bg-blue-600 text-white w-full py-2 rounded">Reset Password</button>
          </>
        )}
      </form>
    </div>
  );
}
