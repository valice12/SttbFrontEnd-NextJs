import { Suspense } from 'react';
import { Admisi } from '@/components/features/admisi/Admisi';

export default function AdmisiPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Admisi />
    </Suspense>
  );
}