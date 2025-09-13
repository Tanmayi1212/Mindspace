'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Add Next.js router
import { useSession } from 'next-auth/react';

export default function SettingsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [theme, setTheme] = useState('light');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Read theme from localStorage or system on mount
  useEffect(() => {
    const getTheme = () => {
      if (typeof window === 'undefined') return 'light';
      return localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    };
    setTheme(getTheme());
    document.documentElement.classList.toggle('dark', getTheme() === 'dark');
    async function fetchUser() {
      if (!session?.user?.email) return;
      setLoading(true);
      const res = await fetch('/api/auth/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: session.user.email }),
      });
      if (res.ok) {
        const user = await res.json();
        setName(user.name || '');
        setEmail(user.email || '');
        setTheme(user.theme || 'light');
      }
      setLoading(false);
    }
    fetchUser();
  }, [session]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleUpdate = async e => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/auth/update-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, theme }),
    });
    if (res.ok) {
      setMessage('Settings updated!');
      localStorage.setItem('theme', theme); // persist theme
      window.location.reload(); // Reload the page to apply theme globally
    } else {
      setMessage('Failed to update settings');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    // TODO: Clear auth/session here (e.g., remove token, clear context)
    router.push('/login'); // Redirect to login/signup page
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) return;
    const res = await fetch('/api/auth/delete-account', { method: 'DELETE' });
    if (res.ok) {
      router.push('/signup');
    } else {
      alert('Failed to delete account.');
    }
  };

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-main)',
        transition: 'background 0.3s',
      }}
    >
      <form
        onSubmit={handleUpdate}
        style={{
          width: '100%',
          maxWidth: 400,
          background: 'var(--bg-card)',
          borderRadius: 24,
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          padding: '2.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem',
          transition: 'background 0.3s, color 0.3s',
        }}
      >
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            marginBottom: 10,
            textAlign: 'center',
            color: 'var(--text-heading)',
            letterSpacing: 1,
            transition: 'color 0.3s',
          }}
        >
          Settings
        </h1>
        {message && (
          <p style={{ textAlign: 'center', color: 'var(--text-heading)', marginBottom: 8 }}>
            {message}
          </p>
        )}
        <div>
          <label
            htmlFor="name"
            style={{ fontWeight: 600, color: 'var(--text-heading)', marginBottom: 4, display: 'block', transition: 'color 0.3s' }}
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: 8,
              border: `1px solid var(--border-main)`,
              background: 'var(--bg-input)',
              color: 'var(--text-main)',
              fontSize: 16,
              transition: 'background 0.3s, color 0.3s, border-color 0.3s',
            }}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            style={{ fontWeight: 600, color: 'var(--text-heading)', marginBottom: 4, display: 'block', transition: 'color 0.3s' }}
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            disabled
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: 8,
              border: `1px solid var(--border-main)`,
              background: 'var(--bg-input)',
              color: 'var(--text-main)',
              fontSize: 16,
              transition: 'background 0.3s, color 0.3s, border-color 0.3s',
            }}
          />
        </div>
        <div>
          <label
            htmlFor="theme"
            style={{ fontWeight: 600, color: 'var(--text-heading)', marginBottom: 4, display: 'block', transition: 'color 0.3s' }}
          >
            Theme
          </label>
          <select
            id="theme"
            value={theme}
            onChange={e => setTheme(e.target.value)}
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: 8,
              border: `1px solid var(--border-main)`,
              background: 'var(--bg-input)',
              color: 'var(--text-main)',
              fontSize: 16,
              transition: 'background 0.3s, color 0.3s, border-color 0.3s',
            }}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.9rem',
            borderRadius: 24,
            background: 'var(--bg-button)',
            color: 'var(--text-button)',
            fontWeight: 600,
            fontSize: 18,
            letterSpacing: 0.5,
            border: 'none',
            boxShadow: '0 2px 8px rgba(246,185,59,0.08)',
            marginTop: 10,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s, color 0.2s, transform 0.1s',
          }}
        >
          {loading ? 'Saving...' : 'Update Settings'}
        </button>
      </form>
    </div>
  );
};