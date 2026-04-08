'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Download, ChevronRight, BookOpen } from 'lucide-react';
import { getImageUrl } from '@/lib/image-utils';

interface MediaCardProps {
  item: any;
  download?: boolean;
  isGridView?: boolean;
}

export function MediaCard({ item, download = false, isGridView = false }: MediaCardProps) {
  const detailHref = item.type === 'jurnal' 
    ? `/media/jurnal/${item.slug}` 
    : item.type === 'artikel' 
    ? `/media/artikel/${item.slug}` 
    : item.type === 'monograf'
    ? `/media/monograf/${item.slug}`
    : item.type === 'buletin'
    ? `/media/buletin/${item.slug}`
    : `/media/${item.slug}`;

  return (
    <Link href={detailHref}
       className={`group block bg-white border border-gray-100 rounded-[2.5rem] p-6 lg:p-8 hover:shadow-[0_40px_80px_rgba(9,44,116,0.08)] hover:-translate-y-2 transition-all duration-700 cursor-pointer ${isGridView ? 'flex flex-col h-full' : 'h-full'}`}>
      <div className={isGridView ? "flex flex-col gap-6 h-full" : "grid md:grid-cols-4 gap-6 h-full"}>
        <div className={isGridView ? "w-full" : "md:col-span-1 flex items-center"}>
          <div className={`${isGridView ? 'h-72' : 'h-64'} w-full rounded-[2rem] overflow-hidden shrink-0 shadow-lg relative bg-[#A69191]`}>
            <img 
              src={getImageUrl(item.image, item.type)} 
              alt={item.title} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            
            {item.duration && (
              <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md font-black text-white text-[10px] px-3 py-1.5 rounded-full uppercase tracking-widest">
                {item.duration}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className={isGridView ? "flex flex-col flex-1 space-y-4" : "md:col-span-3 flex flex-col justify-center space-y-6"}>
          <div className="flex flex-col xl:flex-row justify-between items-start gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-5 py-1.5 bg-[#F2ECF8] text-[#092C74] text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-50/50">
                   {item.type?.toUpperCase() || 'PUBLIKASI'}
                </span>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.date}</p>
              </div>
              <h3 className="text-2xl lg:text-3xl font-black text-[#092C74] group-hover:text-[#E31D1A] transition-colors leading-tight tracking-tight">
                {item.title}
              </h3>
            </div>
            
            <div className="flex shrink-0">
              {download && (
                <Button className="h-14 px-8 bg-[#E31D1A] hover:bg-[#092C74] text-white font-black text-sm rounded-2xl shadow-xl shadow-red-900/10 transition-all duration-500">
                  <Download className="size-4 mr-2" /> 
                  DETAIL {item.type?.toUpperCase()}
                </Button>
              )}
              {!download && item.duration && (
                <Button className="h-14 px-8 bg-[#092C74] hover:bg-[#E31D1A] text-white font-black text-sm rounded-2xl shadow-xl shadow-blue-900/10 transition-all duration-500">
                  TONTON VIDEO
                </Button>
              )}
              {!download && !item.duration && (
                <Button className="h-14 px-8 bg-[#092C74] hover:bg-[#6A0DAD] text-white font-black text-sm rounded-2xl shadow-xl shadow-blue-900/10 transition-all duration-500">
                  BACA ARTIKEL <ChevronRight className="size-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
          <p className="text-gray-500 font-medium leading-relaxed line-clamp-2 italic">
            {item.description}
          </p>
          <div className={`mt-auto pt-6 border-t border-gray-50 flex items-center justify-between ${isGridView ? "" : ""}`}>
            <div className="flex items-center gap-3">
               <div className="size-10 bg-[#092C74] rounded-xl flex items-center justify-center text-white shadow-lg">
                  <BookOpen className="size-5" />
               </div>
               <div>
                  <p className="text-[10px] font-black text-[#092C74] uppercase tracking-widest">{item.author || "STT Bandung"}</p>
                  <p className="text-[9px] font-bold text-gray-400">Academic Contribution</p>
               </div>
            </div>
            <span className="px-4 py-1.5 bg-gray-50 text-[#6A0DAD] text-[9px] font-black uppercase tracking-widest rounded-lg border border-gray-100">
              {item.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
