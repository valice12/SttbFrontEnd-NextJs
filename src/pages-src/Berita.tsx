'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
// Tambahan: Import ikon List untuk toggle button
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal, ArrowUpDown, Calendar as CalendarIcon, List, FileText, Video, BookOpen, Newspaper, Users } from 'lucide-react';
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
import { getImageUrl } from '@/lib/image-utils';
const img_Page_Panjang_1_webp = "/assets/Page-Panjang-1.webp";

export function Berita() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [date, setDate] = useState<Date | undefined>();
  const [categories, setCategories] = useState<string[]>(['all']);

  // State baru untuk mengatur tampilan list atau grid
  const [isGridView, setIsGridView] = useState(false);
  const itemsPerPage = 10;

  // State for news data
  const [news, setNews] = useState<any[]>([]);
  const [totalNews, setTotalNews] = useState(0);
  const [loading, setLoading] = useState(true);

  // Featured news (first 3)
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
    async function fetchAllNews() {
      try {
        setLoading(true);
        const data = await dataService.getNews();
        setNews(data || []);
        setFeaturedNews((data || []).slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAllNews();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sortBy, date]);

  // Generate array for pagination
  const filteredNews = news.filter((n) => {
    const matchesCategory = selectedCategory === 'all' || 
       (Array.isArray(n.category) ? n.category.includes(selectedCategory) : n.category === selectedCategory);
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = !date || new Date(n.date).toDateString() === date.toDateString();
    return matchesCategory && matchesSearch && matchesDate;
  });

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNews = filteredNews.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeatured((prev) => (prev === featuredNews.length - 1 ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(timer);
  }, [featuredNews.length]);


  return (
    <div 
      className="min-h-screen bg-white bg-cover bg-center"
      style={{ backgroundImage: `url(${img_Page_Panjang_1_webp})` }}
    >
      {/* Hero Section with Background */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-white/80">
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-8xl font-bold text-[#D01A19] mb-6 drop-shadow-[6px_6px_4px_rgba(0,0,0,0.25)]">
              STTB NEWS
            </h1>
            <div className="w-full max-w-4xl mx-auto h-1 bg-[#092C74] rounded-full mb-8" />
            <p className="text-2xl md:text-3xl text-[#061C4A] drop-shadow-[6px_6px_4px_rgba(0,0,0,0.25)]">
              Berita Seputar Sekolah Teologi Bandung
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white border-b border-gray-200 py-6 relative z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/berita" 
              className="flex items-center gap-2 px-6 py-3 bg-[#092C74] text-white border border-[#092C74] rounded-full transition-all font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <Newspaper className="size-5 text-white" /> Berita Terkini
            </Link>
            <Link 
              href="/media?tab=jurnal" 
              className="flex items-center gap-2 px-6 py-3 bg-[#f8f9fa] hover:bg-[#F2ECF8] hover:text-[#092C74] border border-gray-200 hover:border-[#092C74] rounded-full transition-all font-semibold text-gray-700 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <FileText className="size-5 text-[#E31D1A]" /> Jurnal Stulos
            </Link>
            <Link 
              href="/media?tab=video" 
              className="flex items-center gap-2 px-6 py-3 bg-[#f8f9fa] hover:bg-[#F2ECF8] hover:text-[#092C74] border border-gray-200 hover:border-[#092C74] rounded-full transition-all font-semibold text-gray-700 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <Video className="size-5 text-[#E31D1A]" /> Video Pembelajaran
            </Link>
            <Link 
              href="/media?tab=artikel" 
              className="flex items-center gap-2 px-6 py-3 bg-[#f8f9fa] hover:bg-[#F2ECF8] hover:text-[#092C74] border border-gray-200 hover:border-[#092C74] rounded-full transition-all font-semibold text-gray-700 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <Newspaper className="size-5 text-[#E31D1A]" /> Artikel
            </Link>
            <Link 
              href="/media?tab=monograf" 
              className="flex items-center gap-2 px-6 py-3 bg-[#f8f9fa] hover:bg-[#F2ECF8] hover:text-[#092C74] border border-gray-200 hover:border-[#092C74] rounded-full transition-all font-semibold text-gray-700 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <FileText className="size-5 text-[#E31D1A]" /> Monograf
            </Link>
            <Link 
              href="/media?tab=elibrary" 
              className="flex items-center gap-2 px-6 py-3 bg-[#f8f9fa] hover:bg-[#F2ECF8] hover:text-[#092C74] border border-gray-200 hover:border-[#092C74] rounded-full transition-all font-semibold text-gray-700 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <BookOpen className="size-5 text-[#E31D1A]" /> E-Library
            </Link>
            <Link 
              href="/media?tab=keanggotaan" 
              className="flex items-center gap-2 px-6 py-3 bg-[#f8f9fa] hover:bg-[#F2ECF8] hover:text-[#092C74] border border-gray-200 hover:border-[#092C74] rounded-full transition-all font-semibold text-gray-700 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <Users className="size-5 text-[#E31D1A]" /> Keanggotaan Umum
            </Link>
          </div>
        </div>
      </section>

      {/* Featured News Carousel */}
      <section className="py-16 bg-[#F2ECF8]">
        <div className="container mx-auto px-4">
          <div className="relative max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Image */}
              <motion.div
                key={currentFeatured}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
              >
                  <img
                    src={getImageUrl(featuredNews[currentFeatured]?.imagePath || featuredNews[currentFeatured]?.image, 'news')}
                    alt={featuredNews[currentFeatured]?.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Content */}
                <motion.div
                  key={`content-${currentFeatured}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <span className="inline-block px-4 py-1 bg-[#E31D1A] text-white rounded-full text-sm font-semibold">
                    {featuredNews[currentFeatured]?.category || 'Berita'}
                  </span>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {featuredNews[currentFeatured]?.title}
                  </h2>
                  <p className="text-gray-600 text-lg">
                    {featuredNews[currentFeatured]?.content?.substring(0, 150)}...
                  </p>
                  <p className="text-sm text-gray-500">
                    {featuredNews[currentFeatured]?.publicationDate ? format(new Date(featuredNews[currentFeatured].publicationDate), "d MMMM yyyy", { locale: id }) : featuredNews[currentFeatured]?.date}
                  </p>
                  <Link href={`/berita/${featuredNews[currentFeatured]?.slug}`}>
                  <Button className="bg-[#092C74] hover:bg-[#2158AE] text-white">
                    Baca Selengkapnya
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Carousel Controls */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => setCurrentFeatured((prev) => (prev === 0 ? featuredNews.length - 1 : prev - 1))}
                className="p-2 bg-black text-white rounded-full hover:bg-gray-800"
                aria-label="Previous"
              >
                <ChevronLeft className="size-6" />
              </button>

              <div className="flex gap-2">
                {featuredNews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFeatured(index)}
                    className={`size-3 rounded-full transition-all ${index === currentFeatured ? 'bg-[#092C74] w-8' : 'bg-[#73B2F5]'
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentFeatured((prev) => (prev === featuredNews.length - 1 ? 0 : prev + 1))}
                className="p-2 bg-black text-white rounded-full hover:bg-gray-800"
                aria-label="Next"
              >
                <ChevronRight className="size-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-12 bg-white border-b">
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
                    <SelectItem value="date">Terbaru</SelectItem>
                    <SelectItem value="title">Judul</SelectItem>
                    <SelectItem value="category">Kategori</SelectItem>
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
                    className={`flex items-center gap-3 bg-white hover:bg-[#F2ECF8] border border-[#092C74] rounded-full px-6 py-3 shrink-0 font-semibold z-10 relative cursor-pointer outline-none w-full sm:w-[220px] transition-colors ${!date ? "text-[#092C74]" : "text-[#092C74]"}`}
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
                  placeholder="Cari berita..."
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
                  <div className="grid grid-cols-3 gap-1">
                    <div className="w-1.5 h-1.5 bg-[#092C74] rounded-sm" />
                    <div className="w-1.5 h-1.5 bg-[#092C74] rounded-sm" />
                    <div className="w-1.5 h-1.5 bg-[#092C74] rounded-sm" />
                    <div className="w-1.5 h-1.5 bg-[#092C74] rounded-sm" />
                    <div className="w-1.5 h-1.5 bg-[#092C74] rounded-sm" />
                    <div className="w-1.5 h-1.5 bg-[#092C74] rounded-sm" />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* News List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Dynamic wrapper (Grid vs List) */}
          <div className={isGridView ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
            {currentNews.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={isGridView ? 'flex flex-col h-full' : ''}
              >
                <Link 
                  href={`/berita/${news.slug}`}
                  className={`block bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer ${isGridView ? 'flex flex-col h-full' : 'h-full'}`}
                >
                  {/* Dynamic Card Internal Layout */}
                  <div className={isGridView ? "flex flex-col gap-6 h-full" : "grid md:grid-cols-4 gap-6 h-full"}>
                    {/* Image */}
                    <div className={isGridView ? "w-full" : "md:col-span-1 flex items-center"}>
                      <div className={`${isGridView ? 'h-64' : 'h-48'} w-full bg-[#A69191] rounded-2xl overflow-hidden shrink-0`}>
                        <img
                          src={getImageUrl(news.imagePath || news.image, 'news')}
                          alt={news.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className={isGridView ? "flex flex-col flex-1 space-y-3" : "md:col-span-3 flex flex-col justify-center space-y-3"}>
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#092C74] transition-colors">{news.title}</h3>
                      <p className="text-sm text-gray-600">{news.publicationDate ? format(new Date(news.publicationDate), "d MMMM yyyy", { locale: id }) : news.date}</p>
                      <p className="text-gray-700 line-clamp-2">{news.content?.substring(0, 150) || news.description}</p>
                      <div className={`flex items-center gap-4 ${isGridView ? "mt-auto pt-4" : "mt-auto"}`}>
                        <span className="text-sm text-gray-600">Admin STTB</span>
                        <span className="px-3 py-1 bg-[#092C74] text-white text-sm rounded-full">
                          {Array.isArray(news.category) ? news.category.join(', ') : (news.category || 'Berita')}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-12">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-14 h-14 flex items-center justify-center text-xl font-bold rounded-full transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 ${page === currentPage
                  ? 'bg-[#092C74] text-white'
                  : 'bg-[#f8f9fa] text-gray-700 hover:bg-[#F2ECF8] border border-gray-200 hover:border-[#092C74] select-none hover:text-[#092C74]'
                  }`}
              >
                {page}
              </button>
            ))}
            {totalPages > 3 && (
              <div className="w-14 h-14 flex items-center justify-center bg-[#f8f9fa] border border-gray-200 text-xl font-bold rounded-full text-gray-400">
                ...
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

