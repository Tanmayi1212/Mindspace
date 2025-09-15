'use client';
import '../styles/global.css';
import Providers from './providers';
import Link from 'next/link';
import { useState } from 'react';

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <html lang="en">
      <head>
        {/* Google Fonts - Inter for a modern look */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        {/* Immediately set theme before hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body>
        <Providers>
          {/* Hamburger menu (hide when sidebar is open) */}
          {!sidebarOpen && (
            <button
              aria-label="Open menu"
              onClick={() => setSidebarOpen(true)}
              style={{
                position: 'fixed',
                top: 18,
                left: 18,
                zIndex: 100,
                background: 'var(--bg-button)',
                color: 'var(--text-button)',
                border: 'none',
                borderRadius: '0.75rem',
                width: 44,
                height: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(246,185,59,0.12)',
                cursor: 'pointer',
              }}
              className="hamburger"
            >
              {/* Hamburger icon */}
              <span style={{
                display: 'block',
                width: 24,
                height: 2,
                background: 'currentColor',
                borderRadius: 2,
                position: 'relative',
              }}>
                <span style={{
                  position: 'absolute',
                  top: -8,
                  left: 0,
                  width: 24,
                  height: 2,
                  background: 'currentColor',
                  borderRadius: 2,
                  content: '""',
                  display: 'block',
                }} />
                <span style={{
                  position: 'absolute',
                  top: 8,
                  left: 0,
                  width: 24,
                  height: 2,
                  background: 'currentColor',
                  borderRadius: 2,
                  content: '""',
                  display: 'block',
                }} />
              </span>
            </button>
          )}
          {/* Sidebar */}
          <aside className="sidebar">
            <div
              className="sidebar-logo"
              style={{
                marginBottom: '2rem',
                display: 'flex',
                justifyContent: 'center', // center horizontally
                alignItems: 'center',
                width: '100%', // take full sidebar width for centering
              }}
            >
              <Link
                href="/"
                className="sidebar-logo-link"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: 700,
                  fontSize: '2rem',
                  borderRadius: '9999px',
                  padding: '0.75rem 1.5rem',
                  margin: 0,
                  textDecoration: 'none',
                  transition: 'background 0.2s, color 0.2s',
                  cursor: 'pointer',
                  justifyContent: 'center',
                  width: 'fit-content',
                }}
              >
                <span style={{ fontWeight: 700 }}>🧘‍♂️MindSpace</span>
              </Link>
            </div>
            <nav className="sidebar-nav">
              <Link href="/journal" className="sidebar-link">
                Journal
              </Link>
              <Link href="/journal/new" className="sidebar-link">
                New Entry
              </Link>
              <Link href="/analyze" className="sidebar-link">
                AI Reflection
              </Link>
              <Link href="/settings" className="sidebar-link">
                Settings
              </Link>
              <div className="sidebar-logout">
                <Link href="/logout" className="sidebar-link">
                  Logout
                </Link>
              </div>
            </nav>
            {/* Close button at bottom */}
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <button
                onClick={() => setSidebarOpen(false)}
                style={{
                  background: 'var(--bg-button)',
                  color: 'var(--text-button)',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '0.5rem 1.5rem',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(246,185,59,0.12)',
                  marginTop: '1rem',
                }}
              >
                Close
              </button>
            </div>
          </aside>
          {/* Main Content */}
          <div
            className="flex-1 flex flex-col min-h-screen"
            style={{
              marginLeft: sidebarOpen ? '260px' : 0,
              transition: 'margin-left 0.3s',
            }}
          >
            <main className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-12">
                {children}
              </div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}