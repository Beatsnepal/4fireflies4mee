'use client';
import React, { useEffect, useState } from 'react';
import { Music } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

interface NavbarProps {
  onUploadClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onUploadClick }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav className="bg-blue-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Music size={28} className="text-white" />
            <span className="font-bold text-xl tracking-tight">Beats 4 Nepal</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-blue-200 transition-colors">Home</Link>
            <a href="#beats" className="hover:text-blue-200 transition-colors">Beats</a>
            <Link href="/mixing-service" className="hover:text-blue-200 transition-colors">Mixing Service</Link>
            <Link href="/album-sell" className="hover:text-blue-200 transition-colors">Albums</Link>
            <Link href="/myprofile" className="hover:text-blue-200 transition-colors">My Profile</Link>
            {!user && (
              <>
                <Link href="/signup" className="hover:text-blue-200 transition-colors">Sign Up</Link>
                <Link href="/signin" className="hover:text-blue-200 transition-colors">Sign In</Link>
              </>
            )}
            {user && (
              <button onClick={handleLogout} className="hover:text-red-300 transition-colors">
                Logout
              </button>
            )}
          </div>

          {user && (
            <button
              onClick={onUploadClick}
              className="bg-white text-blue-900 px-4 py-2 rounded-md font-medium hover:bg-blue-100 transition-colors"
            >
              Upload Beat
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
