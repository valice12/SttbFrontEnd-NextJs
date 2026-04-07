'use client';

import { Suspense } from 'react';
import { MonografPage } from '@/pages-src/MonografPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading Monograf...</div>}>
      <MonografPage />
    </Suspense>
  );
}
