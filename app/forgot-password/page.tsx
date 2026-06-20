'use client';

import { useState } from 'react';
import supabase from '@/lib/supabaseClient';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/` : undefined });
    if (error) setStatus(error.message);
    else setStatus('Password reset email sent. Check your inbox.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="w-full max-w-md p-8 bg-card rounded-lg border">
        <h1 className="text-2xl font-bold mb-4">Reset your password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm">Email</label>
            <input className="w-full rounded border px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
          </div>
          {status && <div className="text-sm">{status}</div>}
          <button className="w-full py-2 bg-sage text-white rounded">Send reset link</button>
        </form>
      </div>
    </div>
  );
}
