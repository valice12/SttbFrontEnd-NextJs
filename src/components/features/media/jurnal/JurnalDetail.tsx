'use client';

import { useParams } from 'next/navigation';
import { motion } from 'motion/react';
import { FileText, User, ChevronRight, ArrowLeft, Download, Bookmark, Scale } from 'lucide-react';
import Link from 'next/link';
import { dataService } from '@/lib/data-service';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { PDFViewer } from '@/components/features/media/shared/PDFViewer';

export function JurnalDetail() {
  const { slug } = useParams();
  const [journal, setJournal] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      try {
        setLoading(true);
        const item = await dataService.getJournalDetail(slug as string);
        setJournal(item);
      } catch (error) {
        console.error("Failed to fetch journal detail:", error);
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

  if (!journal) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Jurnal tidak ditemukan</h2>
          <Link href="/media?tab=jurnal">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="size-4" /> Kembali ke Jurnal
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] pb-20">
      {/* Upper Bar */}
      <div className="bg-white border-b sticky top-20 sm:top-32 z-30 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest truncate w-full sm:w-auto">
            <Link href="/media?tab=jurnal" className="hover:text-[#092C74] shrink-0">Jurnal Stulos</Link>
            <ChevronRight className="size-3 shrink-0" />
            <span className="text-[#092C74] truncate">{journal.title}</span>
          </div>
          <a href={journal.link} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
             <Button size="sm" className="w-full bg-[#E31D1A] hover:bg-[#C11815] gap-2 rounded-full font-bold text-[10px] sm:text-xs px-6">
               <Download className="size-3 sm:size-4" /> Download Full PDF
             </Button>
          </a>
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
                    Peer-Reviewed Journal
                  </span>
                  <span className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-tighter">
                    {journal.date}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-[#003049] mb-8 leading-tight tracking-tight">
                   {journal.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 sm:gap-8 py-6 border-y border-gray-100 mb-10 text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="size-4 text-[#E31D1A]" />
                    <span className="text-xs sm:text-sm font-bold text-gray-900">{journal.author || 'Tim Akademik STTB'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bookmark className="size-4 text-[#E31D1A]" />
                    <span className="text-xs sm:text-sm font-bold text-gray-900">Volume 22 • STT Bandung</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Scale className="size-4 text-[#E31D1A]" />
                    <span className="text-xs sm:text-sm font-bold text-gray-900">ISSN: 2085-3394</span>
                  </div>
                </div>
              </div>

              {/* Abstract / Content */}
              <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
                <h2 className="text-xl sm:text-2xl font-black text-[#092C74] mb-6 uppercase tracking-tight">Abstract</h2>
                <div className="text-gray-700 leading-relaxed text-base sm:text-lg bg-gray-50 p-6 sm:p-8 rounded-2xl italic mb-10 border-l-4 border-[#092C74]">
                  {journal.description}
                </div>
                
                {journal.link && (
                  <div className="mt-16 pt-10 border-t border-gray-100">
                    <h2 className="text-2xl font-black text-[#092C74] mb-8 uppercase tracking-tight text-center">Preview Full Jurnal</h2>
                    <PDFViewer url={journal.link} title={journal.title} />
                  </div>
                )}
              </div>
              
              <div className="mt-16 pt-10 border-t border-gray-100">
                 <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 text-center">Reference & Citation</h4>
                 <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                      <FileText className="size-20" />
                    </div>
                    <code className="text-sm text-gray-600 block leading-relaxed break-all">
                      {journal.author || 'Tim Akademik STTB'}. ({new Date().getFullYear()}). {journal.title}. <span className="italic">Jurnal Teologi Transformatio</span>, Volume 22(1). STT Bandung Press.
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
                  {/* Simplified Journal Cover Mockup */}
                  <div className="w-full h-full bg-[#092C74] rounded-lg p-4 flex flex-col justify-between text-white border-2 border-white/20">
                    <div>
                      <div className="text-[8px] font-black uppercase tracking-widest text-[#E31D1A] mb-1">STT Bandung</div>
                      <div className="text-[10px] font-bold leading-tight">JURNAL TEOLOGI TRANSFORMATIO</div>
                    </div>
                    <div className="text-[14px] font-black leading-tight border-t border-white/20 pt-2">V22 • N1<br/>2026</div>
                  </div>
               </div>
               <h3 className="font-black text-[#092C74] mb-4 uppercase tracking-tight">OJS Access</h3>
               <p className="text-sm text-gray-500 mb-6 leading-relaxed">Akses portal resmi jurnal untuk melihat seluruh arsip dan panduan bagi penulis.</p>
               <a href="https://e-journal.sttb.ac.id/index.php/transformatio" target="_blank" rel="noopener noreferrer">
                 <Button className="w-full bg-[#092C74] hover:bg-[#003049] rounded-xl font-bold py-6">Visit Portal OJS</Button>
               </a>
            </div>

            <div className="bg-gradient-to-br from-[#E31D1A] to-[#C11815] rounded-3xl p-8 text-white shadow-xl">
               <h3 className="text-xl font-black mb-4 leading-tight uppercase tracking-tight">Submit Your Paper</h3>
               <p className="text-white/80 mb-6 text-sm leading-relaxed">Kami mengundang akademisi dan peneliti untuk berkontribusi dalam edisi berikutnya.</p>
               <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white hover:text-[#E31D1A] font-bold py-5 rounded-xl">Author Guidelines</Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
