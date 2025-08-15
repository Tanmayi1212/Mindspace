import '../styles/global.css'; 
import Providers from './providers';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export const metadata = {
  title: 'MindSpace - Reflect and Grow', // Enhanced title
  description: 'MindSpace is a peaceful corner of the internet where you can reflect, grow, and find clarity through journaling.', // Enhanced description
};

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
            <div className="sidebar-logo">
              <span>🧘‍♂️</span>
              <Link
                href="/"
                className="bg-transparent border-none text-white font-semibold cursor-pointer sidebar-link"
                style={{ padding: 0, margin: 0, font: 'inherit', textDecoration: 'none' }}
              >
                MindSpace
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
            <Navbar />
            {/* Main content area with responsive padding */}
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
