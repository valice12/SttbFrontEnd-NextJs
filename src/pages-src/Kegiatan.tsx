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
  Clock
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
import { MediaCard } from '@/components/MediaCard';
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

  // Fetch events from dataService
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

  // Filtering Logic
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery, selectedCategory, sortBy, date]);

  const currentEvents = events;

  return (
    <div 
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgPatternReversed})` }}
    >
      <section className="relative text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={bgHeader} alt="Kegiatan" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#E31D1A]/85 mix-blend-multiply" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-6xl md:text-7xl font-black mb-6 drop-shadow-2xl uppercase tracking-tighter">Kegiatan & Acara</h1>
            <div className="w-24 h-2 bg-white mx-auto rounded-full mb-8" />
            <p className="text-2xl max-w-3xl mx-auto font-medium text-white/90 drop-shadow-lg">
              Temukan berbagai kegiatan dan acara inspiratif di STTB
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search Bar - Synchronized Style */}
      <section className="py-12 bg-white border-b relative z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left side: Sort and Filter */}
            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-3 bg-white hover:bg-[#F2ECF8] rounded-full px-6 py-2 shrink-0 w-full sm:w-[220px] border border-[#092C74] text-[#092C74] transition-colors">
                <ArrowUpDown className="size-5 shrink-0" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full bg-transparent border-none shadow-none focus:ring-0 font-semibold p-0 text-[#092C74]">
                    <SelectValue placeholder="Urutkan..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Terdekat</SelectItem>
                    <SelectItem value="title">Nama Acara</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Filter Dropdown */}
              <div className="flex items-center gap-3 bg-white hover:bg-[#F2ECF8] rounded-full px-6 py-2 shrink-0 w-full sm:w-[220px] border border-[#092C74] text-[#092C74] transition-colors">
                <SlidersHorizontal className="size-5 shrink-0" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full bg-transparent border-none shadow-none focus:ring-0 font-semibold p-0 text-[#092C74]">
                    <SelectValue placeholder="Kategori..." />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat === 'all' ? 'Semua Kategori' : cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date Filter Dropdown */}
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className="flex items-center gap-3 bg-white hover:bg-[#F2ECF8] border border-[#092C74] rounded-full px-6 py-3 shrink-0 font-semibold z-10 relative cursor-pointer outline-none w-full sm:w-[220px] transition-colors text-[#092C74]"
                  >
                    <CalendarIcon className="size-5 shrink-0" />
                    <span className="flex-1 text-left truncate">{date ? format(date, "d MMMM yyyy", { locale: id }) : <span>Pilih Tanggal</span>}</span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-[100] bg-white" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                  {date && (
                    <div className="p-2 border-t text-center">
                      <Button variant="ghost" size="sm" onClick={() => setDate(undefined)} className="text-xs font-bold text-[#E31D1A]">Hapus Tanggal</Button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>

            {/* Right side: Search and Toggle */}
            <div className="flex flex-wrap md:flex-nowrap items-center gap-4 w-full md:w-auto flex-1 md:justify-end">
              {/* Search Bar */}
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#092C74]" />
                <Input
                  type="text"
                  placeholder="Cari kegiatan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 bg-white border border-[#092C74] text-[#092C74] placeholder:text-[#092C74] placeholder:opacity-70 rounded-full py-6 w-full focus-visible:ring-1 focus-visible:ring-[#092C74]"
                />
              </div>

              {/* Grid/List Toggle Button */}
              <button
                onClick={() => setIsGridView(!isGridView)}
                className="p-4 bg-white border border-[#092C74] rounded-full hover:bg-[#F2ECF8] transition-colors shrink-0 flex items-center justify-center w-[54px] h-[54px]"
              >
                {isGridView ? (
                  <List className="size-5 text-[#092C74]" />
                ) : (
                  <div className="grid grid-cols-2 gap-1">
                    <div className="w-2 h-2 bg-[#092C74] rounded-sm" />
                    <div className="w-2 h-2 bg-[#092C74] rounded-sm" />
                    <div className="w-2 h-2 bg-[#092C74] rounded-sm" />
                    <div className="w-2 h-2 bg-[#092C74] rounded-sm" />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Events List / Grid */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className={isGridView ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-8 max-w-5xl mx-auto"}>
            {currentEvents.length > 0 ? (
              currentEvents.map((event, index) => (
                <motion.div
                  key={event.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
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
                    <Link href={`/kegiatan/${event.slug}`} className="block">
                      <div className="flex flex-col md:flex-row gap-8 bg-white p-8 rounded-[32px] hover:shadow-2xl border border-gray-100 transition-all group overflow-hidden relative">
                         <div className="w-full md:w-64 h-48 rounded-2xl overflow-hidden shrink-0">
                            <img src={getImageUrl(event.imagePath || event.image, 'events')} alt={event.name || event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                         </div>
                         <div className="flex flex-col flex-1 justify-center py-2">
                            <div className="flex items-center gap-2 mb-4">
                               <span className="px-3 py-1 bg-[#E31D1A]/10 text-[#E31D1A] rounded-full text-xs font-black uppercase tracking-widest">{event.category}</span>
                               <span className="text-xs text-gray-400 font-bold uppercase tracking-tighter flex items-center gap-1"><MapPin className="size-3" /> {event.location || 'STT Bandung'}</span>
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 group-hover:text-[#E31D1A] transition-colors mb-4 uppercase tracking-tighter leading-tight">{event.name || event.title}</h3>
                            <p className="text-gray-500 line-clamp-2 mb-6 font-medium">{event.description}</p>
                            <div className="flex items-center gap-6 mt-auto font-bold text-sm text-gray-600">
                               <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                                  <CalendarIcon className="size-4 text-[#E31D1A]" />
                                  <span>{new Date(event.eventDate || event.date || '').toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                               </div>
                               <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                                  <Clock className="size-4 text-[#E31D1A]" />
                                  <span>{event.time || '09:00 - Selesai'}</span>
                               </div>
                            </div>
                         </div>
                      </div>
                    </Link>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-white/50 backdrop-blur-md rounded-[40px] border-2 border-dashed border-gray-200">
                 <div className="size-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                    <Search className="size-10" />
                 </div>
                 <h3 className="text-2xl font-black text-gray-900 mb-2">Tidak ditemukan kegiatan</h3>
                 <p className="text-gray-500">Coba ubah filter atau kata kunci pencarian Anda.</p>
                 <Button 
                   variant="outline" 
                   className="mt-8 rounded-full px-8 border-[#E31D1A] text-[#E31D1A] hover:bg-[#E31D1A] hover:text-white"
                   onClick={() => {
                     setSearchQuery('');
                     setSelectedCategory('all');
                     setDate(undefined);
                   }}
                 >
                   Reset Semua Filter
                 </Button>
              </div>
            )}
          </div>

          {/* Pagination - Synchronized Style */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-20">
              <Button
                variant="outline"
                className="size-14 rounded-full border-gray-200 hover:border-[#092C74] text-gray-400 hover:text-[#092C74] transition-all p-0 shadow-sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="size-6" />
              </Button>
              
              <div className="flex items-center gap-4">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`size-14 flex items-center justify-center text-xl font-bold rounded-full transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                      page === currentPage
                        ? 'bg-[#092C74] text-white shadow-lg shadow-[#092C74]/20'
                        : 'bg-white text-gray-700 hover:bg-[#F2ECF8] border border-gray-200 hover:border-[#092C74] hover:text-[#092C74]'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <Button
                variant="outline"
                className="size-14 rounded-full border-gray-200 hover:border-[#092C74] text-gray-400 hover:text-[#092C74] transition-all p-0 shadow-sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="size-6" />
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
