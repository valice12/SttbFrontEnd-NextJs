'use client';

import Link from 'next/link';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
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
  location 
}: MediaCardProps) {
  const baseUrl = type === 'news' ? '/berita' : '/kegiatan';
  
  const formatDate = (dateStr: string) => {
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <Link href={`${baseUrl}/${slug}`} className="block h-full group">
      <Card className="h-full flex flex-col overflow-hidden border-0 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-10px_rgba(9,44,116,0.15)] transition-all duration-500 rounded-[2.5rem] relative">
        <div className="relative overflow-hidden aspect-[4/3] shrink-0">
          <ImageWithFallback
            src={getImageUrl(image, type)}
            alt={title}
            className="size-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-[#092C74]/0 group-hover:bg-[#092C74]/10 transition-colors duration-500" />
          
          <div className="absolute top-6 left-6">
            <Badge className="bg-[#1C64E8] hover:bg-[#E31D1A] text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border-0 shadow-lg transition-colors">
              {category}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-8 flex flex-col grow">
          <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-[#E31D1A]" />
              <span>{formatDate(date)}</span>
            </div>
            {time && (
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-[#E31D1A]" />
                <span>{time}</span>
              </div>
            )}
          </div>
          
          {location && (
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-4">
              <MapPin className="size-4 text-[#1C64E8]" />
              <span className="truncate">{location}</span>
            </div>
          )}
          
          <h3 className="text-2xl font-black mb-4 text-[#092C74] leading-tight group-hover:text-[#E31D1A] transition-colors line-clamp-2">
            {title}
          </h3>
          
          <p className="text-gray-600 line-clamp-3 leading-relaxed mb-6 font-medium">
            {description}
          </p>
          
          <div className="mt-auto flex items-center gap-2 text-sm font-black text-[#1C64E8] group-hover:text-[#E31D1A] transition-all tracking-widest uppercase">
            Selengkapnya 
            <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
