import { Book, Building2, Tag, ShoppingCart, MessageSquare, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MonografMetadataProps {
  monograf: any;
}

export function MonografMetadata({ monograf }: MonografMetadataProps) {
  return (
    <div className="bg-white rounded-[32px] p-8 md:p-10 border border-gray-100 shadow-xl shadow-gray-100/50 space-y-8 h-fit lg:sticky lg:top-32 transition-all">
      <h3 className="text-sm font-black text-[#003049] uppercase tracking-widest flex items-center gap-3">
        <Book className="size-5 text-[#E31D1A]" /> Book Information
      </h3>
      
      <div className="space-y-6">
        <div className="flex flex-col gap-1 border-b border-gray-50 pb-4">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <Tag className="size-3" /> ISBN-13
          </span>
          <span className="text-sm font-black text-[#092C74]">{monograf.isbn || '978-XXXXXXXXXX'}</span>
        </div>

        <div className="flex flex-col gap-1 border-b border-gray-50 pb-4">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <Building2 className="size-3" /> Publisher
          </span>
          <span className="text-sm font-black text-[#092C74]">STTB Press</span>
        </div>

        <div className="flex flex-col gap-1 border-b border-gray-50 pb-4">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <ShoppingCart className="size-3" /> Price
          </span>
          <span className="text-lg font-black text-[#E31D1A]">
            {monograf.price && monograf.price > 0 
              ? `Rp ${new Intl.NumberFormat('id-ID').format(monograf.price)}` 
              : 'IDR 0'}
          </span>
        </div>

        <div className="flex flex-col gap-1 border-b border-gray-50 pb-4">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <MessageSquare className="size-3" /> Purchase Contact
          </span>
          <span className="text-sm font-black text-[#092C74]">{monograf.contact || 'Hubungi Admin STTB'}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <ShieldCheck className="size-3" /> Rights & Access
          </span>
          <span className="text-[10px] font-black bg-green-100 text-green-700 px-3 py-1.5 rounded-full uppercase w-fit mt-1">Open Access</span>
        </div>
      </div>

      <div className="pt-4 mt-8 border-t border-gray-100">
        <p className="text-[9px] leading-relaxed text-gray-400 font-bold uppercase tracking-widest text-center">
          © {new Date().getFullYear()} Sekolah Tinggi Teologi Bandung
        </p>
      </div>
    </div>
  );
}
