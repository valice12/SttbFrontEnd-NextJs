'use client';

import { useParams } from 'next/navigation';
import { motion } from 'motion/react';
import { FileText, User, ChevronRight, ArrowLeft, Download, Bookmark, Newspaper } from 'lucide-react';
import Link from 'next/link';
import { dataService } from '@/lib/data-service';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { PDFViewer } from '@/components/features/media/shared/PDFViewer';
const bgPattern = "/assets/Page-Panjang-1.webp";

export function BuletinDetail() {
  const { slug } = useParams();
  const [buletin, setBuletin] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      try {
        setLoading(true);
        const item = await dataService.getBuletinDetail(slug as string);
        setBuletin(item);
      } catch (error) {
        console.error("Failed to fetch bulletin detail:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#092C74]"></div>
      </div>
    );
  }

  if (!buletin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-black text-[#092C74] mb-4 uppercase tracking-tighter">Buletin tidak ditemukan</h2>
          <Link href="/media?tab=buletin">
            <Button variant="outline" className="gap-2 font-black uppercase tracking-widest text-[10px] rounded-xl px-6">
              <ArrowLeft className="size-4" /> Kembali ke buletin
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-[#F8F9FB] pb-20 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgPattern})` }}
    >
      {/* Upper Bar */}
      <div className="bg-white border-b sticky top-20 sm:top-32 z-30 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-black text-gray-500 uppercase tracking-widest truncate w-full sm:w-auto">
            <Link href="/media?tab=buletin" className="hover:text-[#092C74] shrink-0">Buletin kampus</Link>
            <ChevronRight className="size-3 shrink-0" />
            <span className="text-[#092C74] truncate">{buletin.title}</span>
          </div>
          {buletin.link && (
            <a href={buletin.link} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
               <Button size="sm" className="w-full bg-[#E31D1A] hover:bg-[#C11815] gap-2 rounded-full font-bold text-[10px] sm:text-xs px-6">
                 <Download className="size-3 sm:size-4" /> Download Buletin
               </Button>
            </a>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 max-w-7xl mx-auto">
          
          {/* Main Content Area */}
          <div className="lg:w-3/4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 md:p-14 shadow-xl border border-gray-100"
            >
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-[#092C74]/10 text-[#092C74] px-4 py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest">
                    Buletin Resmi STTB
                  </span>
                  <span className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-tighter">
                    {buletin.date}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-[#003049] mb-8 leading-tight tracking-tight">
                   {buletin.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 sm:gap-8 py-6 border-y border-gray-100 mb-10 text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="size-4 text-[#E31D1A]" />
                    <span className="text-xs sm:text-sm font-bold text-gray-900">{buletin.author || 'Tim Redaksi Buletin STTB'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bookmark className="size-4 text-[#E31D1A]" />
                    <span className="text-xs sm:text-sm font-bold text-gray-900">Edisi {buletin.edition || 'Terbaru'}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
                <h2 className="text-xl sm:text-2xl font-black text-[#092C74] mb-6 uppercase tracking-tight">Keterangan</h2>
                <div className="text-gray-700 leading-relaxed text-base sm:text-lg mb-10 bg-gray-50 p-6 sm:p-8 rounded-2xl border-l-4 border-[#092C74]">
                  {buletin.description}
                </div>
                
                {buletin.link && (
                  <div className="mt-16 pt-10 border-t border-gray-100">
                    <h2 className="text-2xl font-black text-[#092C74] mb-8 uppercase tracking-tight text-center">Preview Edisi Lengkap</h2>
                    <PDFViewer url={buletin.link} title={buletin.title} />
                  </div>
                )}
              </div>
              
              {!buletin.link && (
                 <div className="mt-10 p-8 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-4">
                    <div className="bg-amber-100 p-2 rounded-full">
                       <Newspaper className="size-6 text-amber-600" />
                    </div>
                    <div>
                       <h4 className="font-bold text-amber-900">Informasi Akses</h4>
                       <p className="text-sm text-amber-800/80 leading-relaxed mt-1">
                          Buletin ini tersedia secara cetak di kampus STT Bandung. Versi digital dalam format PDF sedang dalam proses pengunggahan. Silakan kunjungi perpustakaan untuk membaca edisi lengkap.
                       </p>
                    </div>
                 </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4 space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
               <div className="aspect-[3/4] bg-gray-200 rounded-xl mb-6 overflow-hidden shadow-inner flex items-center justify-center p-4 text-center">
                  <div className="w-full h-full bg-[#E31D1A] rounded-lg p-4 flex flex-col justify-between text-white border-2 border-white/20">
                    <div>
                      <div className="text-[8px] font-black uppercase tracking-widest text-white/60 mb-1">STT Bandung</div>
                      <div className="text-[12px] font-bold leading-tight">BULETIN KAMPUS</div>
                    </div>
                    <div className="text-[14px] font-black leading-tight border-t border-white/20 pt-2 uppercase">Warta<br/>STTB</div>
                  </div>
               </div>
               <h3 className="font-black text-[#092C74] mb-4 uppercase tracking-tight">Redaksi</h3>
               <p className="text-sm text-gray-500 mb-6 leading-relaxed">Kelola dan publikasi berita seputar kehidupan kampus dan pelayanan di STT Bandung.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
