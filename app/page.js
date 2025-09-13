// app/page.js
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import Link from 'next/link';
import Image from 'next/image';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center mt-8">
      {/* Illustration Side */}
      <div className="hidden md:flex items-center justify-center">
        <Image
          src="/healing.jpg"
          alt="Mindfulness"
          width={400}
          height={500}
          className="rounded-2xl shadow-xl object-cover"
          style={{ maxHeight: '500px', maxWidth: '400px', borderRadius: '2rem' }}
          priority
        />
      </div>
      {/* Hero Card Side */}
      <div className="card flex flex-col items-center justify-center text-center dark:bg-[#23272f] dark:text-[#e6f4ea]">
        <h1 className="text-4xl md:text-5xl font-bold text-[#3B7A57] dark:text-[#f6b93b] mb-4 font-poppins">
          Welcome to MindSpace 🧘‍♂️
        </h1>
        <p
          className="text-base font-medium transition text-[#3B7A57] dark:text-[#f6b93b] mb-8 max-w-2xl leading-relaxed font-lato"
          style={{
            fontWeight: 500,
            letterSpacing: '0.01em',
            textUnderlineOffset: '4px',
            cursor: 'default',
          }}
        >
          Reconnect with your inner self. MindSpace is a peaceful corner of the internet
          where you can reflect, grow, and find clarity through journaling.
        </p>
        <div className="flex flex-col items-center gap-4 w-full">
          {session ? (
            <>
              <Link
                href="/journal/new"
                className="bg-gradient-to-r from-[#F6B93B] to-[#F9D423] text-white font-semibold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105 hover:shadow-xl text-lg"
              >
                Write a Journal Entry
              </Link>
              <div className="flex flex-row gap-8 justify-center mt-2">
                <Link
                  href="/journal"
                  className="flex items-center gap-2 text-[#3B7A57] dark:text-[#f6b93b] hover:underline text-base font-medium transition"
                >
                  📓 View All Entries
                </Link>
                <Link
                  href="/analyze"
                  className="flex items-center gap-2 text-[#3B7A57] dark:text-[#f6b93b] hover:underline text-base font-medium transition"
                >
                  ✨ Try AI Reflection
                </Link>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/signup"
                className="bg-gradient-to-r from-[#3B7A57] to-[#F6B93B] text-white font-semibold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105 hover:shadow-xl text-lg"
              >
                Sign Up
              </Link>
              <Link
                href="/signin"
                className="mt-2 px-8 py-3 rounded-full bg-white text-[#3B7A57] font-semibold border border-[#3B7A57] hover:bg-[#f6b93b] hover:text-[#23272f] transition text-lg"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
