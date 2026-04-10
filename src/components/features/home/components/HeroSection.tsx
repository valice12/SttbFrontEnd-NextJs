'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  imgHeroImage: string;
}

export function HeroSection({ imgHeroImage }: HeroSectionProps) {
  return (
    <section className="relative h-[650px] lg:h-[900px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={imgHeroImage}
          alt="STTB Campus"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#061B46]/95 via-[#4B0082]/40 to-transparent z-10" />
        <div className="absolute top-1/4 -right-1/4 size-[600px] bg-[#E31D1A]/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 -left-1/4 size-[500px] bg-[#092C74]/40 blur-[100px] rounded-full" />
      </div>

      <div className="relative container mx-auto px-4 h-full flex items-center z-20">
        <div className="flex flex-col lg:flex-row items-center w-full">
          <div className="w-full lg:w-[61.8%] relative">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="backdrop-blur-md bg-white/5 border border-white/10 p-8 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E31D1A] rounded-full text-white text-xs font-black uppercase tracking-widest mb-8 shadow-lg shadow-red-500/30"
              >
                 <Sparkles className="size-3" /> Pelopor Pendidikan Teologi
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8, ease: "backOut" }}
                className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white mb-6 leading-[1.1] tracking-tight drop-shadow-2xl"
              >
                Sekolah Tinggi<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6AACE6] via-[#A855F7] to-[#E31D1A]">
                  Teologi Bandung
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-2xl md:text-3xl font-bold mb-8 text-white/90 leading-tight"
              >
                "Menghasilkan pastor – scholar yang berdampak dalam konteks pelayanan urban"
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="flex flex-wrap gap-6 pt-4"
              >
                  <Link href="/admisi">
                    <Button className="bg-[#E31D1A] hover:bg-white !text-white hover:!text-[#E31D1A] px-8 py-5 md:px-12 md:py-8 text-sm md:text-xl font-black rounded-2xl shadow-2xl transition-all duration-500 hover:-translate-y-1 border-0">
                      Info pendaftaran
                    </Button>
                  </Link>
              </motion.div>
            </motion.div>
          </div>
          
          <div className="hidden lg:block lg:w-[38.2%]" />
        </div>
      </div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 opacity-50 hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
