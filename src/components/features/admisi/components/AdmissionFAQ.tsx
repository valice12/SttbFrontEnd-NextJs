'use client';

import { HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FAQCategory {
  name: string;
  items: { q: string; a: string }[];
}

export function AdmissionFAQ() {
  const faqCategories: FAQCategory[] = [
    {
      name: 'Pertimbangan Sebelum Studi',
      items: [
        { q: 'Apa saja yang perlu dipertimbangkan sebelum mendaftar?', a: 'Calon mahasiswa disarankan mempertimbangkan Kualitas Akademik (iman & dosen STTB), Finansial (dukungan sponsor/beasiswa), serta Dukungan (restu keluarga/atasan).' },
      ]
    },
    {
      name: 'Program Studi & Jenjang',
      items: [
        { q: 'Saya lulusan S1 Teologi, program apa yang disarankan?', a: 'Anda disarankan mengambil program Magister Teologi (M.Th.) untuk pengembangan karir di dunia pendidikan teologi.' },
        { q: 'Apakah lulusan S1 Non-Teologi bisa mengambil M.Th.?', a: 'Bisa, melalui jalur Matrikulasi. Khusus lulusan S.Pd.K. dari STTB dapat langsung tanpa matrikulasi.' },
      ]
    },
    {
      name: 'Fasilitas & Sistem Kuliah',
      items: [
        { q: 'Apakah tersedia program beasiswa?', a: 'Ya, STTB menyediakan beasiswa terbatas untuk S1 dan S2. Kontak: beasiswa@sttb.ac.id atau WA +62 815-7127-228.' },
        { q: 'Bagaimana metode perkuliahannya?', a: 'S1 menggunakan Hybrid Learning (Onsite asrama & Online). S2 saat ini dilaksanakan secara Full Online.' },
      ]
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <HelpCircle className="size-12 md:size-16 text-[#092C74] mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-black text-[#092C74]">FAQ Pendaftaran</h2>
            <p className="text-sm md:text-base text-gray-500 mt-2 italic">Informasi lengkap untuk membantu pertimbangan studi Anda</p>
          </div>

          <div className="space-y-10">
            {faqCategories.map((category, idx) => (
              <div key={idx}>
                <h3 className="text-base md:text-lg font-black text-[#E31D1A] mb-4 uppercase tracking-widest flex items-center gap-2">
                  <div className="w-8 h-1 bg-[#E31D1A] rounded-full" /> {category.name}
                </h3>
                <Accordion type="single" collapsible className="space-y-3">
                  {category.items.map((item, i) => (
                    <AccordionItem key={i} value={`cat-${idx}-item-${i}`} className="bg-white border border-gray-200 rounded-2xl px-6 py-1 hover:border-[#092C74] transition-all shadow-sm">
                      <AccordionTrigger className="text-left font-bold text-gray-800 hover:text-[#092C74] hover:no-underline text-sm md:text-base">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 leading-relaxed pb-6 text-sm md:text-base">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
