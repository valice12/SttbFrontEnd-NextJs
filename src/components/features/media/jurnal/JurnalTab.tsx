import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, List, ArrowUpDown, SlidersHorizontal, Calendar as CalendarIcon, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { PublicationCard } from '../shared/PublicationCard';
import { dataService } from '@/lib/data-service';
import { useEffect } from 'react';
import { useDebounce } from '@/lib/use-debounce';

export function JurnalTab() {
  const [isGridView, setIsGridView] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 700);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [date, setDate] = useState<Date | undefined>();

  const itemsPerPage = 10;
  const [items, setItems] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>(['all']);

  useEffect(() => {
    async function loadCategories() {
      try {
        const cats = await dataService.getMediaCategories();
        const extractedCats = (cats || []).map((cat: any) => 
          typeof cat === 'string' ? cat : (cat.categoryName || cat.name || cat.title)
        ).filter(Boolean);
        setCategories(['all', ...extractedCats]);
      } catch (error) {
        console.error("Failed to fetch media categories:", error);
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    async function fetchPaginatedJurnals() {
      try {
        setLoading(true);
        const data = await dataService.getMediaItems('jurnal', {
          page: currentPage,
          pageSize: itemsPerPage,
          search: debouncedSearchQuery || undefined,
          category: selectedCategory === 'all' ? undefined : selectedCategory,
          date: date || undefined,
          orderBy: sortBy === 'date' ? undefined : (sortBy === 'title' ? 'MediaTitle' : 'AuthorName'),
          orderState: sortBy === 'date' ? undefined : 'desc'
        });
        setItems(data?.items || []);
        setTotalItems(data?.totalItems || 0);
        setTotalPages(data?.totalPages || 0);
      } catch (error) {
        console.error("Failed to fetch journals:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPaginatedJurnals();
  }, [currentPage, debouncedSearchQuery, selectedCategory, sortBy, date]);


  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery, selectedCategory, sortBy, date]);

  const paginatedData = items;


  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#092C74]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Header & Filters - Premium Glassmorphism */}
      <div className="flex flex-col gap-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-wrap items-center gap-6"
          >
            <h2 className="text-[2.5rem] md:text-5xl font-black text-[#092C74] tracking-tighter leading-none">Jurnal <span className="text-[#E31D1A]">Stulos</span></h2>
            <div className="h-10 w-px bg-gray-200 hidden md:block" />
            <a href="https://e-journal.sttb.ac.id/index.php/transformatio" target="_blank" rel="noopener noreferrer">
              <Button className="h-12 px-8 bg-[#092C74] hover:bg-[#E31D1A] text-white font-black text-xs uppercase tracking-widest rounded-full shadow-lg shadow-blue-900/10 transition-all duration-500">
                PORTAL OJS <LinkIcon className="ml-2 size-4" />
              </Button>
            </a>
          </motion.div>

        </div>

        <div className="flex flex-col xl:flex-row items-center justify-between gap-8 bg-white/70 backdrop-blur-2xl p-4 rounded-[2.5rem] border border-gray-100 shadow-sm sticky lg:static top-[112px] z-30 transition-all duration-500">
          <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
            <div className="flex items-center gap-3 bg-white hover:bg-[#F2ECF8] rounded-2xl px-6 h-14 shrink-0 w-full sm:w-[200px] border-2 border-gray-50 text-[#092C74] transition-all shadow-sm hover:shadow-md">
              <ArrowUpDown className="size-4 shrink-0 text-[#E31D1A]" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full bg-transparent border-none shadow-none focus:ring-0 font-black uppercase text-xs tracking-widest p-0 text-[#092C74]">
                  <SelectValue placeholder="SORT BY" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-none shadow-2xl">
                  <SelectItem value="date" className="font-bold py-3 uppercase text-[10px] tracking-widest">Terbaru</SelectItem>
                  <SelectItem value="title" className="font-bold py-3 uppercase text-[10px] tracking-widest">Judul</SelectItem>
                  <SelectItem value="category" className="font-bold py-3 uppercase text-[10px] tracking-widest">Kategori</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-3 bg-white hover:bg-[#F2ECF8] rounded-2xl px-6 h-14 shrink-0 w-full sm:w-[200px] border-2 border-gray-50 text-[#092C74] transition-all shadow-sm hover:shadow-md">
              <SlidersHorizontal className="size-4 shrink-0 text-[#E31D1A]" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full bg-transparent border-none shadow-none focus:ring-0 font-black uppercase text-xs tracking-widest p-0 text-[#092C74]">
                  <SelectValue placeholder="CATEGORY" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-none shadow-2xl overflow-hidden">
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
                <button
                  className="flex items-center gap-3 bg-white hover:bg-[#F2ECF8] border-2 border-gray-50 rounded-2xl px-6 h-14 shrink-0 font-black uppercase text-xs tracking-widest w-full sm:w-[200px] transition-all shadow-sm hover:shadow-md text-[#092C74]"
                >
                  <CalendarIcon className="size-4 text-[#E31D1A]" />
                  <span className="truncate">{date ? format(date, "d MMMM yyyy", { locale: id }) : 'DATE'}</span>
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
              <input
                type="text"
                placeholder="CARI JURNAL ATAU PENELITI..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-16 h-14 bg-gray-50 focus:bg-white border-2 border-gray-50 rounded-2xl w-full text-sm font-black uppercase tracking-widest transition-all shadow-sm focus:ring-4 focus:ring-[#092C74]/5 focus:outline-none"
              />
            </div>

            <button
              onClick={() => setIsGridView(!isGridView)}
              className={`size-14 rounded-2xl border-2 transition-all shadow-sm flex items-center justify-center shrink-0 ${isGridView ? 'bg-[#092C74] text-white border-[#092C74]' : 'bg-white text-[#092C74] border-gray-50'}`}
              title={isGridView ? "Lihat List" : "Lihat Grid"}
            >
              {isGridView ? (
                <List className="size-6" />
              ) : (
                <div className="grid grid-cols-2 gap-1">
                  <div className="w-2 h-2 bg-current rounded-sm" />
                  <div className="w-2 h-2 bg-current rounded-sm" />
                  <div className="w-2 h-2 bg-current rounded-sm" />
                  <div className="w-2 h-2 bg-current rounded-sm" />
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Listing */}
      <div className={isGridView ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8" : "space-y-8 max-w-5xl mx-auto"}>
        {paginatedData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={isGridView ? 'flex flex-col h-full' : ''}
          >
            <PublicationCard 
              item={item} 
              download={true} 
              isGridView={isGridView} 
            />
          </motion.div>
        ))}

        {paginatedData.length === 0 && (
          <div className="py-20 text-center col-span-full">
             <Search className="size-16 text-gray-200 mx-auto mb-4" />
             <p className="text-gray-500 font-bold uppercase tracking-widest">Tidak ada jurnal yang ditemukan</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-20 col-span-full w-full">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-14 h-14 flex items-center justify-center text-xl font-black rounded-[1.25rem] transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1 ${page === currentPage
                  ? 'bg-[#092C74] text-white shadow-blue-900/20'
                  : 'bg-white text-gray-400 hover:text-[#092C74] border border-gray-100 hover:border-[#092C74]'
                  }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
