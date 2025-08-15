'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic

// Dynamically import Lucide icons to ensure they are client-side rendered.
// This often resolves 'forwardRef' issues with client components and external libraries.
const Menu = dynamic(() => import('lucide-react').then((mod) => mod.Menu), { ssr: false });
const X = dynamic(() => import('lucide-react').then((mod) => mod.X), { ssr: false });
const LogOut = dynamic(() => import('lucide-react').then((mod) => mod.LogOut), { ssr: false });
const BookOpen = dynamic(() => import('lucide-react').then((mod) => mod.BookOpen), { ssr: false });
const Edit = dynamic(() => import('lucide-react').then((mod) => mod.Edit), { ssr: false });
const LogIn = dynamic(() => import('lucide-react').then((mod) => mod.LogIn), { ssr: false });
const UserPlus = dynamic(() => import('lucide-react').then((mod) => mod.UserPlus), { ssr: false });

export default function Navbar() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-700 to-purple-800 shadow-xl relative z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left Side: Logo + Brand */}
        <div className="flex items-center space-x-3">
          <span className="text-4xl leading-none text-white">🧘‍♀️</span>
          <Link href="/" className="text-3xl font-extrabold text-white tracking-tight hover:text-indigo-200 transition-colors duration-300">
            MindSpace
          </Link>
        </div>

        {/* Right Side: Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 text-lg font-medium">
          {session ? (
            <>
              <Link
                href="/journal"
                className="text-white hover:text-indigo-200 transition-all duration-300 ease-in-out flex items-center space-x-2 group"
              >
                {/* Ensure icons are rendered only on the client */}
                {BookOpen && <BookOpen size={20} className="text-white group-hover:text-indigo-200 transition-colors" />}
                <span>Journal</span>
              </Link>
              <Link
                href="/journal/new"
                className="text-white hover:text-indigo-200 transition-all duration-300 ease-in-out flex items-center space-x-2 group"
              >
                {/* Ensure icons are rendered only on the client */}
                {Edit && <Edit size={20} className="text-white group-hover:text-indigo-200 transition-colors" />}
                <span>New Entry</span>
              </Link>
              <button
                onClick={() => signOut()}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2"
              >
                {/* Ensure icons are rendered only on the client */}
                {LogOut && <LogOut size={20} />}
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="text-white hover:text-indigo-200 transition-all duration-300 ease-in-out flex items-center space-x-2 group"
              >
                {/* Ensure icons are rendered only on the client */}
                {LogIn && <LogIn size={20} className="text-white group-hover:text-indigo-200 transition-colors" />}
                <span>Login</span>
              </Link>
              <Link
                href="/signup"
                className="bg-white text-indigo-700 hover:bg-indigo-100 font-semibold py-2 px-5 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2"
              >
                {/* Ensure icons are rendered only on the client */}
                {UserPlus && <UserPlus size={20} />}
                <span>Sign Up</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
            {/* Ensure icons are rendered only on the client */}
            {isMobileMenuOpen ? (X && <X size={30} />) : (Menu && <Menu size={30} />)}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-indigo-700 bg-opacity-95 shadow-lg pb-4 transition-all duration-300 ease-in-out transform origin-top animate-fade-in-down">
          <div className="flex flex-col items-center space-y-4 py-4 text-lg font-medium">
            {session ? (
              <>
                <Link
                  href="/journal"
                  className="text-white hover:text-indigo-200 transition-colors duration-300 w-full text-center py-2"
                  onClick={toggleMobileMenu}
                >
                  📓 Journal
                </Link>
                <Link
                  href="/journal/new"
                  className="text-white hover:text-indigo-200 transition-colors duration-300 w-full text-center py-2"
                  onClick={toggleMobileMenu}
                >
                  ✍️ New Entry
                </Link>
                <button
                  onClick={() => { signOut(); toggleMobileMenu(); }}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="text-white hover:text-indigo-200 transition-colors duration-300 w-full text-center py-2"
                  onClick={toggleMobileMenu}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-white text-indigo-700 hover:bg-indigo-100 font-semibold py-2 px-6 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                  onClick={toggleMobileMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

/*
  Note on Hydration Errors:
  The "hydration error" often occurs when the server-rendered HTML (from Next.js)
  does not exactly match the HTML generated by the client-side React code.
  Third-party scripts, like browser extensions (e.g., Grammarly), can inject
  elements into the DOM after the page loads but before React hydrates,
  causing this mismatch.

  While dynamically importing icons in this Navbar helps ensure this component
  is client-rendered, if the Grammarly error persists, it's likely due to
  Grammarly itself modifying the DOM. For debugging, you might consider
  disabling such extensions temporarily to see if the hydration error resolves.
*/
