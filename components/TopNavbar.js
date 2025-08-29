'use client';

import { useSession, signOut } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const Settings = dynamic(() => import('lucide-react').then((mod) => mod.Settings), { ssr: false });

export default function TopNavbar() {
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#23272f] dark:bg-[#23272f] shadow-md flex justify-between items-center px-6 py-4">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-2xl font-bold text-[#f6b93b]">
          MindSpace
        </Link>
      </div>
      <div className="flex items-center gap-4">
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
            <button
              onClick={() => signOut()}
              className="text-lg text-[#f6b93b] hover:underline"
            >
              Logout
            </button>
            <Link href="/settings" className="p-2 rounded bg-[#3b7a57] text-white" aria-label="Settings">
              <Settings size={20} />
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
    </nav>
  );
}