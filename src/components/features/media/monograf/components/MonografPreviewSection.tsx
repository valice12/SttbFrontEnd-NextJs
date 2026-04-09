'use client';

import { Globe } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PDFViewer } from '@/components/features/media/shared/PDFViewer';

interface MonografPreviewSectionProps {
  monograf: any;
}

export function MonografPreviewSection({ monograf }: MonografPreviewSectionProps) {
  return (
    <div className="lg:col-span-2">
      {monograf.link ? (
        <div className="bg-white rounded-[32px] p-2 shadow-2xl border border-gray-100 overflow-hidden relative group">
          <div className="p-6 md:p-8 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-lg md:text-xl font-black text-[#003049] uppercase tracking-tight">Interactive PDF Preview</h2>
            <div className="flex items-center gap-2">
              <div className="size-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-gray-400 uppercase hidden md:inline">Full Version Available</span>
            </div>
          </div>
          <PDFViewer url={monograf.link} title={monograf.title} />
        </div>
      ) : (
        <div className="h-[400px] md:h-[600px] bg-gray-50 rounded-[32px] flex items-center justify-center p-8 md:p-12 text-center border-2 border-dashed border-gray-200">
          <div className="max-w-xs">
            <Globe className="size-12 md:size-16 text-gray-200 mx-auto mb-6" />
            <h3 className="text-xl md:text-2xl font-black text-gray-300 uppercase tracking-tighter">Preview Not Available</h3>
            <p className="text-xs md:text-sm text-gray-400 mt-4">This monograph is currently available in physical format. Please contact STTB Press for more information.</p>
            <Link href="/media/monograf">
              <Button variant="outline" className="mt-8 rounded-xl font-bold border-gray-200 text-xs uppercase">Browse Other Books</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
