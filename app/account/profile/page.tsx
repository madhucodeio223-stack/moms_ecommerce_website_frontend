'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AIChatWidget } from '@/components/ai-chat-widget';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getProfile, saveProfile } from '@/lib/profile';

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setProfile(getProfile());
  }, []);

  function handleSave() {
    setSaving(true);
    saveProfile(profile);
    setTimeout(() => setSaving(false), 500);
  }

  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-2xl font-semibold mb-6">Profile</h1>
          <div className="space-y-4">
            <div>
              <label className="text-sm">Full Name</label>
              <Input value={profile.fullName || ''} onChange={(e:any)=>setProfile({...profile, fullName: e.target.value})} />
            </div>
            <div>
              <label className="text-sm">Email</label>
              <Input value={profile.email || ''} onChange={(e:any)=>setProfile({...profile, email: e.target.value})} />
            </div>
            <div>
              <label className="text-sm">Phone</label>
              <Input value={profile.phone || ''} onChange={(e:any)=>setProfile({...profile, phone: e.target.value})} />
            </div>
            <div>
              <label className="text-sm">Address</label>
              <Input value={profile.address || ''} onChange={(e:any)=>setProfile({...profile, address: e.target.value})} />
            </div>

            <div className="flex gap-3">
              <Button onClick={handleSave} className="bg-sage" disabled={saving}>{saving? 'Saving...' : 'Save Changes'}</Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <AIChatWidget />
    </>
  );
}
