'use client';

import React from 'react';

export default function NutritionDashboard(){
  return (
    <div className="p-4 bg-card rounded-lg border">
      <div className="text-sm font-medium mb-2">Nutrition</div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>Calories: <strong>1800/2200</strong></div>
        <div>Protein: <strong>65g/75g</strong></div>
        <div>Iron: <strong>18mg/27mg</strong></div>
        <div>Calcium: <strong>900mg/1000mg</strong></div>
      </div>
      <div className="mt-3 text-xs text-muted-foreground">Daily progress and recommendations will appear here.</div>
    </div>
  );
}
