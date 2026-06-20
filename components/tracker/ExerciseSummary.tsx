'use client';

import React from 'react';

export default function ExerciseSummary(){
  return (
    <div className="p-4 bg-card rounded-lg border">
      <div className="text-sm font-medium mb-2">Exercise</div>
      <div className="text-sm text-muted-foreground">This week: Walking 3x, Yoga 2x, Meditation 5x</div>
      <div className="mt-3 text-xs text-muted-foreground">Tap to log new activity.</div>
    </div>
  );
}
