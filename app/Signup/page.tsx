'use client';
import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    const user = data.user;

    if (error) {
      console.error('❌ Sign-up error:', error.message);
    } else {
      console.log('✅ User signed up:', user);
      alert('✅ Signup successful! Please check your email.');
      window.location.href = '/signin';
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Sign Up</h1>
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
          onClick={handleSignup}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
