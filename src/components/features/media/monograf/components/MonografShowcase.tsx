'use client';

import { motion } from 'motion/react';
import { Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getImageUrl } from '@/lib/image-utils';

interface MonografShowcaseProps {
  monograf: any;
}

export function MonografShowcase({ monograf }: MonografShowcaseProps) {
  return (
    <section className="max-w-6xl mx-auto mb-12 md:mb-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 bg-white rounded-[2.5rem] md:rounded-[48px] p-6 sm:p-8 md:p-12 shadow-2xl shadow-gray-200/60 border border-gray-100 overflow-hidden relative"
      >
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-1/2 lg:h-full bg-gradient-to-b lg:bg-gradient-to-l from-gray-50/50 to-transparent pointer-events-none" />

        {/* Left Col: The Cover */}
        <div className="lg:col-span-4 flex justify-center relative z-10">
          <div className="relative group w-full max-w-[280px] sm:max-w-[320px]">
            <div className="aspect-[3/4.5] rounded-3xl overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] md:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] transition-transform duration-700 group-hover:translate-y-[-10px] bg-gray-100">
              <img 
                src={getImageUrl(monograf.image, 'monograf')} 
                alt={monograf.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right Col: Info & Synopsis */}
        <div className="lg:col-span-8 flex flex-col justify-center relative z-10">
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 md:gap-3 mb-6">
              {(Array.isArray(monograf.category) ? monograf.category : [monograf.category || 'Monograf']).map((cat: string, i: number) => (
                <span key={i} className="bg-[#092C74]/10 text-[#092C74] px-4 py-1.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                   <Tag className="size-3" /> {cat}
                </span>
              ))}
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-black text-[#003049] mb-6 leading-[1.15] md:leading-[1.1] tracking-tight">
              {monograf.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-600 mb-8 p-3 md:p-4 bg-gray-50 rounded-2xl inline-flex max-w-full">
              <div className="size-8 md:size-10 bg-[#092C74] rounded-full flex items-center justify-center text-white font-black text-xs md:text-sm shadow-lg shrink-0">
                {monograf.author?.charAt(0) || 'K'}
              </div>
              <div className="min-w-0">
                <p className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Author / Researcher</p>
                <p className="text-xs md:text-sm font-bold text-gray-900 truncate">{monograf.author || 'Kontributor Akademik STTB'}</p>
              </div>
            </div>
          </div>

          <div className="relative mb-8 md:mb-10">
            <h4 className="text-[10px] md:text-xs font-black text-[#E31D1A] uppercase tracking-[0.3em] mb-4">Sinopsis Monograf</h4>
            <div className="text-gray-700 leading-relaxed md:leading-[1.8] text-base md:text-lg font-medium italic border-l-4 border-[#092C74] pl-5 md:pl-8 py-2 max-w-2xl bg-gray-50/50 rounded-r-2xl pr-4">
              "{monograf.description || monograf.synopsis || "Belum ada sinopsis untuk karya monograf ini."}"
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
