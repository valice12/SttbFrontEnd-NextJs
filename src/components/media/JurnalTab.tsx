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
import { MediaCard } from './MediaCard';
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
      {/* Header & Filters */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex w-full md:w-auto items-center">
            <h2 className="text-4xl font-extrabold text-[#092C74] title-font uppercase">Jurnal Stulos</h2>
            <a href="https://e-journal.sttb.ac.id/index.php/transformatio" target="_blank" rel="noopener noreferrer" className="ml-6 hidden sm:block">
              <Button variant="outline" className="text-[#092C74] border-[#092C74] hover:bg-[#F2ECF8] rounded-full px-6">
                Portal OJS <LinkIcon className="ml-2 size-4" />
              </Button>
            </a>
          </div>

          <div className="hidden md:block">
            <button
              onClick={() => setIsGridView(!isGridView)}
              className="p-4 bg-white border border-[#092C74]/20 hover:border-[#092C74] shadow-sm rounded-full hover:bg-[#F2ECF8] transition-colors shrink-0 flex items-center justify-center w-[54px] h-[54px]"
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

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-3 bg-white hover:bg-[#F2ECF8] rounded-full px-6 py-2 shrink-0 w-full sm:w-[200px] border border-[#092C74] text-[#092C74] transition-colors">
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

            <div className="flex items-center gap-3 bg-white hover:bg-[#F2ECF8] rounded-full px-6 py-2 shrink-0 w-full sm:w-[200px] border border-[#092C74] text-[#092C74] transition-colors">
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

            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="flex items-center gap-3 bg-white hover:bg-[#F2ECF8] border border-[#092C74] rounded-full px-6 py-3 shrink-0 font-semibold z-10 relative cursor-pointer outline-none w-full sm:w-[200px] transition-colors text-[#092C74]"
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

          <div className="relative w-full md:max-w-md shadow-sm rounded-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#092C74]" />
            <input
              type="text"
              placeholder="Cari Jurnal Stulos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 bg-gray-50 border border-[#092C74]/20 focus:border-[#092C74] text-[#092C74] placeholder:text-[#092C74]/60 rounded-full py-3.5 w-full focus:outline-none focus:ring-1 focus:ring-[#092C74]"
            />
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
            <MediaCard 
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
          <div className="flex justify-center items-center gap-4 mt-12 col-span-full w-full">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-12 h-12 flex items-center justify-center text-lg font-bold rounded-full transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 ${page === currentPage
                  ? 'bg-[#092C74] text-white'
                  : 'bg-[#f8f9fa] text-gray-700 hover:bg-[#F2ECF8] border border-gray-200 hover:border-[#092C74] select-none hover:text-[#092C74]'
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
