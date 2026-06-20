'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AIChatWidget } from '@/components/ai-chat-widget';
import { getAppointments } from '@/lib/appointments';
import { Button } from '@/components/ui/button';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    setAppointments(getAppointments());
  }, []);

  const upcoming = appointments.filter(a => a.status === 'upcoming');
  const past = appointments.filter(a => a.status === 'past');

  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-2xl font-semibold mb-6">Appointments</h1>

          <section className="mb-6">
            <h2 className="font-semibold mb-3">Upcoming</h2>
            {upcoming.length === 0 ? (
              <div className="bg-card p-4 rounded-md">No upcoming appointments</div>
            ) : upcoming.map(a => (
              <div key={a.id} className="bg-card p-4 rounded-md mb-2 flex justify-between items-center">
                <div>
                  <div className="font-medium">{a.title}</div>
                  <div className="text-sm text-muted-foreground">{new Date(a.datetime).toLocaleString()}</div>
                </div>
                <div>
                  <Button size="sm">Reschedule</Button>
                </div>
              </div>
            ))}
          </section>

          <section>
            <h2 className="font-semibold mb-3">Past</h2>
            {past.length === 0 ? (
              <div className="bg-card p-4 rounded-md">No past appointments</div>
            ) : past.map(a => (
              <div key={a.id} className="bg-card p-4 rounded-md mb-2">
                <div className="font-medium">{a.title}</div>
                <div className="text-sm text-muted-foreground">{new Date(a.datetime).toLocaleString()}</div>
              </div>
            ))}
          </section>
        </div>
      </main>
      <Footer />
      <AIChatWidget />
    </>
  );
}
