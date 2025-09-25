'use client';

import dynamic from 'next/dynamic';
const Map = dynamic(() => import('../components/map'), { ssr: false });

export default function Home() {
  return (
    <main style={{ height: '100vh', width: '100%' }}>
      <Map />
    </main>
  );
}