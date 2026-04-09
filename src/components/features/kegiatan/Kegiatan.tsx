'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Calendar as CalendarIcon, 
  List,
  MapPin,
  Clock,
  Sparkles,
  ChevronRight as ChevronRightIcon
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { dataService } from '@/lib/data-service';
import { MediaCard } from '@/components/common/NewsCard';
import { getImageUrl } from '@/lib/image-utils';
import { useDebounce } from '@/lib/use-debounce';

const bgHeader = "/assets/sttb-2-BG.png";
const bgPatternReversed = "/assets/background-reversed.webp";

export function Kegiatan() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 700);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [date, setDate] = useState<Date | undefined>();
  const [isGridView, setIsGridView] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>(['all']);
  const [totalPages, setTotalPages] = useState(0);

  const itemsPerPage = 10;

  useEffect(() => {
    async function loadInitialData() {
      try {
        const cats = await dataService.getEventCategories();
        const extractedCats = (cats || []).map((cat: any) => 
          typeof cat === 'string' ? cat : (cat.categoryName || cat.name || cat.title)
        ).filter(Boolean);
        setCategories(['all', ...extractedCats]);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }
    loadInitialData();
  }, []);

  useEffect(() => {
    async function fetchPaginatedEvents() {
      try {
        setLoading(true);
        const data = await dataService.getEvents({
          page: currentPage,
          pageSize: itemsPerPage,
          search: debouncedSearchQuery || undefined,
          category: selectedCategory === 'all' ? undefined : selectedCategory,
          date: date || undefined,
          orderBy: sortBy === 'date' ? undefined : 'EventTitle',
          orderState: sortBy === 'date' ? undefined : 'desc'
        });
        setEvents(data.items || []);
        setTotalPages(data.totalPages || 0);
        setTotalEvents(data.totalItems || 0);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPaginatedEvents();
  }, [currentPage, debouncedSearchQuery, selectedCategory, sortBy, date]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery, selectedCategory, sortBy, date]);

  const currentEvents = events;

  return (
    <div 
      className="min-h-screen bg-white bg-cover bg-center"
      style={{ backgroundImage: `url(${bgPatternReversed})` }}
    >
      {/* Premium Hero Section - Synchronized with Home */}
      <section className="relative h-[550px] md:h-[650px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={bgHeader} alt="Events Hero" className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/95 via-[#0F172A]/45 to-transparent z-10" />
          
          <div className="absolute bottom-1/4 -right-20 size-[500px] bg-[#E31D1A]/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute top-0 -left-20 size-[400px] bg-[#092C74]/40 blur-[100px] rounded-full" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center z-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="backdrop-blur-md bg-white/5 border border-white/10 p-10 md:p-20 rounded-[40px] shadow-2xl relative overflow-hidden group"
            >
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E31D1A] rounded-full text-white text-xs font-black uppercase tracking-widest mb-8 shadow-lg shadow-red-500/30"
                >
                   <Sparkles className="size-3" /> Agenda Komunitas
                </motion.div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 drop-shadow-2xl tracking-tighter leading-[0.95]">
                  Kegiatan <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6AACE6] via-[#A855F7] to-[#E31D1A]">Antarbangsa</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl leading-relaxed">
                  Temukan berbagai kegiatan inspiratif, seminar teologis kontemporer, dan acara komunitas yang membangun iman di Sekolah Tinggi Teologi Bandung.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modern Filter Section - Premium Unified Design */}
      <section className="bg-white/70 backdrop-blur-2xl border-b border-gray-100 py-8 sticky lg:static top-[112px] z-30 shadow-sm transition-all duration-500">
        <div className="container mx-auto px-4">
          <div className="flex flex-col xl:flex-row items-center justify-between gap-8">
            <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
              {/* Sort */}
              <div className="flex items-center gap-3 bg-white hover:bg-[#F2ECF8] rounded-2xl px-6 h-14 shrink-0 w-full sm:w-[220px] border-2 border-gray-50 text-[#092C74] transition-all shadow-sm hover:shadow-md">
                <ArrowUpDown className="size-4 shrink-0 text-[#E31D1A]" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full bg-transparent border-none shadow-none focus:ring-0 font-black uppercase text-xs tracking-widest p-0 text-[#092C74]">
                    <SelectValue placeholder="SORT BY" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-none shadow-2xl">
                    <SelectItem value="date" className="font-bold py-3 uppercase text-[10px] tracking-widest">TERDEKAT</SelectItem>
                    <SelectItem value="title" className="font-bold py-3 uppercase text-[10px] tracking-widest">NAMA ACARA</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Category */}
              <div className="flex items-center gap-3 bg-white hover:bg-[#F2ECF8] rounded-2xl px-6 h-14 shrink-0 w-full sm:w-[220px] border-2 border-gray-50 text-[#092C74] transition-all shadow-sm hover:shadow-md">
                <SlidersHorizontal className="size-4 shrink-0 text-[#E31D1A]" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full bg-transparent border-none shadow-none focus:ring-0 font-black uppercase text-xs tracking-widest p-0 text-[#092C74]">
                    <SelectValue placeholder="CATEGORY" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-none shadow-2xl">
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat} className="font-bold py-3 uppercase text-[10px] tracking-widest">
                        {cat === 'all' ? 'SEMUA KATEGORI' : cat.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date */}
              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-3 bg-white hover:bg-[#F2ECF8] border-2 border-gray-50 rounded-2xl px-6 h-14 shrink-0 font-black uppercase text-xs tracking-widest w-full sm:w-[220px] transition-all shadow-sm hover:shadow-md text-[#092C74]">
                    <CalendarIcon className="size-4 shrink-0 text-[#E31D1A]" />
                    <span className="flex-1 text-left truncate">{date ? format(date, "d MMMM yyyy", { locale: id }) : 'DATE'}</span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-[100] bg-white rounded-3xl shadow-2xl border-none overflow-hidden" align="start">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  {date && (
                    <div className="p-4 border-t text-center">
                      <Button variant="ghost" size="sm" onClick={() => setDate(undefined)} className="text-xs font-black text-[#E31D1A] uppercase tracking-widest">HAPUS FILTER</Button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-center gap-4 w-full xl:w-auto flex-1 xl:justify-end">
              <div className="relative w-full xl:max-w-md group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-hover:text-[#092C74] transition-colors" />
                <Input
                  type="text"
                  placeholder="CARI KEGIATAN STTB..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-14 h-14 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-[#092C74]/5 text-sm font-black uppercase tracking-widest transition-all shadow-sm"
                />
              </div>

              <Button
                variant="outline"
                onClick={() => setIsGridView(!isGridView)}
                className={`h-14 w-14 rounded-2xl border-2 transition-all shadow-sm ${isGridView ? 'bg-[#092C74] text-white border-[#092C74]' : 'bg-white text-[#092C74] border-gray-50'}`}
              >
                {isGridView ? <List className="size-6" /> : (
                  <div className="grid grid-cols-2 gap-1">
                    <div className="w-2 h-2 bg-current rounded-sm" />
                    <div className="w-2 h-2 bg-current rounded-sm" />
                    <div className="w-2 h-2 bg-current rounded-sm" />
                    <div className="w-2 h-2 bg-current rounded-sm" />
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Events Display */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className={isGridView ? "grid md:grid-cols-2 lg:grid-cols-3 gap-10" : "space-y-10 max-w-6xl mx-auto"}>
            {currentEvents.length > 0 ? (
              currentEvents.map((event, index) => (
                <motion.div
                  key={event.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                >
                  {isGridView ? (
                    <MediaCard 
                      id={event.id || event.slug}
                      title={event.title || event.name}
                      category={event.category}
                      date={event.date || event.eventDate}
                      description={event.description}
                      image={event.image || event.imagePath}
                      slug={event.slug}
                      type="event"
                      time={event.time}
                      location={event.location}
                    />
                  ) : (
                    <Link href={`/kegiatan/${event.slug}`} className="block group">
                      <div className="flex flex-col md:flex-row gap-10 backdrop-blur-md bg-white/40 p-10 rounded-[3.5rem] hover:shadow-[0_60px_100px_rgba(9,44,116,0.1)] border-2 border-white transition-all duration-700 relative overflow-hidden">
                         <div className="w-full md:w-80 h-60 rounded-[2.5rem] overflow-hidden shrink-0 shadow-2xl relative">
                            <img src={getImageUrl(event.imagePath || event.image, 'events')} alt={event.name || event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                         </div>
                         <div className="flex flex-col flex-1 justify-center relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                               <span className="px-5 py-2 bg-[#E31D1A] text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-500/20">{event.category}</span>
                               <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] flex items-center gap-2"><MapPin className="size-4 text-[#092C74]" /> {event.location || 'STT BANDUNG'}</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-black text-[#092C74] group-hover:text-[#E31D1A] transition-colors mb-6 tracking-tighter leading-tight uppercase">{event.name || event.title}</h3>
                            <p className="text-gray-500 line-clamp-2 mb-10 text-lg font-medium leading-relaxed italic">{event.description}</p>
                            <div className="flex flex-wrap items-center gap-8">
                               <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white shadow-sm">
                                  <CalendarIcon className="size-5 text-[#E31D1A]" />
                                  <span className="text-sm font-black text-[#092C74] uppercase tracking-widest">{new Date(event.eventDate || event.date || '').toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                </div>
                                <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white shadow-sm">
                                  <Clock className="size-5 text-[#E31D1A]" />
                                  <span className="text-sm font-black text-[#092C74] uppercase tracking-widest">{event.time || '09:00 - SELESAI'}</span>
                               </div>
                               <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 hidden md:block">
                                  <div className="size-14 bg-[#092C74] rounded-full flex items-center justify-center text-white shadow-xl">
                                     <ChevronRightIcon className="size-8" />
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                    </Link>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-32 text-center backdrop-blur-md bg-white/30 rounded-[4rem] border-4 border-dashed border-white/60">
                 <div className="size-24 bg-white/60 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-300">
                    <Search className="size-12" />
                 </div>
                 <h3 className="text-3xl font-black text-[#092C74] mb-4">Agenda tidak ditemukan</h3>
                 <p className="text-gray-400 font-medium text-lg">Sesuaikan parameter pencarian untuk menemukan kegiatan yang sesuai.</p>
                 <Button 
                   onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setDate(undefined); }}
                   className="mt-12 h-16 px-12 bg-[#092C74] hover:bg-[#E31D1A] text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-2xl"
                 >
                   RESET SEMUA PARAMETER
                 </Button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-6 mt-24">
              <Button
                variant="outline"
                className="size-16 rounded-full border-2 border-white bg-white/40 hover:bg-[#092C74] text-[#092C74] hover:text-white transition-all p-0 shadow-xl backdrop-blur-md"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="size-8" />
              </Button>
              
              <div className="flex items-center gap-4">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`size-16 flex items-center justify-center text-xl font-black rounded-full transition-all shadow-xl hover:-translate-y-1 ${
                      page === currentPage
                        ? 'bg-[#092C74] text-white scale-110 shadow-blue-900/20'
                        : 'bg-white/40 text-[#092C74] border-2 border-white hover:bg-white'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <Button
                variant="outline"
                className="size-16 rounded-full border-2 border-white bg-white/40 hover:bg-[#092C74] text-[#092C74] hover:text-white transition-all p-0 shadow-xl backdrop-blur-md"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="size-8" />
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
