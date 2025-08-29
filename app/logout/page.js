'use client';
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    signOut({ redirect: false });
    router.push('/signin');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <span className="text-lg text-[#3B7A57]">Logging out...</span>
    </div>
  );
}
