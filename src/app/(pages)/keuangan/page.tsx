import { Suspense } from 'react';
import { Keuangan as KeuanganComponent } from '@/pages-src/Keuangan';

export default function Keuangan() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <KeuanganComponent />
    </Suspense>
  );
}