'use client';
import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error('❌ Sign-in error:', error.message);
    } else {
      const user = data.user;
      console.log('✅ User signed in:', user);
      alert('✅ Sign-in successful!');
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Sign In</h1>
      <div className="bg-white shadow-lg p-6 rounded-xl space-y-4 w-full max-w-sm">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded"
        />
        <button
          onClick={handleSignin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
