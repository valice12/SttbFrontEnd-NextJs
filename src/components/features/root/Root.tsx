'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingActionButton } from '@/components/common/FloatingActionButton';
import { useEffect } from 'react';

export function Root() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top on route change (hash handled via window.location)
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      // Scroll to hash element
      setTimeout(() => {
        const element = document.getElementById(hash.slice(1));
        if (element) {
          const offset = 150; // Account for fixed navbar height
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-[132px]">
        {/* Note: In Next.js App Router, children are passed via RootLayout */}
      </main>
      <Footer />
      <FloatingActionButton />
    </div>
  );
}

