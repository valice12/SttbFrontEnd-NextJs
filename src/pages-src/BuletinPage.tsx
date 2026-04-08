'use client';

import { motion } from 'motion/react';
import { Newspaper, ArrowLeft, Search, SlidersHorizontal, Mail, ExternalLink, FileText, Video, BookOpen, Users } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BuletinTab } from '@/components/media/BuletinTab';

const bgHeader = "/assets/sttb-2-BG.png";

export function BuletinPage() {
  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero Section */}
      <section className="relative text-white py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={bgHeader} alt="Buletin Kampus" className="size-full object-cover" />
          <div className="absolute inset-0 bg-[#064E3B]/80 mix-blend-multiply" />
        </div>
        <div className="relative container mx-auto px-4 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 drop-shadow-[6px_6px_4px_rgba(0,0,0,0.25)] text-white">Buletin Kampus</h1>
            <div className="w-full max-w-4xl mx-auto h-1 bg-white rounded-full mb-8 opacity-20" />
            <p className="text-2xl md:text-3xl drop-shadow-[6px_6px_4px_rgba(0,0,0,0.25)] text-white">
              Berita terkini, liputan kegiatan, dan artikel inspirasi dari komunitas akademika Sekolah Tinggi Teologi Bandung.
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
              className="flex items-center gap-2 px-6 py-3 bg-[#f8f9fa] hover:bg-[#F2ECF8] hover:text-[#092C74] border border-gray-200 hover:border-[#092C74] rounded-full transition-all font-semibold text-gray-700 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <FileText className="size-5 text-[#E31D1A]" /> Monograf
            </Link>
            <Link 
              href="/media/buletin" 
              className="flex items-center gap-2 px-6 py-3 bg-[#092C74] text-white border border-[#092C74] rounded-full transition-all font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <Newspaper className="size-5 text-white" /> Buletin Kampus
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
              <div className="size-14 bg-[#064E3B]/10 rounded-2xl flex items-center justify-center">
                <Newspaper className="size-7 text-[#064E3B]" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-[#003049]">Arsip Buletin</h2>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-tighter">Publikasi Bulanan & Periodik</p>
              </div>
            </div>
          </div>

          <BuletinTab />
        </div>
      </section>

      {/* Subscription CTA */}
      <section className="container mx-auto px-4 mt-20">
        <div className="bg-[#E31D1A] rounded-[40px] p-12 text-white flex flex-col md:flex-row items-center gap-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
            <Mail className="size-64" />
          </div>
          <div className="flex-1 relative z-10">
            <div className="size-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
              <Mail className="size-8" />
            </div>
            <h3 className="text-3xl md:text-4xl font-black mb-4">Dapatkan Buletin di Email Anda</h3>
            <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-xl font-medium">
              Jangan lewatkan setiap edisi terbaru. Berlangganan sekarang untuk menerima PDF buletin langsung di kotak masuk Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Alamat email Anda..." 
                className="bg-white/10 border border-white/20 px-6 py-5 rounded-2xl flex-1 focus:bg-white focus:text-gray-900 transition-all outline-none placeholder:text-white/50 text-white font-bold"
              />
              <Button className="bg-white text-[#E31D1A] hover:bg-[#092C74] hover:text-white px-10 py-5 h-auto rounded-2xl font-black transition-all shadow-xl shadow-black/10">
                BERLANGGANAN
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/3 flex justify-center items-center relative z-10">
             <div className="size-48 border-4 border-dashed border-white/20 rounded-full flex items-center justify-center animate-spin-slow">
                <ExternalLink className="size-12 opacity-50" />
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
