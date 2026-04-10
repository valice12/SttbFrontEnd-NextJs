'use client';

import { useParams } from 'next/navigation';
import { motion } from 'motion/react';
import { Calendar, User, ChevronRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { dataService } from '@/lib/data-service';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { getImageUrl } from '@/lib/image-utils';
const bgPattern = "/assets/Page-Panjang-1.webp";

export function BeritaDetail() {
  const { slug } = useParams();
  const [newsItem, setNewsItem] = useState<any>(null);
  const [otherNews, setOtherNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      try {
        setLoading(true);
        const detail = await dataService.getNewsDetail(slug as string);
        setNewsItem(detail);
        
        // Fetch a few news for "other news" section
        const otherData = await dataService.getNews({ pageSize: 10 });
        const otherItems = otherData?.items || [];
        setOtherNews(otherItems.filter((n: any) => n.slug !== slug).slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch news detail:", error);
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

  if (!newsItem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Berita tidak ditemukan</h2>
          <Link href="/berita">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="size-4" /> Kembali ke Berita
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      toast.success('Link berita berhasil disalin ke clipboard!', {
        description: 'Anda sekarang dapat membagikannya ke media sosial atau pesan.',
      });
    }).catch(err => {
      console.error('Gagal menyalin link: ', err);
      toast.error('Gagal menyalin link berita.');
    });
  };

  return (
    <div 
      className="min-h-screen bg-white pb-20 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgPattern})` }}
    >
      {/* Breadcrumb - Overlaid on Hero or just above it */}
      <div className="absolute top-0 left-0 w-full z-30 pt-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
            <ChevronRight className="size-4" />
            <Link href="/berita" className="hover:text-white transition-colors">Berita</Link>
            <ChevronRight className="size-4" />
            <span className="text-white font-medium truncate max-w-[200px] md:max-w-md">
              Detail Berita
            </span>
          </div>
        </div>
      </div>

      {/* Premium Hero Section - Refactored to Glassmorphism Card */}
      <section className="relative h-[550px] md:h-[650px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={getImageUrl(newsItem.imagePath || newsItem.image, 'news')} 
            alt={newsItem.title} 
            className="w-full h-full object-cover scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#061B46]/95 via-[#1E1B4B]/45 to-transparent z-10" />
          
          <div className="absolute top-1/2 -right-20 size-[500px] bg-[#E31D1A]/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-0 -left-20 size-[400px] bg-[#092C74]/40 blur-[100px] rounded-full" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center z-20">
          <div className="max-w-5xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="backdrop-blur-md bg-white/5 border border-white/10 p-10 md:p-14 lg:p-16 rounded-[40px] shadow-2xl relative overflow-hidden group"
            >
              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E31D1A] rounded-full text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-red-500/30"
                  >
                     <Calendar className="size-3" /> Wawasan & Kabar
                  </motion.div>
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] px-4 py-1.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-md">
                    #{Array.isArray(newsItem.category) ? newsItem.category[0] : (newsItem.category || 'NEWS')}
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tighter leading-[1.1] drop-shadow-2xl">
                  {newsItem.title}
                </h1>

                <div className="flex flex-wrap items-center gap-8 text-white/80 pt-8 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-white/10 rounded-full flex items-center justify-center text-white shrink-0 backdrop-blur-md border border-white/10">
                      <User className="size-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/40 font-medium uppercase tracking-tighter">Penulis</p>
                      <p className="text-sm font-bold text-white">{newsItem.author || 'Admin STTB'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-white/10 rounded-full flex items-center justify-center text-white shrink-0 backdrop-blur-md border border-white/10">
                      <Calendar className="size-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/40 font-medium uppercase tracking-tighter">Tanggal</p>
                      <p className="text-sm font-bold text-white">
                        {new Date(newsItem.publicationDate || newsItem.date).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Main Content Section */}
      <article className="container mx-auto px-4 py-20 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row gap-12 pt-4">
            <div className="lg:w-2/3">
              <div className="prose prose-sm sm:prose-base md:prose-lg prose-slate max-w-none">
                {newsItem.description && (
                  <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-black mb-8 border-l-4 border-[#092C74] pl-4 sm:pl-6 py-2 italic bg-gray-50 rounded-r-lg">
                    {newsItem.description}
                  </p>
                )}
                
                <div 
                  className="text-gray-800 leading-loose space-y-4 sm:space-y-6 whitespace-pre-wrap text-sm sm:text-base md:text-lg"
                  dangerouslySetInnerHTML={{ __html: newsItem.content || '' }}
                />
              </div>
              
              {/* Share and Tags */}
              <div className="mt-16 pt-8 border-t flex flex-wrap gap-4 items-center justify-between">

                <div className="flex gap-4">
                   <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-full shadow-sm hover:bg-[#092C74] hover:text-white transition-all cursor-pointer font-black uppercase text-[10px] tracking-widest h-10 px-6"
                    onClick={handleShare}
                   >
                    Bagikan berita
                   </Button>
                </div>
              </div>
            </div>
            
            {/* Sidebar / Related News */}
            <aside className="lg:w-1/3 space-y-10">
              <div className="bg-[#092C74] rounded-3xl p-10 text-white shadow-xl relative overflow-hidden group border border-white/5">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                  <User className="size-24" />
                </div>
                <h3 className="text-2xl font-black mb-4 relative z-10 tracking-tight">Daftar STTB</h3>
                <p className="text-white/60 mb-8 relative z-10 text-xs font-medium leading-relaxed">
                  Mari bergabung dengan komunitas teologi unggulan dan persiapkan diri Anda untuk pelayanan masa depan.
                </p>
                <a href="https://sis.sttb.ac.id/pmb" target="_blank" rel="noopener noreferrer" className="relative z-10 block">
                  <Button className="w-full h-14 bg-[#E31D1A] hover:bg-[#C11815] font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-red-500/20">
                    Daftar di PMB STTB
                  </Button>
                </a>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-[#092C74] mb-6 flex items-center gap-2">
                  <div className="h-6 w-1 bg-[#E31D1A] rounded-full" />
                  Berita Lainnya
                </h3>
                <div className="space-y-6">
                  {otherNews.map((item: any) => (
                    <Link key={item.id} href={`/berita/${item.slug}`} className="group block">
                      <div className="flex gap-4">
                        <div className="size-20 shrink-0 bg-gray-200 rounded-xl overflow-hidden shadow-sm">
                          <img src={getImageUrl(item.imagePath || item.image, 'news')} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h4 className="font-bold text-sm text-gray-900 line-clamp-2 group-hover:text-[#092C74] transition-colors">{item.title}</h4>
                          <p className="text-xs text-gray-500 mt-1">{new Date(item.publicationDate || item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </motion.div>
      </article>
      
      {/* Footer CTA */}
      <section className="container mx-auto px-4 mt-12 pb-20">
        <div className="bg-[#F5F3FB] rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 border border-[#092C74]/5">
           <div className="max-w-xl text-center md:text-left">
             <h2 className="text-3xl md:text-4xl font-black text-[#092C74] mb-4">Ingin informasi lebih lanjut?</h2>
             <p className="text-lg text-gray-600">Hubungi tim administrasi kami untuk bantuan pendaftaran atau informasi detail akademik.</p>
           </div>
           <Link href="/kontak">
             <Button className="bg-[#092C74] hover:bg-[#2158AE] px-10 py-7 text-lg font-black rounded-full shadow-xl">
               Hubungi kami
             </Button>
           </Link>
        </div>
      </section>
    </div>
  );
}


