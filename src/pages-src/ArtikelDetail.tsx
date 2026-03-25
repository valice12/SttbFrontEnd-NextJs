'use client';

import { useParams } from 'next/navigation';
import { motion } from 'motion/react';
import { Calendar, User, ChevronLeft, Share2, MessageCircle, Heart } from 'lucide-react';
import Link from 'next/link';
import { dataService } from '@/lib/data-service';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { getImageUrl } from '@/lib/image-utils';

export function ArtikelDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      try {
        setLoading(true);
        const item = await dataService.getArticleDetail(slug as string);
        setArticle(item);
      } catch (error) {
        console.error("Failed to fetch article detail:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1C64E8]"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Artikel tidak ditemukan</h2>
          <Link href="/media?tab=artikel">
            <Button variant="outline" className="gap-2">
              <ChevronLeft className="size-4" /> Kembali ke Artikel
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Decorative Top Banner */}
      <div className="h-2 bg-gradient-to-r from-[#092C74] via-[#E31D1A] to-[#092C74]" />
      
      <article className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <header className="mb-12 text-center">
             <Link href="/media?tab=artikel" className="inline-flex items-center gap-1 text-[#1C64E8] font-black uppercase tracking-[0.2em] text-[10px] mb-8 hover:translate-x-[-4px] transition-transform">
                <ChevronLeft className="size-3" /> Kembali ke Artikel
             </Link>
             <h1 className="text-4xl md:text-6xl font-black text-[#003049] mb-8 leading-[1.15] tracking-tight">
               {article.title}
             </h1>
             
             <div className="flex flex-wrap items-center justify-center gap-8 text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                <div className="flex items-center gap-2 text-gray-900">
                   <div className="size-8 bg-[#092C74] rounded-full flex items-center justify-center text-white text-[10px]">
                      {article.author?.charAt(0) || '?'}
                   </div>
                   <span>By {article.author || 'Kontributor STTB'}</span>
                </div>
                <div className="flex items-center gap-2">
                   <Calendar className="size-4 text-[#E31D1A]" />
                   <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-2">
                   <span className="px-3 py-1 bg-[#F5F3FB] text-[#092C74] rounded-full">
                     {article.category}
                   </span>
                </div>
             </div>
          </header>

          {/* Large Image */}
          <div className="aspect-[2/1] w-full rounded-[40px] overflow-hidden shadow-2xl mb-16 group">
             <img 
               src={getImageUrl(article.image, 'article')} 
               alt={article.title} 
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
             />
          </div>

          {/* Social Float (Desktop Only) */}
          <div className="relative">
             <div className="hidden lg:flex flex-col gap-4 absolute -left-20 top-0">
                <Button variant="ghost" size="icon" className="rounded-full bg-gray-50 hover:bg-red-50 hover:text-red-500 shadow-sm">
                   <Heart className="size-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full bg-gray-50 hover:bg-blue-50 hover:text-blue-500 shadow-sm">
                   <Share2 className="size-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full bg-gray-50 hover:bg-green-50 hover:text-green-500 shadow-sm">
                   <MessageCircle className="size-5" />
                </Button>
             </div>

             {/* Main Copy */}
             <div className="prose prose-xl prose-slate max-w-none">
                <p className="lead text-2xl font-bold text-gray-900 leading-relaxed mb-10 border-b-2 border-gray-100 pb-10">
                   {article.description}
                </p>
                <div className="text-gray-800 leading-[2] space-y-8 text-lg font-medium whitespace-pre-wrap">
                   {article.content || "Isi artikel lengkap akan segera dipublikasikan. Sekolah Tinggi Teologi Bandung berkomitmen menyebarkan pemikiran teologis yang sehat dan transformatif bagi masyarakat luas."}
                   
                   <p>
                     Melalui literasi, kita memperluas wawasan dan memperkuat fondasi iman kita dalam menghadapi berbagai perubahan zaman. Tetap nantikan tulisan-tulisan inspiratif lainnya dari para akademisi dan staf STT Bandung.
                   </p>
                </div>
             </div>
          </div>

          {/* Author Bio Section */}
          <div className="mt-20 p-10 bg-gray-50 rounded-[40px] border border-gray-100 flex flex-col md:flex-row items-center gap-8 shadow-inner">
             <div className="size-24 bg-[#092C74] rounded-full flex items-center justify-center text-white text-3xl font-black shrink-0 shadow-xl">
                {article.author?.charAt(0) || '?'}
             </div>
             <div className="text-center md:text-left">
                <h4 className="text-xl font-bold text-[#092C74] mb-2 uppercase tracking-tighter">Tentang Penulis: {article.author || 'Kontributor STTB'}</h4>
                <p className="text-gray-600 leading-relaxed">Kontributor aktif dalam pengembangan literatur Kristen di STT Bandung. Fokus pada penulisan teologi praktika dan pertumbuhan gereja.</p>
                <div className="mt-4 flex justify-center md:justify-start gap-4">
                   <Button variant="link" className="p-0 h-auto text-[#1C64E8] font-bold text-xs uppercase tracking-widest">Lihat Semua Tulisan</Button>
                </div>
             </div>
          </div>

          {/* Footer Controls */}
          <div className="mt-16 pt-12 border-t border-gray-100 flex items-center justify-between">
             <Link href="/media?tab=artikel">
                <Button variant="ghost" className="font-bold text-gray-500 hover:text-[#092C74] gap-2">
                   <ChevronLeft className="size-4" /> Kembali
                </Button>
             </Link>
             <div className="flex gap-4">
                <Button variant="outline" className="rounded-full gap-2 font-bold px-6 shadow-sm">
                   <Share2 className="size-4" /> Share Article
                </Button>
             </div>
          </div>
        </motion.div>
      </article>
    </div>
  );
}
