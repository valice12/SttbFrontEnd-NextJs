'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';
import { Video, FileText, BookOpen, Newspaper, Layers } from 'lucide-react';

// Import sub-components
import { JurnalTab } from '@/components/features/media/jurnal/JurnalTab';
import { VideoTab } from '@/components/features/media/shared/VideoTab';
import { ArtikelTab } from '@/components/features/media/artikel/ArtikelTab';
import { MonografTab } from '@/components/features/media/monograf/MonografTab';
import { BuletinTab } from '@/components/features/media/buletin/BuletinTab';
import { ELibraryTab } from '@/components/features/media/shared/ELibraryTab';
import { MediaNavbar } from '@/components/features/media/shared/MediaNavbar';

const bgHeader = "/assets/sttb-2-BG.png";
const bgPattern = "/assets/Page-Panjang-1.webp";

const tabTitles: Record<string, string> = {
  jurnal: "Jurnal Stulos",
  video: "Video",
  artikel: "Artikel",
  monograf: "Monograf",
  buletin: "Buletin",
  elibrary: "Digital Library"
};

const heroTitles: Record<string, { top: string, bottom: string, grad: string, bg: string }> = {
  jurnal: { 
    top: "Arsip Jurnal", 
    bottom: "STULOS", 
    grad: "text-transparent bg-clip-text bg-gradient-to-r from-[#6AACE6] via-[#A855F7] to-[#E31D1A]",
    bg: "from-[#061B46]/95 via-[#1E1B4B]/45"
  },
  video: { 
    top: "Video &", 
    bottom: "Pembelajaran", 
    grad: "text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#F97316] to-[#E31D1A]",
    bg: "from-[#7F1D1D]/95 via-[#450A0A]/45"
  },
  artikel: { 
    top: "Artikel", 
    bottom: "Wawasan", 
    grad: "text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] via-[#C084FC] to-[#E0E7FF]",
    bg: "from-[#1E1B4B]/95 via-[#701A75]/45"
  },
  monograf: { 
    top: "Monograf &", 
    bottom: "Buku Referensi", 
    grad: "text-transparent bg-clip-text bg-gradient-to-r from-[#6AACE6] via-[#A855F7] to-[#E31D1A]",
    bg: "from-[#14532D]/95 via-[#1E1B4B]/45"
  },
  buletin: { 
    top: "Buletin", 
    bottom: "Resmi Kampus", 
    grad: "text-transparent bg-clip-text bg-gradient-to-r from-[#6AACE6] via-[#10B981] to-[#34D399]",
    bg: "from-[#134E4A]/95 via-[#064E3B]/45"
  },
  elibrary: { 
    top: "Digital", 
    bottom: "Library Hub", 
    grad: "text-transparent bg-clip-text bg-gradient-to-r from-[#6AACE6] via-[#A855F7] to-[#E31D1A]",
    bg: "from-[#082F49]/95 via-[#075985]/45"
  }
};

const tabHeaders: Record<string, { icon: any, title: string, subtitle: string, color: string, heroColor: string }> = {
  jurnal: { 
    icon: FileText, 
    title: "Arsip Jurnal Stulos", 
    subtitle: "Publikasi Ilmiah & Teologi bereputasi STTB",
    color: "bg-[#092C74]/10 text-[#092C74]",
    heroColor: "bg-[#092C74]/80"
  },
  video: { 
    icon: Video, 
    title: "Video Pembelajaran", 
    subtitle: "Dokumentasi Khotbah, Seminar & Ibadah Raya",
    color: "bg-[#E31D1A]/10 text-[#E31D1A]",
    heroColor: "bg-[#E31D1A]/80"
  },
  artikel: { 
    icon: Newspaper, 
    title: "Artikel & Wawasan", 
    subtitle: "Refleksi Kristiani & Analisis Isu Kontemporer",
    color: "bg-[#4B0082]/10 text-[#4B0082]",
    heroColor: "bg-[#4B0082]/80"
  },
  elibrary: { 
    icon: BookOpen, 
    title: "E-Library STTB", 
    subtitle: "Portal Literasi Digital & Keanggotaan Member",
    color: "bg-[#092C74]/10 text-[#092C74]",
    heroColor: "bg-[#092C74]/80"
  }
};

export function Media() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const activeTab = (tabParam && tabTitles[tabParam]) ? tabParam : "jurnal";

  const currentHero = heroTitles[activeTab] || { 
    top: "Media &", 
    bottom: "Perpustakaan", 
    grad: "text-transparent bg-clip-text bg-gradient-to-r from-[#6AACE6] via-[#A855F7] to-[#E31D1A]",
    bg: "from-[#061B46]/95 via-[#4B0082]/45"
  };

  return (
    <div 
      className="min-h-screen bg-white bg-cover bg-center"
      style={{ backgroundImage: `url(${bgPattern})` }}
    >
      {/* Premium Hero Section - Dynamic Content */}
      <section className="relative h-[550px] md:h-[650px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={bgHeader} alt="Media & Library" className="w-full h-full object-cover scale-105" />
          <div className={`absolute inset-0 bg-gradient-to-br ${currentHero.bg} to-transparent z-10 transition-colors duration-1000`} />
          
          <div className="absolute top-1/2 -right-20 size-[500px] bg-[#E31D1A]/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-0 -left-20 size-[400px] bg-[#092C74]/40 blur-[100px] rounded-full" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center z-20">
          <div className="max-w-4xl">
            <motion.div
              key={activeTab} // Re-animate on tab change
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="backdrop-blur-md bg-white/5 border border-white/10 p-10 md:p-14 lg:p-16 rounded-[40px] shadow-2xl relative overflow-hidden group"
            >
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E31D1A] rounded-full text-white text-xs font-black uppercase tracking-widest mb-8 shadow-lg shadow-red-500/30"
                >
                   <Layers className="size-3" /> Digital Knowledge Hub
                </motion.div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 drop-shadow-2xl tracking-tighter leading-[0.95]">
                  {currentHero.top} <br />
                  <span className={currentHero.grad}>
                    {currentHero.bottom}
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl leading-relaxed">
                  Akses repositori pengetahuan teologi terlengkap, publikasi ilmiah terbaru, serta sistem perpustakaan digital terintegrasi STT Bandung.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Synchronized Media Navbar */}
      <MediaNavbar activeTab={activeTab} />
      
      {/* Content Section - Tightened spacing for better rhythm */}
      <section className="pt-6 lg:pt-10 pb-10 lg:pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === 'jurnal' && <JurnalTab />}
            {activeTab === 'video' && <VideoTab />}
            {activeTab === 'artikel' && <ArtikelTab />}
            {activeTab === 'monograf' && <MonografTab />}
            {activeTab === 'buletin' && <BuletinTab />}
            {activeTab === 'elibrary' && <ELibraryTab />}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
