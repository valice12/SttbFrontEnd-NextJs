'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Video, FileText, BookOpen, Newspaper, Users, Link as LinkIcon, Download, Search, Globe, ChevronRight, List, ArrowUpDown, SlidersHorizontal, Calendar as CalendarIcon, Layers } from 'lucide-react';
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
import { ELibraryTab } from '@/components/media/ELibraryTab';
import { MembershipTab } from '@/components/media/MembershipTab';

import { dataService } from '@/lib/data-service';

// Ditempatkan di luar komponen agar referensi stabil
const tabTitles: Record<string, string> = {
  jurnal: "Jurnal Stulos",
  video: "Video Pembelajaran",
  artikel: "Artikel",
  monograf: "Monograf",
  buletin: "Buletin Kampus",
  elibrary: "E-Library",
  keanggotaan: "Keanggotaan Perpustakaan"
};

const tabHeaders: Record<string, { icon: any, title: string, subtitle: string, color: string, heroColor: string }> = {
  jurnal: { 
    icon: FileText, 
    title: "Arsip Jurnal", 
    subtitle: "Koleksi Publikasi Ilmiah & Teologi STTB",
    color: "bg-[#092C74]/5 text-[#092C74]",
    heroColor: "bg-[#092C74]/80"
  },
  video: { 
    icon: Video, 
    title: "Galeri Video", 
    subtitle: "Dokumentasi Kuliah, Seminar & Ibadah",
    color: "bg-[#4F46E5]/10 text-[#4F46E5]",
    heroColor: "bg-[#4338CA]/80"
  },
  artikel: { 
    icon: Newspaper, 
    title: "Kumpulan Artikel", 
    subtitle: "Wawasan Teologi & Refleksi Kristiani",
    color: "bg-[#334155]/10 text-[#334155]",
    heroColor: "bg-[#334155]/80"
  },
  elibrary: { 
    icon: BookOpen, 
    title: "Perpustakaan Digital", 
    subtitle: "Akses Literatur & Sumber Belajar Elektronik",
    color: "bg-[#D97706]/10 text-[#D97706]",
    heroColor: "bg-[#B45309]/80"
  },
  keanggotaan: { 
    icon: Users, 
    title: "Layanan Anggota", 
    subtitle: "Fasilitas & Keanggotaan Perpustakaan Umum",
    color: "bg-[#7F1D1B]/5 text-[#7F1D1B]",
    heroColor: "bg-[#7F1D1B]/80"
  }
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
      <section className="relative text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-white/80">
        </div>
        <div className="absolute inset-0">
          <img src={bgHeader} alt="Media & Perpustakaan" className="w-full h-full object-cover" />
          <div className={`absolute inset-0 transition-colors duration-500 mix-blend-multiply ${tabHeaders[activeTab]?.heroColor || 'bg-[#092C74]/80'}`} />
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
            <Link href="/media/monograf" className="flex items-center gap-2 px-6 py-3 bg-[#f8f9fa] hover:bg-[#F2ECF8] hover:text-[#092C74] border border-gray-200 hover:border-[#092C74] rounded-full transition-all font-semibold text-gray-700 shadow-sm hover:shadow-md hover:-translate-y-0.5">
              <FileText className="size-5 text-[#E31D1A]" /> Monograf
            </Link>
            <Link href="/media/buletin" className="flex items-center gap-2 px-6 py-3 bg-[#f8f9fa] hover:bg-[#F2ECF8] hover:text-[#092C74] border border-gray-100 hover:border-[#092C74] rounded-full transition-all font-semibold text-gray-700 shadow-sm hover:shadow-md hover:-translate-y-0.5">
              <Newspaper className="size-5 text-[#E31D1A]" /> Buletin Kampus
            </Link>
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
          {/* Dynamic Tab Header */}
          {tabHeaders[activeTab] && (
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
              <div className="flex items-center gap-4">
                <div className={`size-14 rounded-2xl flex items-center justify-center ${tabHeaders[activeTab].color}`}>
                  {(() => {
                    const Icon = tabHeaders[activeTab].icon;
                    return <Icon className="size-7" />;
                  })()}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-[#092C74]">{tabHeaders[activeTab].title}</h2>
                  <p className="text-sm text-gray-400 font-bold uppercase tracking-tighter">{tabHeaders[activeTab].subtitle}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'jurnal' && <JurnalTab />}
          {activeTab === 'video' && <VideoTab />}
          {activeTab === 'artikel' && <ArtikelTab />}
          {activeTab === 'elibrary' && <ELibraryTab />}
          {activeTab === 'keanggotaan' && <MembershipTab />}
        </div>
      </section>
    </div>
  );
}


