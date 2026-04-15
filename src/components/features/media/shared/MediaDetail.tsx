'use client';

import { useParams } from 'next/navigation';
import { motion } from 'motion/react';
import { PlayCircle, FileText, ArrowLeft, ChevronRight, Share2, Info } from 'lucide-react';
import Link from 'next/link';
import { dataService } from '@/lib/data-service';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { getImageUrl } from '@/lib/image-utils';
const bgPattern = "/assets/Page-Panjang-1.webp";

/**
 * Extract a high-quality thumbnail URL from a YouTube link.
 * Supports youtu.be/ short links and youtube.com/watch?v= links.
 */
function getYouTubeThumbnail(url: string): string | null {
  if (!url) return null;
  let videoId: string | null = null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtu.be')) {
      videoId = parsed.pathname.slice(1).split('/')[0];
    } else if (parsed.hostname.includes('youtube.com')) {
      videoId = parsed.searchParams.get('v');
    }
  } catch {
    return null;
  }
  if (!videoId) return null;
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

export function MediaDetail() {
  const { slug } = useParams();
  const [mediaItem, setMediaItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      try {
        setLoading(true);
        let item = null;
        const types = ['video', 'buletin', 'jurnal', 'artikel', 'monograf'];
        for (const type of types) {
          item = await dataService.getMediaDetail(type, slug as string);
          if (item) break;
        }
        setMediaItem(item);
      } catch (error) {
        console.error("Failed to fetch media detail:", error);
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

  if (!mediaItem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Media tidak ditemukan</h2>
          <Link href="/media">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="size-4" /> Kembali ke Media
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-white pb-20 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgPattern})` }}
    >
       {/* Responsive Header */}
       <div className="relative h-[50vh] min-h-[400px] bg-gray-900 overflow-hidden">
           {(() => {
             const videoUrl = mediaItem.videoUrl || mediaItem.link;
             const bannerSrc = mediaItem.type === 'video' && videoUrl
               ? (getYouTubeThumbnail(videoUrl) || getImageUrl(mediaItem.image, mediaItem.type))
               : getImageUrl(mediaItem.image, mediaItem.type);
             return <img src={bannerSrc} alt={mediaItem.title} className="w-full h-full object-cover opacity-60 scale-105 blur-sm" />;
           })()}
           <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="container mx-auto px-4 text-center">
                 <motion.div
                   initial={{ scale: 0.9, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   className="inline-block mb-6"
                 >
                    {mediaItem.type === 'video' ? (
                      <a
                        href={mediaItem.videoUrl || mediaItem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group cursor-pointer"
                      >
                        <PlayCircle className="size-24 text-[#E31D1A] drop-shadow-2xl animate-pulse group-hover:scale-110 transition-transform" />
                      </a>
                    ) : (
                      <FileText className="size-24 text-[#092C74] drop-shadow-2xl" />
                    )}
                 </motion.div>
                 <h1 className="text-4xl md:text-6xl font-black text-[#003049] mb-4 drop-shadow-sm px-4">
                   {mediaItem.title}
                 </h1>
                 <div className="flex justify-center gap-4 text-gray-600 font-bold uppercase tracking-widest text-xs">
                    <span>{mediaItem.category}</span>
                    <span>•</span>
                    <span>{mediaItem.date}</span>
                 </div>
              </div>
           </div>
        </div>

       <div className="container mx-auto px-4 py-16 -mt-20 relative z-10">
          <div className="max-w-5xl mx-auto">
             <div className="bg-white rounded-[40px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-8 md:p-16 border border-gray-50">
                
                <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
                   <div className="md:w-2/3">
                      <h2 className="text-2xl font-black text-[#092C74] mb-6 uppercase tracking-tight flex items-center gap-3">
                         <Info className="size-6 text-[#E31D1A]" />
                         Tentang Media Ini
                      </h2>
                      <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium italic border-l-4 border-[#092C74] pl-6 bg-gray-50 py-4 rounded-r-2xl">
                        {mediaItem.description}
                      </p>
                      <div className="prose prose-lg text-gray-800 leading-loose whitespace-pre-wrap">
                        {mediaItem.content || "Konten detail untuk media ini sedang disiapkan. Sekolah Tinggi Teologi Bandung berkomitmen untuk menyediakan sumber daya berkualitas demi menunjang pembelajaran dan riset teologi."}
                      </div>

                      <div className="mt-12 flex flex-wrap gap-4">
                        {mediaItem.link && (
                          <a href={mediaItem.link} target="_blank" rel="noopener noreferrer">
                             <Button className="bg-[#E31D1A] hover:bg-[#C11815] px-8 py-6 rounded-2xl font-bold shadow-lg">
                               Akses Sumber Luar
                             </Button>
                          </a>
                        )}
                        <Button variant="outline" className="px-8 py-6 rounded-2xl font-bold gap-2">
                           <Share2 className="size-4" /> Bagikan Media
                        </Button>
                      </div>
                   </div>

                   <div className="md:w-1/3">
                      <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 sticky top-32">
                         <h3 className="font-black text-[#092C74] mb-6 uppercase tracking-widest text-sm">Informasi Penulis</h3>
                         <div className="flex items-center gap-4 mb-8">
                            <div className="size-16 bg-[#092C74] rounded-full flex items-center justify-center text-white font-black text-xl">
                               {mediaItem.author?.charAt(0) || '?'}
                            </div>
                            <div>
                               <p className="font-black text-gray-900">{mediaItem.author || 'Contributor STTB'}</p>
                               <p className="text-xs text-gray-500 font-bold uppercase tracking-tighter">Contributor STTB</p>
                            </div>
                         </div>
                         
                         <div className="space-y-4 pt-6 border-t border-gray-200">
                            <div className="flex justify-between items-center text-sm">
                               <span className="text-gray-400 font-bold">Jenis:</span>
                               <span className="font-black text-[#092C74] uppercase tracking-tighter">{mediaItem.type}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                               <span className="text-gray-400 font-bold">Kategori:</span>
                               <span className="font-black text-[#092C74] uppercase tracking-tighter">{mediaItem.category}</span>
                            </div>
                            {mediaItem.duration && (
                              <div className="flex justify-between items-center text-sm">
                                 <span className="text-gray-400 font-bold">Durasi:</span>
                                 <span className="font-black text-[#092C74] uppercase tracking-tighter">{mediaItem.duration}</span>
                              </div>
                            )}
                         </div>
                      </div>
                   </div>
                </div>

                {/* Related CTA */}
                <div className="mt-12 pt-12 border-t border-gray-100 text-center">
                    <p className="text-gray-500 font-bold mb-6 italic uppercase tracking-widest text-xs">Cari media pembelajaran lainnya di Portal Media STTB</p>
                    <Link href="/media">
                       <Button variant="ghost" className="text-[#1C64E8] font-black hover:bg-[#F5F3FB] rounded-full px-10 py-6 text-lg">
                          Jelajahi Perpustakaan Media <ChevronRight className="ml-2 size-5" />
                       </Button>
                    </Link>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
