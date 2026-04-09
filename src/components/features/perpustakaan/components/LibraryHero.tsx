'use client';

import { motion } from 'motion/react';
import { BookOpen } from 'lucide-react';

interface LibraryHeroProps {
  bgHeader: string;
}

export function LibraryHero({ bgHeader }: LibraryHeroProps) {
  return (
    <section className="relative h-[500px] lg:h-[650px] overflow-hidden">
      <div className="absolute inset-0">
        <img src={bgHeader} alt="Pendaftaran Anggota Perpustakaan" className="w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#082F49]/95 via-[#075985]/45 to-transparent z-10" />
        
        <div className="absolute bottom-1/4 -right-20 size-[500px] bg-[#6AACE6]/10 blur-[120px] rounded-full animate-pulse" />
      </div>

      <div className="relative container mx-auto px-4 h-full flex items-center z-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="backdrop-blur-md bg-white/5 border border-white/10 p-8 md:p-20 rounded-[40px] shadow-2xl relative overflow-hidden group"
          >
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E31D1A] rounded-full text-white text-xs font-black uppercase tracking-widest mb-8 shadow-lg shadow-red-500/30"
              >
                 <BookOpen className="size-3" /> Library Access
              </motion.div>

              <h1 className="text-4xl md:text-7xl font-black text-white mb-8 drop-shadow-2xl tracking-tighter leading-[1.1]">
                Registrasi <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6AACE6] via-[#A855F7] to-[#E31D1A]">Anggota Perpus</span>
              </h1>
              <p className="text-lg md:text-2xl text-white/90 font-medium max-w-2xl leading-relaxed">
                Bergabunglah sebagai anggota untuk mengakses koleksi literatur teologi terlengkap dan layanan riset akademik di STT Bandung.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
