import { Suspense } from 'react';
import { Media as MediaComponent } from '@/pages-src/Media';

export default function Media() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MediaComponent />
    </Suspense>
  );
}