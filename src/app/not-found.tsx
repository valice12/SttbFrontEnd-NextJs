import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
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
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#1C64E8] hover:bg-[#75B4F9] text-white px-6 py-3 rounded-md font-medium transition-colors"
        >
          <Home className="size-5" />
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
