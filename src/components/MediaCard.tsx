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
    <Link href={`${baseUrl}/${slug}`} className="block h-full">
      <Card className="group h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white">
        <div className="relative overflow-hidden aspect-[16/9] shrink-0">
          <ImageWithFallback
            src={getImageUrl(image, type)}
            alt={title}
            className="size-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <Badge className="bg-[#1C64E8] hover:bg-[#75B4F9] text-white border-0">
              {category}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-5 flex flex-col grow">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="size-4" />
              <span>{formatDate(date)}</span>
            </div>
            {time && (
              <div className="flex items-center gap-1">
                <Clock className="size-4" />
                <span>{time}</span>
              </div>
            )}
          </div>
          
          {location && (
            <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
              <MapPin className="size-4" />
              <span>{location}</span>
            </div>
          )}
          
          <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-[#1C64E8] transition-colors line-clamp-2">
            {title}
          </h3>
          
          <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
            {description}
          </p>
          
          <div className="mt-auto inline-block text-sm font-semibold text-[#1C64E8] group-hover:text-[#FE5C36] transition-colors">
            Selengkapnya →
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
