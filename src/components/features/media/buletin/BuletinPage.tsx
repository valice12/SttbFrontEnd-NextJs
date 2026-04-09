'use client';

import { motion } from 'motion/react';
import { Newspaper, Mail, ExternalLink, FileText, Video, BookOpen, Layers, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BuletinTab } from '@/components/features/media/buletin/BuletinTab';
import { MediaNavbar } from '@/components/features/media/shared/MediaNavbar';

const bgHeader = "/assets/sttb-2-BG.png";
const bgPattern = "/assets/Page-Panjang-1.webp";

export function BuletinPage() {
  return (
    <div 
      className="min-h-screen bg-white bg-cover bg-center"
      style={{ backgroundImage: `url(${bgPattern})` }}
    >
      {/* Premium Hero Section - Buletin */}
      <section className="relative h-[650px] md:h-[650px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={bgHeader} alt="Buletin Kampus" className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#134E4A]/95 via-[#064E3B]/45 to-transparent z-10" />
          
          <div className="absolute top-1/2 -right-20 size-[500px] bg-[#064E3B]/10 blur-[120px] rounded-full animate-pulse" />
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
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#064E3B] rounded-full text-white text-xs font-black uppercase tracking-widest mb-8 shadow-lg shadow-green-500/30"
                >
                   <Newspaper className="size-3" /> Campus Periodical
                </motion.div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[1.1] tracking-tighter drop-shadow-2xl">
                  Buletin <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6AACE6] via-[#10B981] to-[#34D399]">Resmi Kampus</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl leading-relaxed">
                  Informasi terkini mengenai kegiatan mahasiswa, inspirasi rohani, dan perkembangan ekosistem akademika Sekolah Tinggi Teologi Bandung.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Synchronized Media Navbar */}
      <MediaNavbar activeTab="buletin" />

      {/* Content Section - Tightened gap */}
      <section className="pt-8 lg:pt-16 pb-12 lg:pb-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <BuletinTab />
        </div>
      </section>

      {/* Subscription CTA - Tightened gap */}
      <section className="container mx-auto px-4 mt-10 lg:mt-20 pb-20 lg:pb-32">
        <div className="bg-[#E31D1A] rounded-[4rem] p-12 md:p-24 text-white flex flex-col md:flex-row items-center gap-20 relative overflow-hidden shadow-2xl group transition-all duration-[1.5s]">
          <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform duration-[2s] pointer-events-none">
            <Mail className="size-[500px]" />
          </div>
          <div className="flex-1 relative z-10 space-y-10">
            <div className="size-20 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl">
              <Mail className="size-10" />
            </div>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.95]">Dapatkan Buletin <br /> <span className="text-black/30">di Email Anda</span></h3>
            <p className="text-white/80 text-xl leading-relaxed max-w-xl font-medium italic opacity-90">
              "Jangan lewatkan setiap edisi terbaru. Berlangganan sekarang untuk menerima PDF buletin langsung di kotak masuk Anda."
            </p>
            <div className="flex flex-col xl:flex-row gap-6">
              <input 
                type="email" 
                placeholder="ISI ALAMAT EMAIL ANDA..." 
                className="bg-white/10 border-2 border-white/20 px-8 py-6 rounded-[2rem] flex-1 focus:bg-white focus:text-gray-900 transition-all outline-none placeholder:text-white/40 text-white font-black uppercase text-xs tracking-widest shadow-inner"
              />
              <Button className="h-20 px-12 bg-white text-[#E31D1A] hover:bg-[#003049] hover:text-white rounded-[2rem] font-black transition-all duration-500 shadow-2xl uppercase tracking-widest shrink-0">
                LANGGANAN SEKARANG
              </Button>
            </div>
          </div>
          <div className="hidden lg:flex w-1/3 justify-center items-center relative z-10">
             <div className="relative">
                <div className="size-64 border-8 border-dashed border-white/10 rounded-full flex items-center justify-center animate-spin-slow" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <ExternalLink className="size-20 text-white/50" />
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
