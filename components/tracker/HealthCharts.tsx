'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const mockWeight = [
  {day:'Wk 12', val:52}, {day:'Wk 16', val:54}, {day:'Wk 20', val:57}, {day:'Wk 24', val:60}, {day:'Wk 28', val:64}, {day:'Wk 32', val:68}, {day:'Wk 36', val:72}
];

export default function HealthCharts(){
  return (
    <div className="p-4 bg-card rounded-lg border">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium text-foreground">Mother's Health</div>
        <div className="text-xs text-muted-foreground">Trends</div>
      </div>
      <div style={{width:'100%', height:200}}>
        <ResponsiveContainer>
          <LineChart data={mockWeight}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="val" stroke="#16a34a" strokeWidth={2} dot={{r:3}} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4 text-sm text-muted-foreground">
        <div>Blood Pressure: 110/70</div>
        <div>Blood Sugar: 95 mg/dL</div>
        <div>Sleep: 7.2 hrs</div>
        <div>Water: 2.1 L</div>
      </div>
    </div>
  );
}
