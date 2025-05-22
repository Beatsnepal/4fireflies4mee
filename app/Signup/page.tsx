'use client';
import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Mail, Lock, User } from 'lucide-react';

export default function SignUpPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (error) {
      console.error('❌ Sign-up error:', error.message);
      alert(`Signup failed: ${error.message}`);
    } else {
      alert('✅ Signup successful! Please check your email.');
      window.location.href = '/signin';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-900 text-center mb-6">Create Your Account</h1>
        <div className="space-y-4">
          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
            <User className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Full Name"
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          </div>
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
            onClick={handleSignup}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            Sign Up
          </button>
        </div>
        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <a href="/signin" className="text-blue-600 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
