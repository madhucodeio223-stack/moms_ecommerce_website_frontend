'use client';

import React from 'react';

export default function SummaryCards({week, babySize, nextAppointment, waterIntake, steps}:{week:number,babySize:string,nextAppointment?:string,waterIntake:number,steps:number}){
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="p-4 bg-card rounded-lg border text-center">
        <div className="text-xs text-muted-foreground">Current Week</div>
        <div className="text-2xl font-bold">{week}</div>
      </div>
      <div className="p-4 bg-card rounded-lg border text-center">
        <div className="text-xs text-muted-foreground">Baby Size</div>
        <div className="text-2xl font-bold">{babySize}</div>
      </div>
      <div className="p-4 bg-card rounded-lg border text-center">
        <div className="text-xs text-muted-foreground">Next Appointment</div>
        <div className="text-sm">{nextAppointment ?? '—'}</div>
      </div>
      <div className="p-4 bg-card rounded-lg border text-center">
        <div className="text-xs text-muted-foreground">Water Today</div>
        <div className="text-2xl font-bold">{waterIntake}L</div>
      </div>
      <div className="p-4 bg-card rounded-lg border text-center">
        <div className="text-xs text-muted-foreground">Steps</div>
        <div className="text-2xl font-bold">{steps}</div>
      </div>
    </div>
  );
}
