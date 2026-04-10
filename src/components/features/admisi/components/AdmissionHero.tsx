'use client';

import { motion } from 'motion/react';
import { UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdmissionHeroProps {
  bgHeader: string;
}

export function AdmissionHero({ bgHeader }: AdmissionHeroProps) {
  return (
    <section className="relative h-[550px] md:h-[650px] overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <img src={bgHeader} alt="Admissions Hero" className="w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#061B46]/95 via-[#4B0082]/40 to-transparent z-10" />
        
        {/* Decorative Mesh Blobs */}
        <div className="absolute top-1/2 -right-20 size-[500px] bg-[#E31D1A]/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 -left-20 size-[400px] bg-[#092C74]/40 blur-[100px] rounded-full" />
      </div>

      <div className="relative container mx-auto px-4 h-full flex items-center z-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="backdrop-blur-md bg-white/5 border border-white/10 p-10 md:p-14 lg:p-16 rounded-[40px] shadow-2xl relative overflow-hidden"
          >
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E31D1A] rounded-full text-white text-xs font-black uppercase tracking-widest mb-6 shadow-lg shadow-red-500/30"
              >
                 <UserCheck className="size-3" /> Bergabunglah Bersama Kami
              </motion.div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 drop-shadow-2xl tracking-tighter leading-[1.1]">
                Admisi & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6AACE6] via-[#A855F7] to-[#E31D1A]">Pendaftaran</span>
              </h1>
              <p className="text-lg md:text-2xl text-white/90 font-medium mb-10 max-w-2xl leading-relaxed">
                Mulai perjalanan transformatif Anda di STT Bandung. Kami mengundang calon pemimpin urban untuk dipersiapkan secara akademis dan spiritual.
              </p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <a href="https://sis.sttb.ac.id/pmb" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-white hover:bg-[#E31D1A] text-[#E31D1A] hover:text-white px-8 py-6 md:px-10 md:py-7 text-lg md:text-xl font-black rounded-2xl shadow-xl transition-all duration-500 hover:-translate-y-1">
                    DAFTAR SEKARANG
                  </Button>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
