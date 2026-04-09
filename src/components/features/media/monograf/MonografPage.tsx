'use client';

import { motion } from 'motion/react';
import { Layers, Search, SlidersHorizontal, BookOpen, Newspaper, FileText, Video, Users, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MonografTab } from '@/components/features/media/monograf/MonografTab';
import { MediaNavbar } from '@/components/features/media/shared/MediaNavbar';

const bgHeader = "/assets/sttb-2-BG.png";
const bgPattern = "/assets/Page-Panjang-1.webp";

export function MonografPage() {
  return (
    <div 
      className="min-h-screen bg-white bg-cover bg-center"
      style={{ backgroundImage: `url(${bgPattern})` }}
    >
      {/* Premium Hero Section - Monograf */}
      <section className="relative h-[650px] md:h-[650px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={bgHeader} alt="Monograf Akademik" className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#14532D]/95 via-[#1E1B4B]/45 to-transparent z-10" />
          
          <div className="absolute top-1/2 -right-20 size-[500px] bg-[#E31D1A]/10 blur-[120px] rounded-full animate-pulse" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center z-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="backdrop-blur-md bg-white/5 border border-white/10 p-10 md:p-14 rounded-[40px] shadow-2xl relative overflow-hidden group"
            >
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E31D1A] rounded-full text-white text-xs font-black uppercase tracking-widest mb-8 shadow-lg shadow-red-500/30"
                >
                   <Layers className="size-3" /> Academic Library
                </motion.div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[1.1] tracking-tighter drop-shadow-2xl">
                  Monograf <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6AACE6] via-[#A855F7] to-[#E31D1A]">& Buku Referensi</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl leading-relaxed">
                  Eksplorasi koleksi publikasi monograf, buku ajar, dan referensi akademik mendalam hasil riset teologi STT Bandung.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Synchronized Media Navbar */}
      <MediaNavbar activeTab="monograf" />

      {/* Content Section - Tightened gap */}
      <section className="pt-8 lg:pt-16 pb-12 lg:pb-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <MonografTab />
        </div>
      </section>

      {/* Footer Info - Tightened gap */}
      <section className="container mx-auto px-4 mt-10 lg:mt-20 pb-20 lg:pb-32">
        <div className="bg-gradient-to-br from-[#092C74] to-[#003049] rounded-[4rem] p-12 md:p-20 text-white flex flex-col md:flex-row items-center gap-16 overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <BookOpen className="size-96" />
          </div>
          <div className="flex-1 relative z-10 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-white text-[10px] font-black uppercase tracking-widest border border-white/10 backdrop-blur-md">
               <Layers className="size-3 text-[#E31D1A]" /> Call for Publication
            </div>
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">Ingin Publikasi Monograf?</h3>
            <p className="text-white/70 text-xl leading-relaxed max-w-xl font-medium italic">
              "Kami menyediakan *platform* bagi dosen & peneliti STTB untuk mempublikasikan riset dalam bentuk buku referensi resmi."
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <Button className="h-20 px-12 bg-[#E31D1A] hover:bg-white hover:text-[#092C74] text-white rounded-2xl font-black transition-all duration-500 shadow-2xl shadow-red-500/20 uppercase tracking-widest">
                 PANDUAN PENULISAN <ChevronRight className="ml-2 size-5" />
              </Button>
              <Button variant="outline" className="h-20 px-12 border-white/20 hover:bg-white/10 text-white rounded-2xl font-black transition-all uppercase tracking-widest">
                 HUBUNGI REDAKSI
              </Button>
            </div>
          </div>
          <div className="hidden lg:block w-1/3 aspect-square bg-white/5 rounded-[3rem] border border-white/10 flex items-center justify-center p-12 backdrop-blur-md rotate-3 hover:rotate-0 transition-transform duration-1000">
             <Layers className="size-48 text-[#E31D1A] opacity-80" />
          </div>
        </div>
      </section>
    </div>
  );
}
