'use client';

import React, { useState, useEffect } from 'react';

// Mock user data (replace with real data from your auth/session)
const mockUser = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  notifications: 'all',
  theme: 'light',
};

export default function SettingsPage() {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: mockUser.name,
    email: mockUser.email,
    password: '',
    notifications: mockUser.notifications,
    theme: mockUser.theme,
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === 'theme') {
      if (e.target.value === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  useEffect(() => {
    // On mount, set theme from form value
    if (form.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [form.theme]);

  const handleEdit = () => setEditing(true);

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: Save settings to backend
    setEditing(false);
    // Optionally show a success message
  };

  return (
    <div className="card max-w-xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6 text-[#3B7A57]">Settings</h1>
      {!editing ? (
        <div className="flex flex-col gap-6">
          <div>
            <span className="block font-semibold mb-2">Profile Name</span>
            <span>{form.name}</span>
          </div>
          <div>
            <span className="block font-semibold mb-2">Email</span>
            <span>{form.email}</span>
          </div>
          <div>
            <span className="block font-semibold mb-2">Notifications</span>
            <span>{form.notifications}</span>
          </div>
          <div>
            <span className="block font-semibold mb-2">Theme</span>
            <span>{form.theme}</span>
          </div>
          <button
            className="bg-[#3B7A57] text-white rounded-full px-6 py-2 font-semibold mt-4 hover:bg-[#2e5d43] transition"
            onClick={handleEdit}
          >
            Update Settings
          </button>
        </div>
      ) : (
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="block font-semibold mb-2" htmlFor="name">Profile Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full border rounded px-3 py-2"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-semibold mb-2" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full border rounded px-3 py-2"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-semibold mb-2" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full border rounded px-3 py-2"
              value={form.password}
              onChange={handleChange}
              placeholder="New Password"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2" htmlFor="notifications">Notifications</label>
            <select
              id="notifications"
              name="notifications"
              className="w-full border rounded px-3 py-2"
              value={form.notifications}
              onChange={handleChange}
            >
              <option value="all">All</option>
              <option value="important">Only Important</option>
              <option value="none">None</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-2" htmlFor="theme">Theme</label>
            <select
              id="theme"
              name="theme"
              className="w-full border rounded px-3 py-2"
              value={form.theme}
              onChange={handleChange}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-[#3B7A57] text-white rounded-full px-6 py-2 font-semibold mt-4 hover:bg-[#2e5d43] transition"
          >
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
}
