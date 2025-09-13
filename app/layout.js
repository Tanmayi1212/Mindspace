'use client';
import '../styles/global.css'; 
import Providers from './providers';
import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts - Inter for a modern look */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers>
          {/* Sidebar */}
          <aside className="sidebar">
            <div className="sidebar-logo" style={{
              background: 'var(--bg-button)',
              color: 'var(--text-button)',
              borderRadius: '2rem',
              padding: '0.5rem 0.6rem', // reduced padding for better fit
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '2rem',
              fontWeight: 700,
              width: 'fit-content',
              boxShadow: '0 2px 8px rgba(246,185,59,0.12)',
            }}>
              
              <Link
                href="/"
                className="bg-transparent border-none text-white font-semibold cursor-pointer sidebar-link"
                style={{ padding: 0, margin: 0, font: 'inherit', textDecoration: 'none' }}
              >
              🧘‍♂️MindSpace
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
          </aside>
          {/* Main Content */}
          <div className="flex-1 flex flex-col min-h-screen" style={{ marginLeft: '260px' }}>
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