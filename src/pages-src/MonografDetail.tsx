import { useParams } from 'next/navigation';
import { motion } from 'motion/react';
import { FileText, User, ChevronRight, ArrowLeft, Download, Bookmark, Book, Tag, ShoppingCart, Globe, Share2, BookOpen, ArrowUpDown } from 'lucide-react';
import Link from 'next/link';
import { dataService } from '@/lib/data-service';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { PDFViewer } from '@/components/media/PDFViewer';
import { getImageUrl } from '@/lib/image-utils';

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
          <Link href="/media/monograf">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="size-4" /> Kembali ke Monograf
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-32">
      {/* Premium Header / Breadcrumb */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8">
          <Link href="/media" className="hover:text-[#092C74] transition-colors">Media</Link>
          <ChevronRight className="size-3 opacity-30" />
          <Link href="/media/monograf" className="hover:text-[#092C74] transition-colors">Monograf</Link>
          <ChevronRight className="size-3 opacity-30" />
          <span className="text-[#E31D1A] truncate max-w-[200px]">{monograf.title}</span>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Main Book Showcase Card */}
        <section className="max-w-6xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white rounded-[48px] p-8 md:p-16 shadow-2xl shadow-gray-200/60 border border-gray-100 overflow-hidden relative"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-50/50 to-transparent pointer-events-none" />

            {/* Left Col: The Cover */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative group w-full max-w-[320px]">
                <div className="aspect-[3/4.5] rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] transition-transform duration-700 group-hover:translate-y-[-10px] bg-gray-100">
                  <img 
                    src={getImageUrl(monograf.image, 'monograf')} 
                    alt={monograf.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Overlay Badge */}
                <div className="absolute -top-4 -right-4 bg-[#E31D1A] text-white p-4 rounded-2xl shadow-xl transform rotate-12 flex flex-col items-center justify-center min-w-[80px]">
                  <span className="text-[10px] font-black uppercase tracking-widest leading-none">Price</span>
                  <span className="text-lg font-black leading-tight">
                    {monograf.price > 0 ? `Rp ${monograf.price.toLocaleString()}` : 'Free'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Col: Info & Synopsis */}
            <div className="lg:col-span-8 flex flex-col justify-center">
              <div className="mb-8">
                <div className="flex flex-wrap gap-3 mb-6">
                  {monograf.category?.map((cat: string, i: number) => (
                    <span key={i} className="bg-[#092C74]/10 text-[#092C74] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                       <Tag className="size-3" /> {cat}
                    </span>
                  ))}
                  <span className="bg-gray-100 text-gray-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                    Digital Release 2026
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-[#003049] mb-6 leading-[1.1] tracking-tight">
                  {monograf.title}
                </h1>
                <div className="flex items-center gap-4 text-gray-600 mb-8 p-4 bg-gray-50 rounded-2xl inline-flex">
                  <div className="size-10 bg-[#092C74] rounded-full flex items-center justify-center text-white font-black text-sm shadow-lg">
                    {monograf.author?.charAt(0) || 'K'}
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Author / Researcher</p>
                    <p className="text-sm font-bold text-gray-900">{monograf.author || 'Kontributor Akademik STTB'}</p>
                  </div>
                </div>
              </div>

              {/* Synopsis Box */}
              <div className="relative mb-10">
                <h3 className="text-xs font-black text-[#E31D1A] uppercase tracking-[0.3em] mb-4">Sinopsis Monograf</h3>
                <div className="text-gray-700 leading-[1.8] text-lg font-medium italic border-l-4 border-[#092C74] pl-8 py-2 max-w-2xl bg-gray-50/50 rounded-r-2xl pr-4">
                  "{monograf.description || monograf.synopsis || "Belum ada sinopsis untuk karya monograf ini."}"
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 items-center">
                <a href={monograf.link} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-[#E31D1A] hover:bg-[#003049] text-white px-8 py-7 h-auto rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-red-500/20 gap-3 group">
                    <Download className="size-5 group-hover:translate-y-1 transition-transform" /> Download Full Version
                  </Button>
                </a>

                <div className="flex gap-2 ml-auto">
                   <Button variant="ghost" size="icon" className="rounded-full bg-gray-50 hover:bg-white shadow-sm border border-transparent hover:border-gray-100">
                     <Share2 className="size-4" />
                   </Button>
                   <Button variant="ghost" size="icon" className="rounded-full bg-gray-50 hover:bg-white shadow-sm border border-transparent hover:border-gray-100">
                     <Bookmark className="size-4" />
                   </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Extended Data Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto mb-32">
          {/* Metadata Sidebar */}
          <div className="space-y-8">
            <div className="bg-white rounded-[32px] p-10 border border-gray-100 shadow-xl shadow-gray-100/50 space-y-8">
              <h3 className="text-sm font-black text-[#003049] uppercase tracking-widest flex items-center gap-3">
                <Book className="size-5 text-[#E31D1A]" /> Book Metadata
              </h3>
              
              <div className="space-y-6">
                <div className="flex justify-between border-b border-gray-50 pb-4">
                  <span className="text-xs font-bold text-gray-400 uppercase">ISBN-13</span>
                  <span className="text-xs font-black text-[#092C74]">{monograf.isbn || '978-XXXXXXXXXX'}</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-4">
                  <span className="text-xs font-bold text-gray-400 uppercase">Publisher</span>
                  <span className="text-xs font-black text-[#092C74]">STTB Press</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-4">
                  <span className="text-xs font-bold text-gray-400 uppercase">Language</span>
                  <span className="text-xs font-black text-[#092C74]">Indonesian / English</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-4">
                  <span className="text-xs font-bold text-gray-400 uppercase">Access Type</span>
                  <span className="text-[10px] font-black bg-green-100 text-green-700 px-3 py-1 rounded-full uppercase">Open Access</span>
                </div>
              </div>

              <div className="pt-4">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Official Citation (APA)</h4>
                <div className="bg-gray-50 rounded-2xl p-6 text-[10px] leading-relaxed text-gray-600 font-medium">
                  {monograf.author || 'Contributor'}. (2026). <span className="italic">{monograf.title}</span>. Bandung: STTB Press. Retrieved from https://sttb.ac.id/media/monograf/{monograf.slug}
                </div>
                <Button variant="link" className="text-[10px] font-black text-[#E31D1A] p-0 h-auto mt-4 uppercase">Copy Text Citation</Button>
              </div>
            </div>
          </div>

          {/* PDF Viewer Section */}
          <div className="lg:col-span-2">
             {monograf.link ? (
               <div className="bg-white rounded-[32px] p-2 shadow-2xl border border-gray-100 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-[#092C74] opacity-0 group-hover:opacity-[0.02] pointer-events-none transition-opacity" />
                  <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                    <h2 className="text-xl font-black text-[#003049] uppercase tracking-tight">Interactive PDF Preview</h2>
                    <div className="flex items-center gap-2">
                      <div className="size-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Full Version Available</span>
                    </div>
                  </div>
                  <PDFViewer url={monograf.link} title={monograf.title} />
               </div>
             ) : (
               <div className="h-[600px] bg-gray-50 rounded-[32px] flex items-center justify-center p-12 text-center border-2 border-dashed border-gray-200">
                  <div>
                    <Globe className="size-16 text-gray-200 mx-auto mb-6" />
                    <h3 className="text-2xl font-black text-gray-300 uppercase tracking-tighter">Preview Not Available</h3>
                    <p className="text-gray-400 max-w-sm mt-4">This monograph is currently available in physical format. Please contact STTB Press for more information.</p>
                    <Link href="/media/monograf">
                      <Button variant="outline" className="mt-8 rounded-xl font-bold border-gray-200">Browse Other Books</Button>
                    </Link>
                  </div>
               </div>
             )}
          </div>
        </div>

        {/* Section: Why Read This? / Highlights */}
        <section className="bg-[#092C74] rounded-[64px] p-12 md:p-24 text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(9,44,116,0.3)]">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <BookOpen className="size-96" />
          </div>
          <div className="max-w-4xl relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tight">What's Inside the <br/> Research?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-6">
                <div className="size-12 bg-white/10 rounded-2xl flex items-center justify-center text-[#E31D1A]">
                  <ArrowUpDown className="size-6" />
                </div>
                <h4 className="text-xl font-black uppercase tracking-tight">Original Scholarship</h4>
                <p className="text-white/60 leading-relaxed font-medium">Buku ini menyajikan hasil penelitian orisinal yang telah melalui proses peer-review ketat oleh tim dewan editor STT Bandung.</p>
              </div>
              <div className="space-y-6">
                <div className="size-12 bg-white/10 rounded-2xl flex items-center justify-center text-[#E31D1A]">
                  <Globe className="size-6" />
                </div>
                <h4 className="text-xl font-black uppercase tracking-tight">Global Relevance</h4>
                <p className="text-white/60 leading-relaxed font-medium">Perspektif teologis yang ditawarkan relevan dengan perkembangan pelayanan gereja dan isu sosial-budaya di tingkat global.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
