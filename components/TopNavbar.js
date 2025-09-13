'use client';

import { useSession, signOut } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const Settings = dynamic(() => import('lucide-react').then((mod) => mod.Settings), { ssr: false });

export default function TopNavbar() {
  const { data: session } = useSession();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-[#23272f] dark:bg-[#23272f] shadow-md flex items-center px-6 py-4"
      style={{ width: '100%' }}
    >
      {/* Left: Logo */}
      <div className="flex items-center flex-shrink-0" style={{ minWidth: 120 }}>
        <Link href="/" className="text-2xl font-bold text-[#f6b93b]">
          MindSpace
        </Link>
      </div>
      {/* Center: Links */}
      <div className="flex-1 flex items-center justify-center gap-8">
        {session ? (
          <>
            <Link href="/journal" className="text-lg text-[#f6b93b] hover:underline">
              Journal
            </Link>
            <Link href="/journal/new" className="text-lg text-[#f6b93b] hover:underline">
              New Entry
            </Link>
            <Link href="/analyze" className="text-lg text-[#f6b93b] hover:underline">
              AI Reflection
            </Link>
          </>
        ) : (
          <>
            <Link href="/signup" className="text-lg text-[#f6b93b] hover:underline">
              Sign Up
            </Link>
            <Link href="/signin" className="text-lg text-[#f6b93b] hover:underline">
              Sign In
            </Link>
          </>
        )}
      </div>
      {/* Right: Settings & Logout */}
      <div className="flex items-center gap-4 flex-shrink-0" style={{ minWidth: 120, justifyContent: 'flex-end' }}>
        {session ? (
          <>
            <button
              onClick={() => signOut()}
              className="text-lg text-[#f6b93b] hover:underline"
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                margin: 0,
                boxShadow: 'none',
                borderRadius: 0,
                fontWeight: 'inherit',
              }}
            >
              Logout
            </button>
            <Link href="/settings" className="p-2 rounded bg-[#3b7a57] text-white" aria-label="Settings">
              <Settings size={20} />
            </Link>
          </>
        ) : null}
      </div>
    </nav>
  );
}