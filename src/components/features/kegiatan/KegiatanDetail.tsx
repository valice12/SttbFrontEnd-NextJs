'use client';

import { useParams } from 'next/navigation';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, MapPin, Clock, ArrowLeft, Share2, ChevronRight, Users } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { dataService } from '@/lib/data-service';
import { useState, useEffect } from 'react';
import { getImageUrl } from '@/lib/image-utils';

export function KegiatanDetail() {
  const { slug } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [otherEvents, setOtherEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      try {
        setLoading(true);
        const detail = await dataService.getEventDetail(slug as string);
        setEvent(detail);

        // Fetch a few events for "other events" section
        const otherData = await dataService.getEvents();
        const otherItems = otherData || [];
        setOtherEvents(otherItems.filter((e: any) => e.slug !== slug).slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch event detail:", error);
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

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Kegiatan tidak ditemukan</h2>
          <Link href="/kegiatan">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="size-4" /> Kembali ke Kegiatan
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-4 uppercase tracking-tighter">
          <div className="flex items-center gap-2 text-xs text-gray-500 font-bold">
            <Link href="/" className="hover:text-[#092C74] transition-colors">Beranda</Link>
            <ChevronRight className="size-3" />
            <Link href="/kegiatan" className="hover:text-[#092C74] transition-colors">Kegiatan</Link>
            <ChevronRight className="size-3" />
            <span className="text-gray-900 truncate max-w-[200px] md:max-w-md">
              {event.name || event.title}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[65vh] min-h-[400px] sm:min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={getImageUrl(event.imagePath || event.image, 'events')}
            alt={event.name || event.title}
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#092C74] via-[#092C74]/60 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 w-full">
          <div className="container mx-auto px-4 pb-12 sm:pb-16 md:pb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
                <span className="bg-[#E31D1A] text-white px-3 md:px-4 py-1.5 rounded-full text-[9px] md:text-xs font-black uppercase tracking-widest shadow-lg">
                  {event.category}
                </span>
                <span className="bg-white/10 backdrop-blur-md text-white px-3 md:px-4 py-1.5 rounded-full text-[9px] md:text-xs font-bold uppercase tracking-widest">
                  STTB Event
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 md:mb-8 leading-[1.1] max-w-5xl drop-shadow-2xl tracking-tight">
                {event.name || event.title}
              </h1>

              <div className="hidden sm:flex flex-wrap gap-8 text-white/90 bg-black/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 w-fit">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-[#E31D1A] rounded-full flex items-center justify-center shadow-inner">
                    <CalendarIcon className="size-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/60 font-black uppercase tracking-tighter">Tanggal</p>
                    <p className="font-bold">{new Date(event.eventDate || event.date).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}</p>
                  </div>
                </div>

                {event.time && (
                  <div className="flex items-center gap-3 border-l border-white/20 pl-8">
                    <div className="size-10 bg-[#E31D1A] rounded-full flex items-center justify-center shadow-inner">
                      <Clock className="size-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/60 font-black uppercase tracking-tighter">Waktu</p>
                      <p className="font-bold">{event.time}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 border-l border-white/20 pl-8">
                  <div className="size-10 bg-[#E31D1A] rounded-full flex items-center justify-center shadow-inner">
                    <MapPin className="size-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/60 font-black uppercase tracking-tighter">Lokasi</p>
                    <p className="font-bold">{event.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mobile Meta Bar */}
      <div className="sm:hidden bg-[#092C74] border-t border-white/10 p-4">
        <div className="grid grid-cols-2 gap-4">
           <div className="flex items-center gap-2">
              <CalendarIcon className="size-4 text-[#E31D1A]" />
              <div className="min-w-0">
                <p className="text-[8px] text-white/40 font-black uppercase tracking-widest">Tanggal</p>
                <p className="text-[10px] font-bold text-white truncate">{new Date(event.eventDate || event.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>
           </div>
           <div className="flex items-center gap-2">
              <MapPin className="size-4 text-[#E31D1A]" />
              <div className="min-w-0">
                <p className="text-[8px] text-white/40 font-black uppercase tracking-widest">Lokasi</p>
                <p className="text-[10px] font-bold text-white truncate">{event.location}</p>
              </div>
           </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-12 md:py-20 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 max-w-7xl mx-auto">

            {/* Main Content */}
            <div className="lg:w-2/3">
              <div className="bg-white p-6 sm:p-10 md:p-16 rounded-[2rem] md:rounded-[40px] shadow-xl border border-gray-100 relative sm:-mt-24 md:-mt-32 z-10">
                <div className="flex justify-between items-center mb-8 md:mb-12 pb-6 md:pb-8 border-b border-gray-100">
                  <h2 className="text-xl sm:text-3xl font-black text-[#092C74] uppercase tracking-tighter">Deskripsi Acara</h2>
                  <div className="flex gap-4">
                    <Button variant="outline" size="icon" className="rounded-full size-10 md:size-12 shadow-sm">
                      <Share2 className="size-4 md:size-5 text-[#092C74]" />
                    </Button>
                  </div>
                </div>

                <div className="prose prose-sm sm:prose-base md:prose-xl prose-slate max-w-none text-gray-700 leading-relaxed">
                  <p className="font-bold text-[#1C64E8] mb-8 md:mb-10 text-lg sm:text-xl md:text-2xl leading-relaxed italic border-l-4 border-[#1C64E8] pl-5">
                    {event.description}
                  </p>

                  <div className="text-lg space-y-8 whitespace-pre-wrap">
                    {event.content || `Bergabunglah bersama kami dalam acara ${event.name || event.title} yang akan diselenggarakan oleh Sekolah Tinggi Teologi Bandung. Acara ini merupakan bagian dari komitmen kami untuk memberikan wawasan teologis dan praktis bagi pertumbuhan spiritual dan akademik sivitas akademika.`}

                    <p>
                      Pendaftaran dapat dilakukan secara online melalui portal SIS STTB. Pastikan Anda melakukan registrasi sebelum batas waktu yang ditentukan untuk mengamankan tempat Anda.
                    </p>
                  </div>
                </div>

                <div className="mt-16 pt-10 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-8">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Kategori</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[#092C74] font-black">{event.category}</span>
                      <span className="px-3 py-1 bg-[#F5F3FB] text-[#1C64E8] rounded-md text-xs font-bold uppercase tracking-widest">Limited Seats</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:w-1/3 space-y-10">
              {/* Contact & Help */}
              <div className="bg-[#092C74] p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <Users className="size-32" />
                </div>
                <h3 className="text-2xl font-black mb-6 uppercase tracking-tight relative z-10 text-white leading-tight">Butuh Bantuan Pendaftaran?</h3>
                <p className="text-white/70 mb-10 relative z-10 text-lg leading-relaxed">
                  Tim panitia kami siap membantu Anda memberikan informasi lebih detail mengenai tata cara pendaftaran dan prosedur acara.
                </p>
                <Link href="/kontak" className="relative z-10">
                  <Button variant="outline" className="w-full border-white/20 text-[#092C74] hover:bg-white hover:text-[#092C74] py-7 text-lg font-bold rounded-2xl">
                    Hubungi Panitia
                  </Button>
                </Link>
              </div>

              {/* Related Events */}
              <div className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-100">
                <div className="space-y-8">
                  {otherEvents.map((item: any) => (
                    <Link key={item.slug} href={`/kegiatan/${item.slug}`} className="group block">
                      <div className="flex gap-5">
                        <div className="size-24 shrink-0 rounded-2xl overflow-hidden shadow-md">
                          <img src={getImageUrl(item.imagePath || item.image, 'events')} alt={item.name || item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex flex-col justify-center gap-1">
                          <span className="text-[10px] font-black text-[#E31D1A] uppercase tracking-widest">{item.category}</span>
                          <h4 className="font-bold text-sm text-gray-900 line-clamp-2 group-hover:text-[#1C64E8] transition-colors leading-snug">{item.name || item.title}</h4>
                          <p className="text-xs text-gray-500 font-bold">{new Date(item.eventDate || item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-[#092C74]/5 rounded-3xl p-12 text-center border border-[#092C74]/10">
          <img src="/assets/Logo-STT-Bdg.jpg" alt="STTB Logo" className="h-16 mx-auto mb-8 grayscale opacity-50" />
          <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-sm">Sekolah Tinggi Teologi Bandung &copy; 2026</p>
        </div>
      </section>
    </div>
  );
}

