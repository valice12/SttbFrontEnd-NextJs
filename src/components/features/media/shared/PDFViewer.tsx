'use client';

import { useState } from 'react';
import { 
  FileText, 
  Maximize2, 
  Download, 
  Loader2, 
  AlertCircle,
  ExternalLink,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';

interface PDFViewerProps {
  url: string;
  title?: string;
}

export function PDFViewer({ url, title = "Document Preview" }: PDFViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleOpenFullscreen = () => {
    window.open(url, '_blank', 'noreferrer');
  };

  if (!url) return null;

  return (
    <div className="w-full space-y-6">
      {!showPreview ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-[#092C74] to-[#003049] rounded-[2.5rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden group border border-white/10"
        >
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-125 transition-transform duration-1000" />
          
          <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto">
            <div className="w-24 h-24 bg-white/10 rounded-[2rem] flex items-center justify-center mb-8 backdrop-blur-md border border-white/20 shadow-2xl group-hover:rotate-12 transition-transform">
              <FileText className="w-12 h-12 text-[#D4AF37]" />
            </div>
            <h3 className="text-3xl font-black tracking-tighter uppercase mb-3">Baca Online</h3>
            <p className="text-white/60 font-medium mb-10 leading-relaxed">
              Dokumen PDF siap ditampilkan. Nikmati pengalaman membaca yang jernih langsung di browser Anda.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
              <Button 
                onClick={() => setShowPreview(true)}
                className="w-full sm:flex-1 h-16 rounded-2xl bg-[#D4AF37] hover:bg-[#B8962E] text-[#092C74] font-black uppercase tracking-widest text-xs shadow-xl shadow-[#D4AF37]/20 transition-all active:scale-95 flex items-center gap-3"
              >
                Buka Previewer <Maximize2 className="w-4 h-4" />
              </Button>
              <a href={url} download className="w-full sm:flex-1">
                <Button 
                  variant="outline"
                  className="w-full h-16 rounded-2xl border-white/20 bg-white/5 text-white hover:bg-white hover:text-[#092C74] font-black uppercase tracking-widest text-xs transition-all flex items-center gap-3"
                >
                  Download PDF <Download className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl overflow-hidden flex flex-col h-[700px] md:h-[850px] relative group"
        >
          {/* Header Bar */}
          <div className="bg-[#092C74] p-4 md:px-8 flex items-center justify-between text-white border-b border-white/5">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#D4AF37]" />
               </div>
               <div className="hidden sm:block">
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-0.5">PDF PREVIEWER</p>
                  <p className="text-xs font-bold truncate max-w-[200px] md:max-w-[400px]">{title}</p>
               </div>
            </div>
            
            <div className="flex items-center gap-2">
               <Button 
                variant="ghost" 
                size="sm"
                onClick={handleOpenFullscreen}
                className="text-white hover:bg-white/10 gap-2 font-bold text-[10px] uppercase tracking-widest"
               >
                 <Maximize2 className="w-4 h-4" /> Fullscreen
               </Button>
               <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowPreview(false)}
                className="text-white/60 hover:text-white hover:bg-white/10 font-bold text-[10px] uppercase tracking-widest"
               >
                 Tutup
               </Button>
            </div>
          </div>

          {/* PDF Viewer Area */}
          <div className="flex-1 bg-gray-50 relative">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50/80 backdrop-blur-sm z-10">
                <Loader2 className="w-10 h-10 text-[#092C74] animate-spin mb-4" />
                <p className="text-xs font-black uppercase tracking-widest text-gray-400">Loading Document...</p>
              </div>
            )}
            
            {hasError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50 p-10 text-center">
                 <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                 <h4 className="text-xl font-black text-gray-900 uppercase mb-2">Gagal Memuat PDF</h4>
                 <p className="text-sm text-gray-500 mb-8 max-w-sm">File mungkin tidak dapat ditampilkan di browser ini atau URL tidak valid.</p>
                 <Button 
                  onClick={handleOpenFullscreen}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold gap-2"
                 >
                   Buka di Tab Baru <ExternalLink className="w-4 h-4" />
                 </Button>
              </div>
            ) : (
              <object
                data={url}
                type="application/pdf"
                className="w-full h-full border-none"
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false);
                  setHasError(true);
                }}
              >
                {/* Fallback for browsers that don't support object/pdf */}
                <iframe 
                  src={`https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`}
                  className="w-full h-full border-none"
                  onLoad={() => setIsLoading(false)}
                />
              </object>
            )}
          </div>

          {/* Bottom Bar Info */}
          <div className="bg-gray-50/50 p-4 border-t border-gray-100 flex items-center justify-center gap-3">
             <Info className="w-4 h-4 text-[#092C74] opacity-40" />
             <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest italic">
                Scroll untuk membaca halaman berikutnya. Gunakan tombol Fullscreen untuk kenyamanan maksimal.
             </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
