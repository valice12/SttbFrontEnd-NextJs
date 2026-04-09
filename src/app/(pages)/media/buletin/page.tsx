'use client';

import { Suspense } from 'react';
import { BuletinPage } from '@/components/features/media/buletin/BuletinPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading Buletin...</div>}>
      <BuletinPage />
    </Suspense>
  );
}
