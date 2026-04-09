'use client';

import { Book } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MonografMetadataProps {
  monograf: any;
}

export function MonografMetadata({ monograf }: MonografMetadataProps) {
  return (
    <div className="bg-white rounded-[32px] p-8 md:p-10 border border-gray-100 shadow-xl shadow-gray-100/50 space-y-8 h-full">
      <h3 className="text-sm font-black text-[#003049] uppercase tracking-widest flex items-center gap-3">
        <Book className="size-5 text-[#E31D1A]" /> Book Metadata
      </h3>
      
      <div className="space-y-6">
        <div className="flex justify-between border-b border-gray-50 pb-4">
          <span className="text-xs font-bold text-gray-400 uppercase">ISBN-13</span>
          <span className="text-xs font-black text-[#092C74]">{monograf.isbn || '978-XXXXXXXXXX'}</span>
        </div>
        <div className="flex justify-between border-b border-gray-50 pb-4">
          <span className="text-xs font-bold text-gray-400 uppercase">Publisher</span>
          <span className="text-xs font-black text-[#092C74]">STTB Press</span>
        </div>
        <div className="flex justify-between border-b border-gray-50 pb-4">
          <span className="text-xs font-bold text-gray-400 uppercase">Access Type</span>
          <span className="text-[10px] font-black bg-green-100 text-green-700 px-3 py-1 rounded-full uppercase">Open Access</span>
        </div>
      </div>

      <div className="pt-4">
        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Official Citation (APA)</h4>
        <div className="bg-gray-50 rounded-2xl p-6 text-[10px] leading-relaxed text-gray-600 font-medium break-words">
          {monograf.author || 'Contributor'}. (2026). <span className="italic">{monograf.title}</span>. Bandung: STTB Press.
        </div>
        <Button variant="link" className="text-[10px] font-black text-[#E31D1A] p-0 h-auto mt-4 uppercase">Copy Text Citation</Button>
      </div>
    </div>
  );
}
