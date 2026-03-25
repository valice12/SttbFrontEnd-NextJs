'use client';

import { motion } from 'motion/react';
import { BookOpen, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function MembershipTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-5xl mx-auto border-t-4 border-[#092C74]">
      <h3 className="text-4xl font-extrabold mb-4 text-[#092C74]">Bergabung sebagai Member</h3>
      <p className="text-gray-700 leading-relaxed mb-10 text-xl">
        Perpustakaan STT Bandung tidak hanya mengabdi bagi sivitas akademika internal, namun juga dibuka bagi pelayan Tuhan, hamba Tuhan lintas denominasi, dan masyarakat umum yang rindu untuk belajar dan mendalami teologi secara serius.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div className="bg-[#f8f9fa] p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
            <BookOpen className="size-8 text-[#E31D1A]" />
          </div>
          <h4 className="text-2xl font-extrabold text-gray-900 mb-4">Benefit Member</h4>
          <ul className="space-y-3 text-gray-600 list-disc pl-6 text-lg">
            <li>Akses penuh membaca di ruang baca perpustakaan.</li>
            <li>Fasilitas peminjaman buku fisik (maks 3 buku).</li>
            <li>Akses masuk ke jaringan E-Library STTB.</li>
            <li>Diskon khusus pembelian Jurnal Stulos cetak.</li>
          </ul>
        </div>
        
        <div className="bg-[#092C74] text-white p-8 rounded-2xl relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Users className="w-48 h-48" />
          </div>
          <h4 className="text-2xl font-extrabold mb-4 relative z-10 text-yellow-500">Syarat & Pendaftaran</h4>
          <ul className="space-y-3 text-white/90 list-disc pl-6 mb-8 relative z-10 text-lg">
            <li>Mengisi formulir pendaftaran secara online.</li>
            <li>Melampirkan rekomendasi dari gembala sidang/Gereja.</li>
            <li>Biaya administrasi & kartu: <span className="font-bold underline">Rp 150.000 / tahun</span>.</li>
          </ul>
          <Link href="/pendaftaran-anggota-perpustakaan">
            <Button className="w-full bg-[#E31D1A] hover:bg-[#C11815] font-extrabold text-lg relative z-10 py-6 rounded-full shadow-lg">
              Isi Formulir Pendaftaran
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="bg-orange-50/80 text-orange-900 p-6 rounded-2xl flex gap-4 text-base border border-orange-200">
        <Users className="size-6 shrink-0 mt-1 text-orange-600" />
        <p className="font-medium text-lg leading-relaxed">Setelah mengisi formulir, silakan datang langsung ke Tata Usaha Perpustakaan STTB pada jam kerja (Senin - Jumat, 08:00 - 16:00) untuk pengambilan foto dan pencetakan Kartu Member.</p>
      </div>
    </motion.div>
  );
}
