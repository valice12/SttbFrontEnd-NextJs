'use client';

import { useParams } from 'next/navigation';
import { motion } from 'motion/react';
import { FileText, User, ChevronRight, ArrowLeft, Download, Bookmark, Newspaper } from 'lucide-react';
import Link from 'next/link';
import { dataService } from '@/lib/data-service';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Buletin tidak ditemukan</h2>
          <Link href="/media?tab=buletin">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="size-4" /> Kembali ke Buletin
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] pb-20">
      {/* Upper Bar */}
      <div className="bg-white border-b sticky top-32 z-30 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
            <Link href="/media?tab=buletin" className="hover:text-[#092C74]">Buletin Kampus</Link>
            <ChevronRight className="size-3" />
            <span className="text-[#092C74]">{buletin.title}</span>
          </div>
          {buletin.link && (
            <a href={buletin.link} target="_blank" rel="noopener noreferrer">
               <Button size="sm" className="bg-[#E31D1A] hover:bg-[#C11815] gap-2 rounded-full font-bold">
                 <Download className="size-4" /> Download Buletin
               </Button>
            </a>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
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
                  <span className="bg-[#092C74]/10 text-[#092C74] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    Buletin Resmi STTB
                  </span>
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-tighter">
                    {buletin.date}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-[#003049] mb-8 leading-tight">
                   {buletin.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-8 py-6 border-y border-gray-100 mb-10 text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="size-4 text-[#E31D1A]" />
                    <span className="text-sm font-bold text-gray-900">{buletin.author || 'Tim Redaksi Buletin STTB'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bookmark className="size-4 text-[#E31D1A]" />
                    <span className="text-sm font-bold text-gray-900">Edisi {buletin.edition || 'Terbaru'}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-black text-[#092C74] mb-6 uppercase tracking-tight">Keterangan</h2>
                <div className="text-gray-700 leading-relaxed text-lg mb-10">
                  {buletin.description}
                </div>
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
