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
import { MonografPreviewSection } from './components/MonografPreviewSection';
import { MonografHighlights } from './components/MonografHighlights';

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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Monograf tidak ditemukan</h2>
          <Link href="/media/monograf">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="size-4" /> Kembali ke Monograf
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-32">
      {/* Premium Header / Breadcrumb */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8">
          <Link href="/media" className="hover:text-[#092C74] transition-colors">Media</Link>
          <ChevronRight className="size-3 opacity-30" />
          <Link href="/media/monograf" className="hover:text-[#092C74] transition-colors">Monograf</Link>
          <ChevronRight className="size-3 opacity-30" />
          <span className="text-[#E31D1A] truncate max-w-[200px]">{monograf.title}</span>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Main Book Showcase Card */}
        <MonografShowcase monograf={monograf} />

        {/* Extended Data Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto mb-32">
          {/* Metadata Sidebar */}
          <div className="lg:col-span-1">
            <MonografMetadata monograf={monograf} />
          </div>

          {/* PDF Viewer Section */}
          <MonografPreviewSection monograf={monograf} />
        </div>

        {/* Section: Why Read This? / Highlights */}
        <div className="max-w-6xl mx-auto">
          <MonografHighlights />
        </div>
      </div>
    </div>
  );
}
