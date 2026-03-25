'use client';

import { useParams } from 'next/navigation';
import { motion } from 'motion/react';
import { FileText, User, ChevronRight, ArrowLeft, Download, Bookmark, Book } from 'lucide-react';
import Link from 'next/link';
import { dataService } from '@/lib/data-service';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

export function MonografDetail() {
  const { slug } = useParams();
  const [monograf, setMonograf] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      try {
        setLoading(true);
        const item = await dataService.getMonografDetail(slug as string);
        setMonograf(item);
      } catch (error) {
        console.error("Failed to fetch monograf detail:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E31D1A]"></div>
      </div>
    );
  }

  if (!monograf) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Monograf tidak ditemukan</h2>
          <Link href="/media?tab=monograf">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="size-4" /> Kembali ke Monograf
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] pb-20">
      {/* Integrated Breadcrumb & Header Action */}
      <div className="container mx-auto px-4 pt-12">
        <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 gap-4">
          <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">
            <Link href="/media?tab=monograf" className="hover:text-[#092C74] transition-colors">Monograf</Link>
            <ChevronRight className="size-3 opacity-30" />
            <span className="text-[#092C74] line-clamp-1 max-w-[200px] md:max-w-md">{monograf.title}</span>
          </div>
          
          <a href={monograf.link} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
             <Button className="w-full md:w-auto bg-[#E31D1A] hover:bg-[#C11815] gap-3 rounded-full font-bold shadow-xl shadow-red-500/10 px-8 py-6 h-auto">
               <Download className="size-5" /> Download Monograf
             </Button>
          </a>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">
          
          {/* Main Content Area */}
          <div className="lg:w-3/4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 md:p-14 shadow-xl border border-gray-100"
            >
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-[#E31D1A]/10 text-[#E31D1A] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    Akademik Monograf
                  </span>
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-tighter">
                    {monograf.date}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-[#003049] mb-8 leading-tight">
                   {monograf.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-8 py-6 border-y border-gray-100 mb-10 text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="size-4 text-[#E31D1A]" />
                    <span className="text-sm font-bold text-gray-900">{monograf.author || 'Kontributor Akademik'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Book className="size-4 text-[#E31D1A]" />
                    <span className="text-sm font-bold text-gray-900">STTB Press • Liturgika</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="size-4 text-[#E31D1A]" />
                    <span className="text-sm font-bold text-gray-900">Seri Monograf Akademik</span>
                  </div>
                </div>
              </div>

              {/* Description / Content */}
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-black text-[#092C74] mb-6 uppercase tracking-tight">Abstrak</h2>
                <div className="text-gray-700 leading-relaxed text-lg bg-gray-50 p-8 rounded-2xl italic mb-10 border-l-4 border-[#E31D1A]">
                  {monograf.description}
                </div>
                
                <h2 className="text-2xl font-black text-[#092C74] mb-6 uppercase tracking-tight">Ringkasan Materi</h2>
                <div className="text-gray-800 space-y-6 whitespace-pre-wrap leading-loose">
                  {monograf.content || "Konten monograf lengkap tersedia untuk dipelajari di Perpustakaan STT Bandung atau melalui pesanan ke STTB Press. Monograf ini menyajikan riset mendalam mengenai teologi dan praktika pelayanan."}
                </div>
              </div>
              
              <div className="mt-16 pt-10 border-t border-gray-100">
                 <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 text-center">Sitasi Monograf</h4>
                 <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                      <FileText className="size-20" />
                    </div>
                    <code className="text-sm text-gray-600 block leading-relaxed break-all">
                      {monograf.author || 'Kontributor Akademik'}. ({new Date().getFullYear()}). {monograf.title}. STT Bandung Press.
                    </code>
                    <div className="mt-4 flex justify-end">
                      <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase text-[#1C64E8]">Copy Citation</Button>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4 space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
               <div className="aspect-[3/4] bg-gray-200 rounded-xl mb-6 overflow-hidden shadow-inner flex items-center justify-center p-4 text-center">
                  <div className="w-full h-full bg-[#E31D1A] rounded-lg p-4 flex flex-col justify-between text-white border-2 border-white/20 shadow-lg">
                    <div>
                      <div className="text-[8px] font-black uppercase tracking-widest text-white/60 mb-1">STT Bandung Press</div>
                      <div className="text-[10px] font-bold leading-tight">SERI MONOGRAF AKADEMIK</div>
                    </div>
                    <div className="text-[14px] font-black leading-tight border-t border-white/20 pt-2">2026</div>
                  </div>
               </div>
               <h3 className="font-black text-[#092C74] mb-4 uppercase tracking-tight">Akses Fisik</h3>
               <p className="text-sm text-gray-500 mb-6 leading-relaxed">Dapatkan salinan fisik monograf ini di Toko Buku STTB atau melalui layanan sirkulasi perpustakaan.</p>
               <Link href="/media?tab=keanggotaan">
                 <Button className="w-full bg-[#092C74] hover:bg-[#003049] rounded-xl font-bold py-6">Cek Ketersediaan</Button>
               </Link>
            </div>

            <div className="bg-gradient-to-br from-[#003049] to-[#092C74] rounded-3xl p-8 text-white shadow-xl">
               <h3 className="text-xl font-black mb-4 leading-tight uppercase tracking-tight">Koleksi Terkait</h3>
               <p className="text-white/80 mb-6 text-sm leading-relaxed">Lihat juga seri monograf lainnya yang membahas topik teologi kontemporer.</p>
               <Link href="/media?tab=monograf">
                 <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white hover:text-[#092C74] font-bold py-5 rounded-xl">Lihat Semua</Button>
               </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
