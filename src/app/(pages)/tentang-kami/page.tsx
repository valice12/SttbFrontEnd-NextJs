import { Suspense } from 'react';
import { TentangKami as TentangKamiComponent } from '@/pages-src/TentangKami';

export default function TentangKami() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TentangKamiComponent />
    </Suspense>
  );
}