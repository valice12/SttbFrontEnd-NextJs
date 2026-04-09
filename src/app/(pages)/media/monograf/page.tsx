'use client';

import { Suspense } from 'react';
import { MonografPage } from '@/components/features/media/monograf/MonografPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading Monograf...</div>}>
      <MonografPage />
    </Suspense>
  );
}
