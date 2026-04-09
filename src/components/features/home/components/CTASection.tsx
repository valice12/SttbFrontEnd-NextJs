'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Animated Background Layers */}
      <div className="absolute inset-0 bg-[#092C74]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#E31D1A] via-[#6A0DAD] to-[#092C74] opacity-80" />
      
      {/* Floating background blobs */}
      <div className="absolute top-0 right-0 size-96 bg-white/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 size-96 bg-[#8B008B]/30 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight text-white drop-shadow-xl">
            Siap Memulai Perjalanan Teologi Anda?
          </h2>
          <p className="text-2xl md:text-3xl mb-12 text-white/90 max-w-2xl mx-auto font-medium leading-relaxed">
            Bergabunglah dengan ribuan mahasiswa yang telah mempercayakan pendidikan teologi mereka kepada STTB.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <a href="https://sis.sttb.ac.id/pmb" target="_blank" rel="noopener noreferrer">
              <Button className="group bg-white text-[#E31D1A] hover:bg-[#092C74] hover:text-white px-10 py-8 text-2xl font-black rounded-3xl shadow-2xl transition-all duration-500 hover:-translate-y-2">
                DAFTAR SEKARANG
              </Button>
            </a>
            <Link href="/admisi">
              <Button variant="outline" className="bg-transparent border-2 border-white/40 text-white hover:bg-white hover:text-[#092C74] px-10 py-8 text-2xl font-black rounded-3xl backdrop-blur-sm transition-all duration-500 hover:-translate-y-2">
                INFO PENDAFTARAN
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
