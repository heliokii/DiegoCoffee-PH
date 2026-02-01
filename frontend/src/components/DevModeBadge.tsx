import React from 'react';

export default function DevModeBadge() {
  return (
    <div
      className='fixed bottom-4 right-4 z-50 rounded px-2 py-1 text-xs font-medium bg-yellow-400/90 text-black shadow'
      aria-hidden
    >
      Dev
    </div>
  );
}
