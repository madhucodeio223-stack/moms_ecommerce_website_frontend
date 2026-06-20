'use client';

import React from 'react';

export default function AIInsights({week}:{week:number}){
  return (
    <div className="p-4 bg-card rounded-lg border">
      <div className="text-sm font-medium mb-2">AI Insights</div>
      <div className="text-sm text-muted-foreground">Week {week} summary: Your baby is growing steadily. Recommend increasing iron-rich foods and a 30-minute walk 3x/week.</div>
    </div>
  );
}
