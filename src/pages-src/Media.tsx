'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Video, FileText, BookOpen, Newspaper, Users, Link as LinkIcon, Download, Search, Globe, ChevronRight, List, ArrowUpDown, SlidersHorizontal, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
const bgHeader = "/assets/sttb-2-BG.png";
const bgPatternPanjang = "/assets/Page-Panjang-1.webp";

// Import sub-components
import { JurnalTab } from '@/components/media/JurnalTab';
import { VideoTab } from '@/components/media/VideoTab';
import { ArtikelTab } from '@/components/media/ArtikelTab';
import { MonografTab } from '@/components/media/MonografTab';
import { BuletinTab } from '@/components/media/BuletinTab';
import { ELibraryTab } from '@/components/media/ELibraryTab';
import { MembershipTab } from '@/components/media/MembershipTab';

import { dataService } from '@/lib/data-service';

// Ditempatkan di luar komponen agar referensi stabil
const tabTitles: Record<string, string> = {
  jurnal: "Jurnal Stulos",
  video: "Video Pembelajaran",
  artikel: "Artikel",
  buletin: "Buletin Kampus",
  elibrary: "E-Library",
  keanggotaan: "Keanggotaan Perpustakaan"
};

export function Media() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const activeTab = (tabParam && tabTitles[tabParam]) ? tabParam : "jurnal";

  const handleTabChange = (value: string) => {
    // Memutus siklus: Jika tab yang diklik sudah aktif, jangan replace URL
    if (value === activeTab) return;
    router.replace(`/media?tab=${value}`);
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center pb-20 bg-white"
      style={{ backgroundImage: `url(${bgPatternPanjang})` }}
    >
      {/* Hero Section */}
      <section className="relative text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-white/80">
        </div>
        <div className="absolute inset-0">
          <img src={bgHeader} alt="Media & Perpustakaan" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#092C74]/80 mix-blend-multiply" />
        </div>
        <div className="relative container mx-auto px-4 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 drop-shadow-[6px_6px_4px_rgba(0,0,0,0.25)]">Media & Perpustakaan</h1>
            <div className="w-full max-w-4xl mx-auto h-1 bg-white rounded-full mb-8 opacity-20" />
            <p className="text-2xl md:text-3xl drop-shadow-[6px_6px_4px_rgba(0,0,0,0.25)]">
              Akses ke berbagai sumber belajar, publikasi ilmiah, dan layanan perpustakaan
            </p>
          </motion.div>
        </div>
      </section>

      {/* Media Quick Links Section */}
      <section className="bg-white border-b border-gray-200 py-8 relative z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/berita" className="flex items-center gap-2 px-6 py-3 bg-[#f8f9fa] hover:bg-[#F2ECF8] hover:text-[#092C74] border border-gray-200 hover:border-[#092C74] rounded-full transition-all font-semibold text-gray-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 border border-transparent">
              <Newspaper className="size-5 text-[#E31D1A]" /> Berita Terkini
            </Link>
            <button onClick={() => handleTabChange('jurnal')} className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 border ${
              activeTab === 'jurnal' ? 'bg-[#092C74] text-white border-[#092C74] ring-2 ring-offset-2 ring-[#092C74] bg-opacity-100' : 'bg-[#f8f9fa] hover:bg-[#F2ECF8] hover:text-[#092C74] border-gray-200 text-gray-700 hover:border-[#092C74]'
            }`}>
              <FileText className={`size-5 ${activeTab === 'jurnal' ? 'text-white' : 'text-[#E31D1A]'}`} /> Jurnal Stulos
            </button>
            <button onClick={() => handleTabChange('video')} className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 border ${
              activeTab === 'video' ? 'bg-[#092C74] text-white border-[#092C74] ring-2 ring-offset-2 ring-[#092C74] bg-opacity-100' : 'bg-[#f8f9fa] hover:bg-[#F2ECF8] hover:text-[#092C74] border-gray-200 text-gray-700 hover:border-[#092C74]'
            }`}>
              <Video className={`size-5 ${activeTab === 'video' ? 'text-white' : 'text-[#E31D1A]'}`} /> Video Pembelajaran
            </button>
            <button onClick={() => handleTabChange('artikel')} className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 border ${
              activeTab === 'artikel' ? 'bg-[#092C74] text-white border-[#092C74] ring-2 ring-offset-2 ring-[#092C74] bg-opacity-100' : 'bg-[#f8f9fa] hover:bg-[#F2ECF8] hover:text-[#092C74] border-gray-200 text-gray-700 hover:border-[#092C74]'
            }`}>
              <Newspaper className={`size-5 ${activeTab === 'artikel' ? 'text-white' : 'text-[#E31D1A]'}`} /> Artikel
            </button>
            <button onClick={() => handleTabChange('monograf')} className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 border ${
              activeTab === 'monograf' ? 'bg-[#092C74] text-white border-[#092C74] ring-2 ring-offset-2 ring-[#092C74] bg-opacity-100' : 'bg-[#f8f9fa] hover:bg-[#F2ECF8] hover:text-[#092C74] border-gray-200 text-gray-700 hover:border-[#092C74]'
            }`}>
              <FileText className={`size-5 ${activeTab === 'monograf' ? 'text-white' : 'text-[#E31D1A]'}`} /> Monograf
            </button>
            <button onClick={() => handleTabChange('buletin')} className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 border ${
              activeTab === 'buletin' ? 'bg-[#092C74] text-white border-[#092C74] ring-2 ring-offset-2 ring-[#092C74] bg-opacity-100' : 'bg-[#f8f9fa] hover:bg-[#F2ECF8] hover:text-[#092C74] border-gray-200 text-gray-700 hover:border-[#092C74]'
            }`}>
              <Newspaper className={`size-5 ${activeTab === 'buletin' ? 'text-white' : 'text-[#E31D1A]'}`} /> Buletin Kampus
            </button>
            <button onClick={() => handleTabChange('elibrary')} className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 border ${
              activeTab === 'elibrary' ? 'bg-[#092C74] text-white border-[#092C74] ring-2 ring-offset-2 ring-[#092C74] bg-opacity-100' : 'bg-[#f8f9fa] hover:bg-[#F2ECF8] hover:text-[#092C74] border-gray-200 text-gray-700 hover:border-[#092C74]'
            }`}>
              <BookOpen className={`size-5 ${activeTab === 'elibrary' ? 'text-white' : 'text-[#E31D1A]'}`} /> E-Library
            </button>
            <button onClick={() => handleTabChange('keanggotaan')} className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 border ${
              activeTab === 'keanggotaan' ? 'bg-[#092C74] text-white border-[#092C74] ring-2 ring-offset-2 ring-[#092C74] bg-opacity-100' : 'bg-[#f8f9fa] hover:bg-[#F2ECF8] hover:text-[#092C74] border-gray-200 text-gray-700 hover:border-[#092C74]'
            }`}>
              <Users className={`size-5 ${activeTab === 'keanggotaan' ? 'text-white' : 'text-[#E31D1A]'}`} /> Keanggotaan Umum
            </button>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {activeTab === 'jurnal' && <JurnalTab />}
          {activeTab === 'video' && <VideoTab />}
          {activeTab === 'artikel' && <ArtikelTab />}
          {activeTab === 'monograf' && <MonografTab />}
          {activeTab === 'buletin' && <BuletinTab />}
          {activeTab === 'elibrary' && <ELibraryTab />}
          {activeTab === 'keanggotaan' && <MembershipTab />}
        </div>
      </section>
    </div>
  );
}


