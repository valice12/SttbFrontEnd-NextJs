'use client';

import { motion } from 'motion/react';
import { BookOpen, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ELibraryTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-5xl mx-auto border-t-4 border-[#092C74]">
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
    </motion.div>
  );
}
