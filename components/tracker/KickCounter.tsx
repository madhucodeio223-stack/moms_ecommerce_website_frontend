'use client';

import React, {useState, useEffect} from 'react';
import supabase from '@/lib/supabaseClient';

export default function KickCounter({userId}:{userId?:string}){
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState<number[]>([]);

  useEffect(()=>{
    if(!userId) return;
    let mounted = true;
    const load = async ()=>{
      const { data } = await supabase.from('kick_counts').select('*').eq('user_id', userId).order('created_at',{ascending:false}).limit(1);
      if(!mounted) return;
      if(data?.[0]){
        setCount(data[0].count || 0);
      }
    };
    load();

    const channel = supabase.channel('public:kick_counts').on('postgres_changes', {event:'INSERT', schema:'public', table:'kick_counts', filter:`user_id=eq.${userId}`}, payload=>{
      setCount(payload.new.count || 0);
      setHistory(h=>[...(h || []), Date.now()]);
    }).subscribe();

    return ()=>{ mounted=false; channel.unsubscribe(); };
  },[userId]);

  const addKick = async ()=>{
    if(!userId){ setCount(c=>c+1); setHistory(h=>[...h, Date.now()]); return; }
    // insert a new record for demo purposes; in production group sessions
    await supabase.from('kick_counts').insert([{user_id: userId, count: count + 1, session_started_at: new Date().toISOString()}]);
  };

  const reset = ()=> setCount(0);

  return (
    <div className="p-4 bg-card rounded-lg border">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium">Kick Counter</div>
        <div className="text-xs text-muted-foreground">Session</div>
      </div>
      <div className="text-3xl font-bold text-center my-4">{count}</div>
      <div className="flex gap-2">
        <button onClick={addKick} className="flex-1 py-2 bg-sage text-white rounded">Add Kick</button>
        <button onClick={reset} className="flex-1 py-2 border rounded">Reset</button>
      </div>
      <div className="mt-3 text-xs text-muted-foreground">Today: {history.length} kicks</div>
    </div>
  );
}
