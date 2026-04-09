'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, Calendar as CalendarIcon, List, FileText, Video, BookOpen, Newspaper, Users, SlidersHorizontal } from 'lucide-react';
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
import { MediaCard } from '@/components/common/NewsCard';
import { dataService } from '@/lib/data-service';
import { getImageUrl } from '@/lib/image-utils';
import { useDebounce } from '@/lib/use-debounce';
import { MediaNavbar } from '@/components/features/media/shared/MediaNavbar';

const img_Page_Panjang_1_webp = "/assets/Page-Panjang-1.webp";

export function Berita() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 700);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [date, setDate] = useState<Date | undefined>();
  const [categories, setCategories] = useState<string[]>(['all']);

  const [isGridView, setIsGridView] = useState(true);
  const itemsPerPage = 9;

  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  const [featuredNews, setFeaturedNews] = useState<any[]>([]);
  const [currentFeatured, setCurrentFeatured] = useState(0);

  useEffect(() => {
    async function loadInitialData() {
      try {
        const categoriesData = await dataService.getNewsCategories();
        const extractedCats = (categoriesData || []).map((cat: any) => 
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
    async function loadFeatured() {
      try {
        const data = await dataService.getNews({ pageSize: 3 });
        setFeaturedNews(data.items || []);
      } catch (error) {
        console.error("Failed to fetch featured news:", error);
      }
    }
    loadFeatured();
  }, []);

  useEffect(() => {
    async function fetchPaginatedNews() {
      try {
        setLoading(true);
        const data = await dataService.getNews({
          page: currentPage,
          pageSize: itemsPerPage,
          search: debouncedSearchQuery || undefined,
          category: selectedCategory === 'all' ? undefined : selectedCategory,
          orderBy: sortBy === 'date' ? undefined : (sortBy === 'title' ? 'NewsTitle' : 'CategoryName'),
          orderState: sortBy === 'date' ? undefined : 'desc'
        });
        setNews(data.items || []);
        setTotalPages(data.totalPages || 0);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPaginatedNews();
  }, [currentPage, debouncedSearchQuery, selectedCategory, sortBy, date]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery, selectedCategory, sortBy, date]);

  useEffect(() => {
    if (featuredNews.length === 0) return;
    const timer = setInterval(() => {
      setCurrentFeatured((prev) => (prev === featuredNews.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredNews.length]);

  return (
    <div className="min-h-screen bg-white">
      {/* Premium Hero Section */}
      <section className="relative h-[650px] md:h-[650px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={img_Page_Panjang_1_webp} alt="News Hero" className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/95 via-[#1E1B4B]/45 to-transparent z-10" />
          
          <div className="absolute top-1/4 -right-20 size-[500px] bg-[#E31D1A]/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-0 -left-20 size-[400px] bg-[#092C74]/40 blur-[100px] rounded-full" />
        </div>
 
        <div className="relative container mx-auto px-4 h-full flex items-center z-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="backdrop-blur-md bg-white/5 border border-white/10 p-10 md:p-14 rounded-[40px] shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E31D1A] rounded-full text-white text-xs font-black uppercase tracking-widest mb-8 shadow-lg shadow-red-500/30"
              >
                 <Newspaper className="size-3" /> Wawasan & Kabar Terbaru
              </motion.div>
 
              <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-black text-white mb-8 leading-[1.1] tracking-tight drop-shadow-2xl">
                Berita <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6AACE6] via-[#A855F7] to-[#E31D1A]">
                  STT BANDUNG
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl leading-relaxed">
                Jendela informasi akademis, pelayanan, dan refleksi teologis terkini dari komunitas kami bagi transformasi dunia.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Synchronized Media Navbar */}
      <MediaNavbar activeTab="berita" />

      {/* Featured News Carousel */}
      {featuredNews.length > 0 && (
        <section className="py-12 lg:py-24 bg-gradient-to-b from-white via-[#F5F3FB] to-white relative overflow-hidden">
          <div className="absolute top-0 right-0 size-96 bg-[#E31D1A]/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-center">
                <div className="lg:col-span-3 h-full"> 
                  <motion.div
                    key={currentFeatured}
                    initial={{ opacity: 0, scale: 0.98, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(e, { offset, velocity }) => {
                      const swipe = offset.x;
                      if (swipe < -50) {
                        setCurrentFeatured((prev) => (prev === featuredNews.length - 1 ? 0 : prev + 1));
                      } else if (swipe > 50) {
                        setCurrentFeatured((prev) => (prev === 0 ? featuredNews.length - 1 : prev - 1));
                      }
                    }}
                    className="relative aspect-[16/10] rounded-3xl lg:rounded-[3rem] overflow-hidden shadow-2xl lg:shadow-[0_50px_100px_rgba(9,44,116,0.15)] group cursor-grab active:cursor-grabbing"
                  >
                      <img
                        src={getImageUrl(featuredNews[currentFeatured]?.imagePath || featuredNews[currentFeatured]?.image, 'news')}
                        alt={featuredNews[currentFeatured]?.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#092C74]/40 to-transparent pointer-events-none" />
                      <div className="absolute top-4 left-4 lg:top-8 lg:left-8 pointer-events-none">
                         <div className="px-4 py-1.5 lg:px-6 lg:py-2 bg-[#E31D1A] text-white rounded-full text-[10px] lg:text-xs font-black uppercase tracking-widest shadow-2xl">
                            {featuredNews[currentFeatured]?.category || 'Highlight'}
                         </div>
                      </div>
                  </motion.div>
                </div>
   
                <motion.div
                  key={`content-${currentFeatured}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="lg:col-span-2 space-y-6 lg:space-y-8"
                >
                  <div className="flex items-center gap-4 text-[#6A0DAD] font-black text-[10px] lg:text-xs uppercase tracking-[0.3em]">
                     <div className="w-8 lg:w-10 h-1 bg-[#E31D1A] rounded-full" />
                     {featuredNews[currentFeatured]?.publicationDate ? format(new Date(featuredNews[currentFeatured].publicationDate), "d MMMM yyyy", { locale: id }) : featuredNews[currentFeatured]?.date}
                  </div>
                  <h2 className="text-3xl lg:text-5xl font-black text-[#092C74] leading-[1.1] tracking-tighter">
                    {featuredNews[currentFeatured]?.title}
                  </h2>
                  <p className="text-lg lg:text-xl text-gray-500 leading-relaxed font-medium line-clamp-3 lg:line-clamp-4 italic border-l-4 border-gray-100 pl-4 lg:pl-6">
                    {featuredNews[currentFeatured]?.content?.substring(0, 160)}...
                  </p>
                  <div className="pt-4 lg:pt-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:gap-8">
                    <Link href={`/berita/${featuredNews[currentFeatured]?.slug}`} className="w-full sm:w-auto">
                      <Button className="w-full sm:w-auto h-14 lg:h-16 px-8 lg:px-10 bg-[#092C74] hover:bg-[#E31D1A] text-white font-black text-base lg:text-lg rounded-2xl shadow-xl shadow-blue-900/20 transition-all duration-500 hover:-translate-y-1">
                        BACA SELENGKAPNYA
                      </Button>
                    </Link>
                    <div className="flex gap-2 mx-auto sm:mx-0">
                      {featuredNews.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentFeatured(index)}
                          className={`size-2.5 rounded-full transition-all duration-500 ${index === currentFeatured ? 'bg-[#E31D1A] w-8' : 'bg-gray-200 hover:bg-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filters and Search - Premium Unified Design */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col xl:flex-row items-center justify-between gap-8 bg-white/70 backdrop-blur-2xl p-4 rounded-[2.5rem] border border-gray-100 shadow-sm sticky lg:static top-[112px] z-30 transition-all duration-500">
            <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
              <div className="flex items-center gap-3 bg-white hover:bg-[#F2ECF8] rounded-2xl px-6 h-14 shrink-0 w-full sm:w-[220px] border-2 border-gray-50 text-[#092C74] transition-all shadow-sm hover:shadow-md">
                <ArrowUpDown className="size-4 shrink-0 text-[#E31D1A]" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full bg-transparent border-none shadow-none focus:ring-0 font-black uppercase text-xs tracking-widest p-0 text-[#092C74]">
                    <SelectValue placeholder="SORT BY" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-none shadow-2xl">
                    <SelectItem value="date" className="font-bold py-3 uppercase text-[10px] tracking-widest">Terbaru</SelectItem>
                    <SelectItem value="title" className="font-bold py-3 uppercase text-[10px] tracking-widest">Judul (A-Z)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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
  
              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-3 bg-white hover:bg-[#F2ECF8] border-2 border-gray-50 rounded-2xl px-6 h-14 shrink-0 font-black uppercase text-xs tracking-widest w-full sm:w-[220px] transition-all shadow-sm hover:shadow-md text-[#092C74]">
                    <CalendarIcon className="size-4 shrink-0 text-[#E31D1A]" />
                    <span className="flex-1 text-left truncate">{date ? format(date, "d MMMM yyyy", { locale: id }) : 'DATE'}</span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-[100] bg-white rounded-3xl shadow-2xl border-none overflow-hidden" align="start">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
  
            <div className="flex items-center gap-4 w-full xl:w-auto flex-1 xl:justify-end">
              <div className="relative w-full xl:max-w-md group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-hover:text-[#092C74] transition-colors" />
                <Input
                  type="text"
                  placeholder="CARI BERITA..."
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

      {/* News List Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          {loading ? (
             <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#092C74]" />
             </div>
          ) : (
            <>
              <div className={isGridView ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12" : "space-y-10"}>
                {news.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <MediaCard
                      id={item.id}
                      title={item.title}
                      category={Array.isArray(item.category) ? item.category[0] : (item.category || 'Wawasan')}
                      date={item.publicationDate || item.date}
                      description={item.content?.substring(0, 150) || item.description}
                      image={item.imagePath || item.image}
                      slug={item.slug}
                      type="news"
                      variant={isGridView ? 'default' : 'list'}
                    />
                  </motion.div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-20">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="w-14 h-14 rounded-full border-gray-200"
                  >
                    <ChevronLeft className="size-6" />
                  </Button>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-14 h-14 flex items-center justify-center text-xl font-bold rounded-full transition-all ${page === currentPage
                          ? 'bg-[#092C74] text-white shadow-xl shadow-blue-900/20'
                          : 'bg-white text-gray-400 hover:text-[#092C74] border border-gray-100 hover:border-[#092C74]'
                          }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="w-14 h-14 rounded-full border-gray-200"
                  >
                    <ChevronRight className="size-6" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
