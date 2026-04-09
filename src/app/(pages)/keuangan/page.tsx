import { Suspense } from 'react';
import { Keuangan as KeuanganComponent } from '@/components/features/keuangan/Keuangan';

export default function Keuangan() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <KeuanganComponent />
    </Suspense>
  );
}