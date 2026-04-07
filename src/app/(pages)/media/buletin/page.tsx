'use client';

import { Suspense } from 'react';
import { BuletinPage } from '@/pages-src/BuletinPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading Buletin...</div>}>
      <BuletinPage />
    </Suspense>
  );
}
