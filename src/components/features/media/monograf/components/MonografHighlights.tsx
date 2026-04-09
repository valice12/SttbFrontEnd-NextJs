'use client';

import { BookOpen, ArrowUpDown, Globe } from 'lucide-react';

export function MonografHighlights() {
  return (
    <section className="bg-[#092C74] rounded-[32px] md:rounded-[64px] p-10 md:p-24 text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(9,44,116,0.3)]">
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none hidden md:block">
        <BookOpen className="size-96" />
      </div>
      <div className="max-w-4xl relative z-10">
        <h2 className="text-3xl md:text-6xl font-black mb-10 md:mb-12 tracking-tight">What's Inside the <br className="hidden md:block"/> Research?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div className="space-y-4 md:space-y-6">
            <div className="size-10 md:size-12 bg-white/10 rounded-2xl flex items-center justify-center text-[#E31D1A]">
              <ArrowUpDown className="size-5 md:size-6" />
            </div>
            <h4 className="text-lg md:text-xl font-black uppercase tracking-tight">Original Scholarship</h4>
            <p className="text-white/60 leading-relaxed font-medium text-sm md:text-base">Buku ini menyajikan hasil penelitian orisinal yang telah melalui proses peer-review ketat oleh tim dewan editor STT Bandung.</p>
          </div>
          <div className="space-y-4 md:space-y-6">
            <div className="size-10 md:size-12 bg-white/10 rounded-2xl flex items-center justify-center text-[#E31D1A]">
              <Globe className="size-5 md:size-6" />
            </div>
            <h4 className="text-lg md:text-xl font-black uppercase tracking-tight">Global Relevance</h4>
            <p className="text-white/60 leading-relaxed font-medium text-sm md:text-base">Perspektif teologis yang ditawarkan relevan dengan perkembangan pelayanan gereja dan isu sosial-budaya di tingkat global.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
