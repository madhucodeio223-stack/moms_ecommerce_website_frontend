'use client';

import React, {useState} from 'react';

export default function JournalAndPhotos(){
  const [notes, setNotes] = useState('');
  return (
    <div className="p-4 bg-card rounded-lg border">
      <div className="text-sm font-medium mb-2">Journal</div>
      <textarea value={notes} onChange={(e)=>setNotes(e.target.value)} className="w-full rounded border p-2" placeholder="Write a note or memory..." />
      <div className="mt-2 flex gap-2">
        <button className="py-2 px-4 bg-sage text-white rounded">Save</button>
        <button className="py-2 px-4 border rounded">Add Photo</button>
      </div>
    </div>
  );
}
