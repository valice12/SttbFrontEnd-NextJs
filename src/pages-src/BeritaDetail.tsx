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
    <div className="min-h-screen bg-white pb-20">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#092C74] transition-colors">Beranda</Link>
            <ChevronRight className="size-4" />
            <Link href="/berita" className="hover:text-[#092C74] transition-colors">Berita</Link>
            <ChevronRight className="size-4" />
            <span className="text-gray-900 font-medium truncate max-w-[200px] md:max-w-md">
              {newsItem.title}
            </span>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-4 py-12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <header className="mb-10">
            <span className="inline-block px-4 py-1.5 bg-[#E31D1A] text-white rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              {Array.isArray(newsItem.category) ? newsItem.category.join(', ') : (newsItem.category || 'Berita')}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#092C74] mb-8 leading-[1.15]">
              {newsItem.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-8 text-gray-600 border-y py-6 border-gray-100">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-[#092C74]/10 rounded-full flex items-center justify-center text-[#092C74]">
                  <User className="size-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-tighter">Penulis</p>
                  <p className="text-sm font-bold text-gray-900">{newsItem.author || 'Admin STTB'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="size-10 bg-[#E31D1A]/10 rounded-full flex items-center justify-center text-[#E31D1A]">
                  <Calendar className="size-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-tighter">Tanggal</p>
                  <p className="text-sm font-bold text-gray-900">
                    {new Date(newsItem.publicationDate || newsItem.date).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </header>
          
          {/* Featured Image */}
          <div className="aspect-[16/9] md:aspect-[21/9] w-full bg-gray-100 rounded-3xl overflow-hidden mb-12 shadow-2xl relative">
            <img 
              src={getImageUrl(newsItem.imagePath || newsItem.image, 'news')} 
              alt={newsItem.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Content */}
          <div className="flex flex-col lg:flex-row gap-12 pt-4">
            <div className="lg:w-2/3">
              <div className="prose prose-lg prose-slate max-w-none">
                {newsItem.description && (
                  <p className="text-xl text-gray-700 leading-relaxed font-medium mb-8 border-l-4 border-[#092C74] pl-6 py-2 italic bg-gray-50 rounded-r-lg">
                    {newsItem.description}
                  </p>
                )}
                
                <div 
                  className="text-gray-800 leading-loose space-y-6 whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: newsItem.content || '' }}
                />
              </div>
              
              {/* Share and Tags */}
              <div className="mt-16 pt-8 border-t flex flex-wrap gap-4 items-center justify-between">
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-sm font-medium hover:bg-gray-200 cursor-pointer transition-colors">#STTB</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-sm font-medium hover:bg-gray-200 cursor-pointer transition-colors">#Teologi</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-sm font-medium hover:bg-gray-200 cursor-pointer transition-colors">#Pendidikan</span>
                </div>
                <div className="flex gap-4">
                   <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-full shadow-sm hover:bg-[#092C74] hover:text-white transition-all cursor-pointer"
                    onClick={handleShare}
                   >
                    Bagikan Berita
                   </Button>
                </div>
              </div>
            </div>
            
            {/* Sidebar / Related News */}
            <aside className="lg:w-1/3 space-y-10">
              <div className="bg-[#092C74] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                  <User className="size-24" />
                </div>
                <h3 className="text-2xl font-bold mb-4 relative z-10">Daftar STTB</h3>
                <p className="text-white/80 mb-8 relative z-10 text-sm leading-relaxed">
                  Mari bergabung dengan komunitas teologi unggulan dan persiapkan diri Anda untuk pelayanan masa depan.
                </p>
                <a href="https://sis.sttb.ac.id/pmb" target="_blank" rel="noopener noreferrer" className="relative z-10 block">
                  <Button className="w-full bg-[#E31D1A] hover:bg-[#C11815] font-bold py-6 rounded-xl shadow-lg">
                    Daftar Sekarang
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
      <section className="container mx-auto px-4 mt-12">
        <div className="bg-[#F5F3FB] rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 border border-[#092C74]/5">
           <div className="max-w-xl text-center md:text-left">
             <h2 className="text-3xl md:text-4xl font-bold text-[#092C74] mb-4">Ingin informasi lebih lanjut?</h2>
             <p className="text-lg text-gray-600">Hubungi tim administrasi kami untuk bantuan pendaftaran atau informasi detail akademik.</p>
           </div>
           <Link href="/kontak">
             <Button className="bg-[#092C74] hover:bg-[#2158AE] px-10 py-7 text-lg font-bold rounded-full shadow-xl">
               Hubungi Kami
             </Button>
           </Link>
        </div>
      </section>
    </div>
  );
}


