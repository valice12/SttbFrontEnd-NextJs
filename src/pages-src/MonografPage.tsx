'use client';

import { motion } from 'motion/react';
import { Layers, ArrowLeft, Search, SlidersHorizontal, BookOpen, Newspaper, FileText, Video, Users } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MonografTab } from '@/components/media/MonografTab';

const bgHeader = "/assets/sttb-2-BG.png";

export function MonografPage() {
  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero Section */}
      <section className="relative text-white py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={bgHeader} alt="Monograf Akademik" className="size-full object-cover" />
          <div className="absolute inset-0 bg-[#D01A19]/80 mix-blend-multiply" />
        </div>
        <div className="relative container mx-auto px-4 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 drop-shadow-[6px_6px_4px_rgba(0,0,0,0.25)] text-white">Monograf & Buku</h1>
            <div className="w-full max-w-4xl mx-auto h-1 bg-white rounded-full mb-8 opacity-20" />
            <p className="text-2xl md:text-3xl drop-shadow-[6px_6px_4px_rgba(0,0,0,0.25)] text-white">
              Koleksi publikasi monograf dan referensi akademik STT Bandung
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Quick Links Navigation */}
      <section className="bg-white border-b border-gray-200 py-6 relative z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/berita" 
              className="flex items-center gap-2 px-6 py-3 bg-[#f8f9fa] hover:bg-[#F2ECF8] hover:text-[#092C74] border border-gray-200 hover:border-[#092C74] rounded-full transition-all font-semibold text-gray-700 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <Newspaper className="size-5 text-[#E31D1A]" /> Berita Terkini
            </Link>
            <Link 
              href="/media?tab=jurnal" 
              className="flex items-center gap-2 px-6 py-3 bg-[#f8f9fa] hover:bg-[#F2ECF8] hover:text-[#092C74] border border-gray-200 hover:border-[#092C74] rounded-full transition-all font-semibold text-gray-700 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <FileText className="size-5 text-[#E31D1A]" /> Jurnal Stulos
            </Link>
            <Link 
              href="/media?tab=video" 
              className="flex items-center gap-2 px-6 py-3 bg-[#f8f9fa] hover:bg-[#F2ECF8] hover:text-[#092C74] border border-gray-200 hover:border-[#092C74] rounded-full transition-all font-semibold text-gray-700 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <Video className="size-5 text-[#E31D1A]" /> Video Pembelajaran
            </Link>
            <Link 
              href="/media?tab=artikel" 
              className="flex items-center gap-2 px-6 py-3 bg-[#f8f9fa] hover:bg-[#F2ECF8] hover:text-[#092C74] border border-gray-200 hover:border-[#092C74] rounded-full transition-all font-semibold text-gray-700 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <Newspaper className="size-5 text-[#E31D1A]" /> Artikel
            </Link>
            <Link 
              href="/media/monograf" 
              className="flex items-center gap-2 px-6 py-3 bg-[#092C74] text-white border border-[#092C74] rounded-full transition-all font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <FileText className="size-5 text-white" /> Monograf
            </Link>
            <Link 
              href="/media/buletin" 
              className="flex items-center gap-2 px-6 py-3 bg-[#f8f9fa] hover:bg-[#F2ECF8] hover:text-[#092C74] border border-gray-200 hover:border-[#092C74] rounded-full transition-all font-semibold text-gray-700 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <Newspaper className="size-5 text-[#E31D1A]" /> Buletin Kampus
            </Link>
            <Link 
              href="/media?tab=elibrary" 
              className="flex items-center gap-2 px-6 py-3 bg-[#f8f9fa] hover:bg-[#F2ECF8] hover:text-[#092C74] border border-gray-200 hover:border-[#092C74] rounded-full transition-all font-semibold text-gray-700 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <BookOpen className="size-5 text-[#E31D1A]" /> E-Library & Keanggotaan
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div className="flex items-center gap-4">
              <div className="size-14 bg-[#E31D1A]/10 rounded-2xl flex items-center justify-center">
                <Layers className="size-7 text-[#E31D1A]" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-[#092C74]">Pustaka Digital</h2>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-tighter">Seri Monograf & Buku Referensi</p>
              </div>
            </div>
          </div>

          <MonografTab />
        </div>
      </section>

      {/* Footer Info */}
      <section className="container mx-auto px-4 mt-20">
        <div className="bg-gradient-to-br from-[#092C74] to-[#003049] rounded-[40px] p-12 text-white flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <BookOpen className="size-64" />
          </div>
          <div className="flex-1 relative z-10">
            <h3 className="text-3xl font-black mb-4">Ingin Publikasi Monograf?</h3>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl">
              Kami membuka peluang bagi para peneliti dan akademisi STTB untuk mempublikasikan hasil risetnya dalam bentuk monograf akademik resmi.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-[#E31D1A] hover:bg-white hover:text-[#092C74] px-8 py-6 h-auto rounded-2xl font-bold transition-all shadow-xl shadow-red-500/20">
                Panduan Penulisan
              </Button>
              <Button variant="outline" className="border-white/20 hover:bg-white/10 px-8 py-6 h-auto rounded-2xl font-bold transition-all">
                Hubungi Redaksi
              </Button>
            </div>
          </div>
          <div className="hidden md:block w-1/3 aspect-square bg-white/5 rounded-full border border-white/10 flex items-center justify-center p-12 backdrop-blur-sm">
             <Layers className="size-32 text-[#E31D1A]" />
          </div>
        </div>
      </section>
    </div>
  );
}
