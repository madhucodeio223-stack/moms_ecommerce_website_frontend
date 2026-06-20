'use client';

import React, {useState, useEffect} from 'react';
import supabase from '@/lib/supabaseClient';

export default function SymptomTracker({userId}:{userId?:string}){
  const [symptoms, setSymptoms] = useState<{name:string,checked:boolean}[]>([
    {name:'Nausea',checked:false},{name:'Fatigue',checked:false},{name:'Headache',checked:false},{name:'Mood Changes',checked:false},{name:'Swelling',checked:false},{name:'Back Pain',checked:false}
  ]);

  useEffect(()=>{
    // load recent symptom state from supabase (non-blocking)
    if(!userId) return;
    let mounted = true;
    const load = async ()=>{
      const res = await supabase.from('symptom_logs').select('*').order('created_at',{ascending:false}).limit(1).eq('user_id', userId);
      if(!mounted) return;
      if(res.data?.[0]){
        const row = res.data[0];
        try{
          const map = JSON.parse(row.symptoms || '[]');
          setSymptoms((prev)=>prev.map(s=>({...s,checked: map.includes(s.name)})));
        }catch(e){}
      }
    };
    load();

    // subscribe to new symptom logs for this user
    const channel = supabase.channel('public:symptom_logs').on('postgres_changes', {event:'INSERT', schema:'public', table:'symptom_logs', filter:`user_id=eq.${userId}`}, (payload)=>{
      try{
        const map = JSON.parse(payload.new.symptoms || '[]');
        setSymptoms((prev)=>prev.map(s=>({...s,checked: map.includes(s.name)})));
      }catch(e){}
    }).subscribe();

    return ()=>{ mounted = false; channel.unsubscribe(); };
  },[userId]);

  const toggle = async (i:number)=>{
    const next = [...symptoms]; next[i].checked = !next[i].checked; setSymptoms(next);
    if(!userId) return;
    const names = next.filter(s=>s.checked).map(s=>s.name);
    await supabase.from('symptom_logs').insert([{user_id:userId, symptoms: JSON.stringify(names)}]);
  };

  return (
    <div className="p-4 bg-card rounded-lg border">
      <div className="text-sm font-medium mb-2">Symptom Tracker</div>
      <div className="grid grid-cols-2 gap-2">
        {symptoms.map((s,i)=> (
          <button key={s.name} onClick={()=>toggle(i)} className={`p-3 rounded-lg border ${s.checked? 'bg-sage/10 border-sage text-sage':'bg-muted'}`}>
            {s.name}
          </button>
        ))}
      </div>
    </div>
  );
}
