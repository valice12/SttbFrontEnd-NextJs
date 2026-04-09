'use client';

import { motion } from 'motion/react';
import { BookOpen, Link as LinkIcon, Users, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function ELibraryTab() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
      className="space-y-12 lg:space-y-16 max-w-7xl mx-auto"
    >
      {/* E-Library Section - Premium Glass Panel */}
      <div className="backdrop-blur-xl bg-white/40 border border-white/60 p-10 md:p-16 rounded-[3rem] shadow-[0_40px_80px_rgba(9,44,116,0.05)] relative overflow-hidden">
        <div className="absolute top-0 right-0 size-96 bg-[#092C74]/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#092C74] rounded-full text-white text-[10px] font-black uppercase tracking-widest mb-8"
          >
             <BookOpen className="size-3" /> RESOURCES DIGITAL
          </motion.div>

          <h3 className="text-4xl md:text-6xl font-black mb-8 text-[#092C74] tracking-tighter leading-tight max-w-3xl">
            Literasi Digital <br />
            <span className="text-[#E31D1A]">Tanpa Batas.</span>
          </h3>
          
          <p className="text-xl text-gray-500 font-medium leading-relaxed mb-12 max-w-3xl">
            Perpustakaan Digital STTB menyediakan akses instan ke ribuan koleksi e-book, jurnal internasional, dan karya ilmiah alumni bagi transformasi pengetahuan teologis Anda.
          </p>

          <div className="backdrop-blur-md bg-gradient-to-br from-[#092C74] to-[#4B0082] p-10 md:p-14 rounded-[2.5rem] shadow-2xl relative overflow-hidden group mb-20">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <div className="absolute -bottom-20 -right-20 size-80 bg-white/10 blur-[80px] rounded-full group-hover:scale-110 transition-transform duration-1000" />
            
            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10 text-white">
              <div className="max-w-xl">
                <h4 className="font-black text-3xl md:text-4xl mb-4 leading-tight">Portal E-Library STTB</h4>
                <p className="text-white/80 text-lg font-medium">Jelajahi seluruh katalog, jurnal EBSCO & ProQuest, serta ribuan literatur digital resmi STTB dalam satu pintu.</p>
              </div>
              <a href="https://library.sttb.ac.id/" target="_blank" rel="noopener noreferrer" className="shrink-0 w-full lg:w-auto">
                <Button className="w-full lg:w-auto h-20 px-12 bg-white hover:bg-[#E31D1A] text-[#092C74] hover:text-white font-black text-lg rounded-[1.5rem] shadow-2xl transition-all duration-500 hover:-translate-y-2 uppercase tracking-widest">
                  AKSES SEKARANG <LinkIcon className="ml-3 size-6" />
                </Button>
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: "E-Books", val: "15k+", sub: "Teologi & Umum", icon: BookOpen, color: "from-blue-500 to-[#092C74]" },
              { label: "Jurnal", val: "5k+", sub: "Akademik Global", icon: Zap, color: "from-red-500 to-[#E31D1A]" },
              { label: "Karya Ilmiah", val: "2k+", sub: "Research Alumni", icon: ShieldCheck, color: "from-purple-500 to-[#4B0082]" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
              >
                <div className={`size-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-8 shadow-lg group-hover:rotate-6 transition-transform`}>
                   <stat.icon className="size-8" />
                </div>
                <h5 className="font-black text-5xl text-[#092C74] mb-2 tracking-tighter">{stat.val}</h5>
                <p className="font-black text-xs text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-gray-400 text-sm font-medium">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Membership Section - Dark Glass Panel */}
      <div className="relative overflow-hidden rounded-[3.5rem] bg-[#061B46] p-10 md:p-20 group">
        <div className="absolute inset-0 bg-gradient-to-br from-[#092C74]/80 via-[#4B0082]/90 to-black/80" />
        <div className="absolute top-0 left-0 size-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        
        <div className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E31D1A] rounded-full text-white text-[10px] font-black uppercase tracking-widest"
              >
                 <Users className="size-3" /> ACADEMIC PASSPORT
              </motion.div>
              
              <h3 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter">
                Bergabung sebagai <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6AACE6] via-[#A855F7] to-[#E31D1A]">
                  Premium Member
                </span>
              </h3>
              
              <p className="text-xl text-white/70 font-medium leading-relaxed">
                Kami membuka pintu bagi hamba Tuhan dan masyarakat umum untuk mengakses sumber daya intelektual STTB secara komprehensif.
              </p>

              <div className="space-y-6">
                {[
                  "Akses penuh ke seluruh Ruang Baca Perpustakaan",
                  "Fasilitas peminjaman koleksi fisik khusus Member",
                  "Akses Jaringan E-Library 24/7",
                  "Privilege khusus untuk Publikasi Cetak STTB"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group/item">
                    <div className="size-8 rounded-full bg-white/10 flex items-center justify-center group-hover/item:bg-[#E31D1A] transition-all duration-300">
                      <CheckCircle2 className="size-4 text-[#6AACE6] group-hover/item:text-white" />
                    </div>
                    <span className="text-white/80 font-bold text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-10 md:p-14 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-between h-full">
               <div className="space-y-8">
                  <div className="size-20 bg-white/10 rounded-[2rem] flex items-center justify-center text-white mb-8 border border-white/20">
                     <Users className="size-10" />
                  </div>
                  <h4 className="text-3xl font-black text-white">Syarat & Pendaftaran</h4>
                  <div className="space-y-6">
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-white/60 font-black text-[10px] uppercase tracking-widest mb-2">Administrasi</p>
                      <p className="text-3xl font-black text-white">Rp 150.000 <span className="text-sm text-white/40 font-bold">/ TAHUN</span></p>
                    </div>
                    <p className="text-white/70 font-medium leading-relaxed italic">
                      "Melampirkan rekomendasi dari Gereja dan mengikuti prosedur pendaftaran online."
                    </p>
                  </div>
               </div>

               <div className="mt-12 space-y-6">
                  <Link href="/pendaftaran-anggota-perpustakaan" className="block">
                    <Button className="w-full h-20 bg-[#E31D1A] hover:bg-white hover:text-[#092C74] text-white font-black text-lg rounded-[1.5rem] shadow-2xl transition-all duration-500 uppercase tracking-widest">
                      ISI FORMULIR SEKARANG
                    </Button>
                  </Link>
                  <div className="flex items-center gap-3 justify-center pb-2">
                    <div className="size-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Pendaftaran Terbuka</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F2ECF8]/50 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] flex flex-col md:flex-row gap-8 items-center border border-gray-100">
        <div className="size-20 bg-[#092C74] rounded-2xl flex items-center justify-center text-white shadow-xl shrink-0">
          <LinkIcon className="size-10" />
        </div>
        <div>
          <p className="text-lg font-bold text-[#092C74] italic leading-relaxed">
            "Setelah pendaftaran online, silakan hubungi Tata Usaha Perpustakaan STTB pada jam kerja untuk pengambilan foto dan pencetakan Kartu Member resmi Anda."
          </p>
          <div className="flex gap-6 mt-4">
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Senin - Jumat</span>
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">08:00 - 16:00 WIB</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
