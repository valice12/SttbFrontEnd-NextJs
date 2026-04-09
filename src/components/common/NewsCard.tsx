'use client';

import Link from 'next/link';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { getImageUrl } from '@/lib/image-utils';

interface MediaCardProps {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  image: string;
  slug: string;
  type: 'news' | 'event';
  time?: string;
  location?: string;
  variant?: 'default' | 'compact' | 'list';
}

export function MediaCard({ 
  title, 
  category, 
  date, 
  description, 
  image, 
  slug, 
  type,
  time,
  location,
  variant = 'default'
}: MediaCardProps) {
  const baseUrl = type === 'news' ? '/berita' : '/kegiatan';
  
  const formatDate = (dateStr: string) => {
    try {
      const dateObj = new Date(dateStr);
      return dateObj.toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      });
    } catch {
      return dateStr;
    }
  };

  if (variant === 'compact') {
    return (
      <Link href={`${baseUrl}/${slug}`} className="block h-full group">
        <Card className="h-full flex flex-row items-center p-3 gap-4 overflow-hidden border-0 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-10px_rgba(9,44,116,0.15)] transition-all duration-500 rounded-2xl md:rounded-3xl relative">
          <div className="relative overflow-hidden shrink-0 size-20 md:size-24 rounded-2xl">
            <ImageWithFallback
              src={getImageUrl(image, type)}
              alt={title}
              className="size-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          </div>
          <CardContent className="flex flex-col grow p-0 gap-1">
            <div className="flex items-center gap-2 text-[8px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              <Calendar className="size-3 text-[#E31D1A]" />
              <span>{formatDate(date)}</span>
            </div>
            <h3 className="font-black text-[#092C74] leading-tight group-hover:text-[#E31D1A] transition-colors line-clamp-2 text-xs md:text-sm">
              {title}
            </h3>
            <Badge className="w-fit bg-[#1C64E8]/10 text-[#1C64E8] px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider border-0 shadow-none mt-1">
              {category}
            </Badge>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`${baseUrl}/${slug}`} className="block h-full group">
      <Card className={`h-full flex overflow-hidden border-0 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-10px_rgba(9,44,116,0.15)] transition-all duration-500 rounded-[1.5rem] md:rounded-[2.5rem] relative ${variant === 'list' ? 'flex-row items-center p-3 md:p-0 md:items-stretch gap-4 md:gap-0' : 'flex-col'}`}>
        <div className={`relative overflow-hidden shrink-0 ${variant === 'list' ? 'size-20 rounded-xl md:rounded-none md:size-auto md:w-[40%] aspect-square md:aspect-auto' : 'aspect-[16/10]'}`}>
          <ImageWithFallback
            src={getImageUrl(image, type)}
            alt={title}
            className="size-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-[#092C74]/0 group-hover:bg-[#092C74]/10 transition-colors duration-500" />
          
          <div className={`absolute top-6 left-6 ${variant === 'list' ? 'hidden md:block' : 'block'}`}>
            <Badge className="bg-[#1C64E8] hover:bg-[#E31D1A] text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border-0 shadow-lg transition-colors">
              {category}
            </Badge>
          </div>
        </div>
        
        <CardContent className={`flex flex-col grow ${variant === 'list' ? 'p-0 md:p-10 md:justify-center' : 'p-8'}`}>
          <div className={`flex items-center gap-4 text-gray-400 uppercase tracking-widest ${variant === 'list' ? 'text-[8px] md:text-xs font-bold mb-1 md:mb-4' : 'text-xs font-bold mb-4'}`}>
            <div className="flex items-center gap-1.5">
              <Calendar className={`text-[#E31D1A] ${variant === 'list' ? 'size-3 md:size-4' : 'size-4'}`} />
              <span>{formatDate(date)}</span>
            </div>
            {(time || variant === 'list') && (
              <div className="flex items-center gap-2">
                <Clock className={`text-[#E31D1A] ${variant === 'list' ? 'size-3 md:size-4' : 'size-4'}`} />
                <span>{time || '5 MIN READ'}</span>
              </div>
            )}
          </div>
          
          <h3 className={`font-black text-[#092C74] leading-tight group-hover:text-[#E31D1A] transition-colors line-clamp-2 ${variant === 'list' ? 'text-xs md:text-3xl mb-1 md:mb-4' : 'text-2xl mb-4'}`}>
            {title}
          </h3>
          
          <div className={variant === 'list' ? 'hidden md:block' : 'block'}>
            <p className="text-gray-600 line-clamp-3 leading-relaxed mb-6 font-medium">
              {description}
            </p>
            
            <div className="mt-auto flex items-center gap-2 text-sm font-black text-[#1C64E8] group-hover:text-[#E31D1A] transition-all tracking-widest uppercase">
              Selengkapnya 
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </div>
          </div>

          {variant === 'list' && (
            <Badge className="md:hidden w-fit bg-[#1C64E8]/10 text-[#1C64E8] px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider border-0 shadow-none mt-1">
              {category}
            </Badge>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
