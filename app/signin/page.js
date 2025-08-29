'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push('/journal');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-[#e6f4ea] dark:bg-[#23272f]">
      <form onSubmit={handleSubmit} className="card max-w-md w-full mx-auto p-8 rounded-2xl shadow-lg bg-white dark:bg-[#23272f]">
        <h1 className="text-3xl font-bold mb-6 text-[#3B7A57] dark:text-[#f6b93b] text-center">Sign In</h1>
        {error && <p className="text-red-500 mb-3 text-center">{error}</p>}
        <label className="block mb-2 font-semibold text-[#3B7A57] dark:text-[#f6b93b]" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg mb-4 bg-[#f8fdf9] dark:bg-[#1a1d23] text-[#23423a] dark:text-[#e6f4ea] focus:outline-none focus:ring-2 focus:ring-[#f6b93b]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="block mb-2 font-semibold text-[#3B7A57] dark:text-[#f6b93b]" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg mb-6 bg-[#f8fdf9] dark:bg-[#1a1d23] text-[#23423a] dark:text-[#e6f4ea] focus:outline-none focus:ring-2 focus:ring-[#f6b93b]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full py-3 rounded-full bg-gradient-to-r from-[#F6B93B] to-[#F9D423] text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition text-lg">
          Sign In
        </button>
        <div className="mt-4 text-center">
          <span className="text-[#3B7A57] dark:text-[#f6b93b]">Don't have an account?</span>
          <a href="/signup" className="ml-2 text-[#f6b93b] font-semibold hover:underline">Sign Up</a>
        </div>
        <div className="mt-2 text-center">
          <a href="/forgot-password" className="text-blue-600 font-semibold hover:underline">Forgot Password?</a>
        </div>
      </form>
    </div>
  );
}
