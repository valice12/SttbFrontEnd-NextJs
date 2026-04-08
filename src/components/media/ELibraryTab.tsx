'use client';

import { motion } from 'motion/react';
import { BookOpen, Link as LinkIcon, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function ELibraryTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 max-w-5xl mx-auto">
      {/* E-Library Section */}
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border-t-4 border-[#092C74]">
        <h3 className="text-4xl font-extrabold mb-4 text-[#092C74]">E-Library STTB</h3>
        <p className="text-gray-700 leading-relaxed mb-8 text-xl">
          Perpustakaan Digital STTB menyediakan ribuan koleksi e-book, jurnal internasional, dan tesis yang dapat diakses oleh seluruh sivitas akademika maupun anggota perpustakaan yang telah terdaftar.
        </p>

        <div className="bg-[#F2ECF8] p-8 rounded-2xl border-l-8 border-[#E31D1A] mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h4 className="font-extrabold text-2xl text-[#092C74] mb-2">Akses Portal E-Library STTB</h4>
            <p className="text-gray-700 text-lg">Kunjungi perpustakaan digital resmi STTB untuk mengakses seluruh katalog, jurnal, e-book, dan fasilitas lainnya.</p>
          </div>
          <a href="https://library.sttb.ac.id/" target="_blank" rel="noopener noreferrer" className="shrink-0 w-full md:w-auto">
            <Button className="w-full bg-[#E31D1A] hover:bg-[#C11815] px-10 py-6 text-lg font-bold shadow-md hover:shadow-lg transition-all rounded-full">
              Akses E-Library <LinkIcon className="ml-2 size-5" />
            </Button>
          </a>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 text-center pt-8 border-t border-gray-100">
          <div className="p-6 bg-blue-50/50 rounded-2xl hover:bg-blue-50 transition-colors">
            <div className="size-20 mx-auto bg-blue-100 text-[#092C74] rounded-full flex items-center justify-center mb-6 font-extrabold text-3xl">15k<span className="text-xl">+</span></div>
            <h5 className="font-extrabold text-xl mb-2 text-gray-900">E-Books</h5>
            <p className="text-gray-500">Berbagai kategori teologi</p>
          </div>
          <div className="p-6 bg-red-50/50 rounded-2xl hover:bg-red-50 transition-colors">
            <div className="size-20 mx-auto bg-red-100 text-[#E31D1A] rounded-full flex items-center justify-center mb-6 font-extrabold text-3xl">5k<span className="text-xl">+</span></div>
            <h5 className="font-extrabold text-xl mb-2 text-gray-900">Jurnal Akademik</h5>
            <p className="text-gray-500">Termasuk EBSCO & ProQuest</p>
          </div>
          <div className="p-6 bg-indigo-50/50 rounded-2xl hover:bg-indigo-50 transition-colors">
            <div className="size-20 mx-auto bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center mb-6 font-extrabold text-3xl">2k<span className="text-xl">+</span></div>
            <h5 className="font-extrabold text-xl mb-2 text-gray-900">Tesis & Skripsi</h5>
            <p className="text-gray-500">Karya ilmiah alumni STTB</p>
          </div>
        </div>
      </div>

      {/* Membership Section */}
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border-t-4 border-[#092C74]">
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
      </div>
    </motion.div>
  );
}
