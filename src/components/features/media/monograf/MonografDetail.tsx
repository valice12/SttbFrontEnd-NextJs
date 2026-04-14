'use client';

import { useParams } from 'next/navigation';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { dataService } from '@/lib/data-service';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

// Sub-components
import { MonografShowcase } from './components/MonografShowcase';
import { MonografMetadata } from './components/MonografMetadata';
import { MonografHighlights } from './components/MonografHighlights';
const bgPattern = "/assets/Page-Panjang-1.webp";

export function MonografDetail() {
  const { slug } = useParams();
  const [monograf, setMonograf] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      try {
        setLoading(true);
        const item = await dataService.getMonografDetail(slug as string);
        setMonograf(item);
      } catch (error) {
        console.error("Failed to fetch monograf detail:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E31D1A]"></div>
      </div>
    );
  }

  if (!monograf) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-black text-[#092C74] mb-4 uppercase tracking-tighter">Monograf tidak ditemukan</h2>
          <Link href="/media?tab=monograf">
            <Button variant="outline" className="gap-2 font-black uppercase tracking-widest text-[10px] rounded-xl px-6">
              <ArrowLeft className="size-4" /> Kembali ke monograf
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-[#FDFDFD] pb-32 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgPattern})` }}
    >
      {/* Premium Header / Breadcrumb */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8">
          <Link href="/media" className="hover:text-[#092C74] transition-colors">Media</Link>
          <ChevronRight className="size-3 opacity-30" />
          <Link href="/media?tab=monograf" className="hover:text-[#092C74] transition-colors">Monograf</Link>
          <ChevronRight className="size-3 opacity-30" />
          <span className="text-[#E31D1A] truncate max-w-[200px]">{monograf.title}</span>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-7xl mx-auto">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-12">
            <MonografShowcase monograf={monograf} />
            
            {/* Section: Why Read This? / Highlights */}
            <div className="animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-300">
              <MonografHighlights />
            </div>
          </div>

          {/* Sidebar Metadata */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <MonografMetadata monograf={monograf} />
          </div>
        </div>
      </div>

    </div>
  );
}
