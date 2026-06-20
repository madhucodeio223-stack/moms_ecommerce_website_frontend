'use client';

import React, {useState, useEffect} from 'react';
import supabase from '@/lib/supabaseClient';

export default function Appointments({userId}:{userId?:string}){
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(()=>{
    if(!userId) return;
    let mounted = true;
    const load = async ()=>{
      const res = await supabase.from('appointments').select('*').eq('user_id', userId).order('date', {ascending:true});
      if(!mounted) return;
      setAppointments(res.data || []);
    };
    load();

    const channel = supabase.channel('public:appointments').on('postgres_changes', {event:'INSERT', schema:'public', table:'appointments', filter:`user_id=eq.${userId}`}, payload=>{
      setAppointments((prev)=>[...(prev||[]), payload.new]);
    }).subscribe();

    return ()=>{ mounted=false; channel.unsubscribe(); };
  },[userId]);

  return (
    <div className="p-4 bg-card rounded-lg border">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium">Appointments</div>
      </div>
      <div className="space-y-2">
        {appointments.length===0 && <div className="text-sm text-muted-foreground">No upcoming appointments</div>}
        {appointments.map(a=> (
          <div key={a.id} className="p-2 bg-muted rounded">
            <div className="text-sm font-medium">{a.doctor_name}</div>
            <div className="text-xs text-muted-foreground">{new Date(a.date).toLocaleString()}</div>
            <div className="text-xs mt-1">{a.notes}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
