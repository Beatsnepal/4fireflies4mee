'use client';
import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Mail, Lock } from 'lucide-react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error('❌ Sign-in error:', error.message);
      alert(`Sign-in failed: ${error.message}`);
    } else {
      alert('✅ Sign-in successful!');
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-900 text-center mb-6">Welcome Back</h1>
        <div className="space-y-4">
          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
            <Mail className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          </div>
          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
            <Lock className="text-gray-400 mr-2" />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          </div>
          <button
            onClick={handleSignin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            Sign In
          </button>
        </div>
        <p className="text-sm text-center mt-4">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
