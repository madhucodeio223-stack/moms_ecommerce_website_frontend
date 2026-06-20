'use client';

import React, {useState, useRef} from 'react';

export default function ContractionTimer(){
  const [running, setRunning] = useState(false);
  const [startAt, setStartAt] = useState<number | null>(null);
  const [lastDuration, setLastDuration] = useState<number | null>(null);
  const [history, setHistory] = useState<{start:number,end:number}[]>([]);
  const timerRef = useRef<number | null>(null);

  const start = ()=>{
    setRunning(true);
    setStartAt(Date.now());
  };
  const stop = ()=>{
    if(!startAt) return;
    const end = Date.now();
    const dur = Math.round((end - startAt)/1000);
    setLastDuration(dur);
    setHistory(h=>[{start:startAt,end},...h]);
    setStartAt(null);
    setRunning(false);
  };

  return (
    <div className="p-4 bg-card rounded-lg border">
      <div className="text-sm font-medium mb-2">Contraction Timer</div>
      <div className="text-center my-4">
        <div className="text-lg">{running ? 'Timing…' : (lastDuration ? `${lastDuration}s last` : '—')}</div>
      </div>
      <div className="flex gap-2">
        <button onClick={start} className="flex-1 py-2 bg-sage text-white rounded" disabled={running}>Start</button>
        <button onClick={stop} className="flex-1 py-2 border rounded" disabled={!running}>Stop</button>
      </div>
      <div className="mt-3 text-xs text-muted-foreground">Sessions: {history.length}</div>
    </div>
  );
}
