'use client';

import React from 'react';

export default function Timeline({currentWeek}:{currentWeek:number}){
  const weeks = Array.from({length:40},(_,i)=>i+1);
  return (
    <div className="p-4 bg-card rounded-lg border">
      <div className="text-sm text-muted-foreground mb-2">Baby Development Timeline</div>
      <div className="flex overflow-x-auto gap-3 py-2">
        {weeks.map(w => (
          <div key={w} className={`min-w-[80px] p-3 rounded-lg ${w===currentWeek? 'bg-sage/10 border-sage':'bg-muted/30'} border`}> 
            <div className="text-sm font-semibold">Wk {w}</div>
            <div className="text-xs text-muted-foreground">{w===currentWeek? 'Now' : ''}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
