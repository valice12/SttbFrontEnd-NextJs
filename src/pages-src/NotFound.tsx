'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-[#1C64E8] mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Maaf, halaman yang Anda cari tidak tersedia. Silakan kembali ke halaman utama.
        </p>
        <Link href="/">
          <Button className="bg-[#1C64E8] hover:bg-[#75B4F9] text-white">
            <Home className="mr-2 size-5" />
            Kembali ke Beranda
          </Button>
        </Link>
      </div>
    </div>
  );
}


