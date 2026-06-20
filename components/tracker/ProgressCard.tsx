'use client';

import React from 'react';

export default function ProgressCard({week, dueDate, completedPercent}:{week:number,dueDate:string,completedPercent:number}){
  const daysRemaining = Math.max(0, Math.round((new Date(dueDate).getTime() - Date.now())/(1000*60*60*24)));
  return (
    <div className="p-6 bg-card rounded-2xl border">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-sm text-muted-foreground">Week</div>
          <div className="text-2xl font-bold">{week}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Due Date</div>
          <div className="text-sm font-medium">{new Date(dueDate).toLocaleDateString()}</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-sage rounded-full" style={{width:`${completedPercent}%`}} />
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
          <div>{completedPercent}% Complete</div>
          <div>{daysRemaining} days remaining</div>
        </div>
      </div>
    </div>
  );
}
