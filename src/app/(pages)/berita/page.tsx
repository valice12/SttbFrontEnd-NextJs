import { Suspense } from 'react';
import { Berita as BeritaComponent } from '@/pages-src/Berita';

export default function BeritaPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BeritaComponent />
    </Suspense>
  );
}