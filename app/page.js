// app/page.js
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import Link from 'next/link';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col items-center justify-center px-4 py-10 min-h-screen bg-gray-50">
      <div className="relative w-full max-w-4xl h-[400px] rounded-lg overflow-hidden shadow-lg">
        <img
          src="/image.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/20 to-white/40 backdrop-blur-sm" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 animate-fade-in">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Welcome to <span className="text-indigo-700">MindSpace 🧘‍♀️</span>
          </h1>
          <p className="text-lg text-gray-800 mb-6 max-w-2xl">
            Reconnect with your inner self. MindSpace is a peaceful corner of the internet
            where you can reflect, grow, and find clarity through journaling.
          </p>

          {session ? (
            <>
              <Link
                href="/journal/new"
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-6 rounded transition duration-300 shadow-md"
              >
                Write a Journal Entry
              </Link>
              <Link
                href="/journal"
                className="mt-4 text-blue-600 underline hover:text-blue-800 text-sm"
              >
                📓 View All Entries
              </Link>
            </>
          ) : (
            <Link
              href="/signup"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded transition duration-300 shadow-md"
            >
              Get Started
            </Link>
          )}

          <Link
            href="/analyze"
            className="mt-4 text-indigo-600 underline hover:text-indigo-800 text-sm"
          >
            ✨ Try AI Reflection
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-5xl text-center animate-fade-in delay-200">
        {[
          {
            title: "Reflect",
            text: "Pause and explore your thoughts and emotions in a safe, judgment-free zone.",
          },
          {
            title: "Process",
            text: "Uncover patterns, insights, and inner truths by journaling regularly.",
          },
          {
            title: "Grow",
            text: "Cultivate mindfulness and emotional awareness to support your personal growth.",
          },
        ].map((item) => (
          <div key={item.title}>
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-700">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
