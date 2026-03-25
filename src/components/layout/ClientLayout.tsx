'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingActionButton } from '../FloatingActionButton';
import { Toaster } from '../ui/sonner';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top on route change (hash handled separately)
    const hash = window.location.hash;
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      setTimeout(() => {
        const element = document.getElementById(hash.slice(1));
        if (element) {
          const offset = 150;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth',
          });
        }
      }, 100);
    }
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-[132px]">{children}</main>
      <Footer />
      <FloatingActionButton />
      <Toaster position="top-center" richColors />
    </div>
  );
}
