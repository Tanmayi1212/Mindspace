// app/layout.js
import '../styles/global.css';
import Providers from './providers'; // Ensure this path is correct
import Navbar from '@/components/Navbar'; // Ensure this path is correct

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
        {/*
          IMPORTANT: The Lucide React UMD script below is NOT needed and causes conflicts
          when using lucide-react as an npm package with dynamic imports.
          It has been removed.
        */}
      </head>
      <body className="font-inter antialiased bg-gray-50 text-gray-800 min-h-screen flex flex-col">
        <Providers>
          <Navbar /> {/* This is where your Navbar component is rendered */}
          {/* Main content area with responsive padding */}
          <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
