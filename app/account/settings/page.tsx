'use client';

import { useEffect, useState } from 'react';
import supabase from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data?.session?.user;
      if (!user) return router.push('/');
      const { data: p } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      setProfile(p ?? { full_name: '', phone: '', address: '', email: user.email });
    };
    load();
  }, [router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setLoading(true);
    const { error } = await supabase.from('profiles').upsert({ id: profile.id, full_name: profile.full_name, phone: profile.phone, address: profile.address, email: profile.email });
    if (error) setStatus(error.message);
    else setStatus('Profile saved');
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-20 bg-muted">
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
        <form onSubmit={handleSave} className="space-y-4 bg-card p-6 rounded border">
          <div>
            <label className="block text-sm">Full Name</label>
            <input className="w-full rounded border px-3 py-2" value={profile?.full_name || ''} onChange={(e)=>setProfile({...profile, full_name: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm">Phone</label>
            <input className="w-full rounded border px-3 py-2" value={profile?.phone || ''} onChange={(e)=>setProfile({...profile, phone: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm">Address</label>
            <textarea className="w-full rounded border px-3 py-2" value={profile?.address || ''} onChange={(e)=>setProfile({...profile, address: e.target.value})} />
          </div>
          {status && <div className="text-sm">{status}</div>}
          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
            <Button variant="ghost" onClick={() => router.push('/account')}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

