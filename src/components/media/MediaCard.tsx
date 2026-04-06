'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Download, ChevronRight } from 'lucide-react';
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
       className={`block bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer ${isGridView ? 'flex flex-col h-full' : 'h-full'}`}>
      <div className={isGridView ? "flex flex-col gap-6 h-full" : "grid md:grid-cols-4 gap-6 h-full"}>
        {/* Image */}
        <div className={isGridView ? "w-full" : "md:col-span-1 flex items-center"}>
          <div className={`${isGridView ? 'h-64' : 'h-48'} w-full bg-[#A69191] rounded-2xl overflow-hidden shrink-0 relative`}>
            <img src={getImageUrl(item.image, item.type)} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
            {item.duration && (
              <div className="absolute bottom-3 right-3 bg-black/80 font-semibold text-white text-xs px-2 py-1 rounded">
                {item.duration}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className={isGridView ? "flex flex-col flex-1 space-y-3" : "md:col-span-3 flex flex-col justify-center space-y-3"}>
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#092C74] transition-colors">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.date}</p>
            </div>
            {download && (
              <Button className="bg-[#E31D1A] hover:bg-[#C11815] shrink-0">
                <Download className="size-4 mr-2" /> Detail {item.type === 'monograf' ? 'Monograf' : item.type === 'buletin' ? 'Buletin' : 'Jurnal'}
              </Button>
            )}
            {!download && item.duration && (
              <Button className="bg-[#092C74] hover:bg-[#2158AE] shrink-0">
                Tonton Video
              </Button>
            )}
            {!download && !item.duration && (
              <Button className="bg-[#092C74] hover:bg-[#2158AE] shrink-0">
                Baca Artikel <ChevronRight className="size-4 ml-1" />
              </Button>
            )}
          </div>
          <p className="text-gray-700 line-clamp-2">{item.description}</p>
          <div className={`flex items-center gap-4 ${isGridView ? "mt-auto pt-4" : "mt-auto"}`}>
            <span className="text-sm text-gray-600">{item.author}</span>
            <span className="px-3 py-1 bg-[#092C74] text-white text-sm rounded-full">{item.category}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
