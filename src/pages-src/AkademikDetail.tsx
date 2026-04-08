'use client';

import { useParams } from 'next/navigation';
import { motion } from 'motion/react';
import { GraduationCap, Clock, BookOpen, Target, ChevronDown, CheckCircle2, Award, Layers } from 'lucide-react';
import { useState, useEffect } from 'react';
const bgHeader = "/assets/header-faq.png"; 
import { dataService } from '@/lib/data-service';
import { AcademicDto, CurriculumCategory, Lecture } from '@/types';

export function AkademikDetail() {
  const { slug } = useParams();
  const [openCategory, setOpenCategory] = useState<number | null>(0);
  const [programData, setProgramData] = useState<AcademicDto | null>(null);
  const [curriculum, setCurriculum] = useState<CurriculumCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      try {
        setLoading(true);
        const [data, curr] = await Promise.all([
          dataService.getAcademicProgram(slug as string),
          dataService.getAcademicCurriculum(slug as string)
        ]);
        setProgramData(data);
        setCurriculum(curr || []);
      } catch (error) {
        console.error("Failed to fetch academic data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#092C74]"></div>
      </div>
    );
  }

  // Fallback for completely unknown slugs
  if (!programData) {
    return (
      <div className="min-h-screen bg-white">
        <section className="relative text-white py-20 overflow-hidden">
          <div className="absolute inset-0">
            <img src={bgHeader} alt="Program Akademik" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#092C74]/80 mix-blend-multiply" />
          </div>
          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4 uppercase">Program Studi</h1>
            <p className="text-xl">Informasi detail mengenai program studi {slug} tidak ditemukan.</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <section className="relative text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={bgHeader} alt={programData.programName} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#092C74]/90 mix-blend-multiply" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-5 py-2 bg-[#E31D1A] text-white font-bold rounded-full mb-6 tracking-widest text-sm shadow-lg">{programData.degree} Program</span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">{programData.programName || (programData as any).title}</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              {programData.programDescription || (programData as any).description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Info Cards - Rest of the modern layout remains enhanced as it doesn't affect Hero */}
      <section className="-mt-12 relative z-20 container mx-auto px-4 mb-32">
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/70 backdrop-blur-3xl p-12 rounded-[3.5rem] shadow-[0_40px_80px_rgba(9,44,116,0.08)] flex flex-col items-center text-center border border-white group hover:translate-y-[-10px] transition-all duration-700"
          >
            <div className="size-24 bg-[#092C74]/5 rounded-[2rem] flex items-center justify-center mb-8 shadow-inner group-hover:bg-[#092C74] group-hover:rotate-[15deg] transition-all duration-700">
              <BookOpen className="size-12 text-[#092C74] group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-black text-xs tracking-[0.2em] uppercase text-gray-400 mb-4 tracking-widest">Jumlah Kredit</h3>
            <p className="text-5xl font-black text-[#092C74] tracking-tighter mb-2">{programData.totalCredits || (programData as any).totalCredit}</p>
            <p className="text-sm font-black text-[#E31D1A] uppercase tracking-widest">Satuan Kredit Semester</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/70 backdrop-blur-3xl p-12 rounded-[3.5rem] shadow-[0_40px_80px_rgba(9,44,116,0.08)] flex flex-col items-center text-center border border-white group hover:translate-y-[-10px] transition-all duration-700"
          >
            <div className="size-24 bg-[#E31D1A]/5 rounded-[2rem] flex items-center justify-center mb-8 shadow-inner group-hover:bg-[#E31D1A] group-hover:rotate-[15deg] transition-all duration-700">
              <Clock className="size-12 text-[#E31D1A] group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-black text-xs tracking-[0.2em] uppercase text-gray-400 mb-4 tracking-widest">Masa Studi</h3>
            <p className="text-5xl font-black text-[#092C74] tracking-tighter mb-2">{programData.duration.split(' ')[0]}</p>
            <p className="text-sm font-black text-[#E31D1A] uppercase tracking-widest">{programData.duration.split(' ').slice(1).join(' ') || 'Semester'}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/70 backdrop-blur-3xl p-12 rounded-[3.5rem] shadow-[0_40px_80px_rgba(9,44,116,0.08)] flex flex-col items-center text-center border border-white group hover:translate-y-[-10px] transition-all duration-700"
          >
            <div className="size-24 bg-[#092C74]/5 rounded-[2rem] flex items-center justify-center mb-8 shadow-inner group-hover:bg-[#092C74] group-hover:rotate-[15deg] transition-all duration-700">
              <Target className="size-12 text-[#092C74] group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-black text-xs tracking-[0.2em] uppercase text-gray-400 mb-4 tracking-widest">Ethos</h3>
            <p className="text-2xl font-black text-[#092C74] italic leading-tight px-4 group-hover:scale-105 transition-transform duration-500">
              "{programData.motto}"
            </p>
          </motion.div>
        </div>
      </section>

      {/* Details Section */}
      <section className="container mx-auto px-4 mb-32">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Persyaratan */}
          <div className="bg-white p-14 rounded-[3rem] shadow-xl border border-gray-50 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                <Scroll className="size-64" />
             </div>
            <h2 className="text-4xl font-black mb-12 flex items-center gap-6 text-[#092C74] tracking-tighter">
              <div className="w-3 h-10 bg-[#E31D1A] rounded-full" />
              Persyaratan
            </h2>
            <ul className="space-y-6 relative z-10">
              {programData.programRequirements.map((req: string, i: number) => (
                <li key={i} className="flex items-start gap-6 group">
                  <div className="size-8 rounded-xl bg-gray-50 text-[#E31D1A] flex items-center justify-center shrink-0 mt-1 transition-all group-hover:bg-[#E31D1A] group-hover:text-white shadow-inner">
                     <CheckCircle2 className="size-4" />
                  </div>
                  <span className="text-xl text-gray-600 font-medium leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sistem Perkuliahan */}
          <div className="bg-[#092C74] text-white p-14 rounded-[3rem] shadow-2xl relative overflow-hidden group">
            <GraduationCap className="absolute top-0 right-0 size-80 text-white opacity-[0.03] translate-x-20 -translate-y-20 group-hover:rotate-12 transition-transform duration-[2s]" />
            <h2 className="text-4xl font-black mb-12 flex items-center gap-6 tracking-tighter">
              <div className="w-3 h-10 bg-[#E31D1A] rounded-full" />
              Sistem Perkuliahan
            </h2>
            <ul className="space-y-6 relative z-10">
              {programData.lecturingSystem.map((sys: string, i: number) => (
                <li key={i} className="flex items-start gap-6">
                  <div className="size-3 bg-[#E31D1A] rounded-full shrink-0 mt-3 shadow-[0_0_15px_rgba(227,29,26,0.5)]" />
                  <span className="text-xl text-blue-50 font-medium leading-relaxed opacity-90">{sys}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Profil Lulusan - Full Width */}
          <div className="bg-white p-14 md:p-20 rounded-[4rem] shadow-2xl border border-gray-50 col-span-1 lg:col-span-2 relative overflow-hidden">
             <div className="absolute bottom-0 right-0 p-12 opacity-[0.02] pointer-events-none">
                <Target className="size-[500px]" />
             </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 relative z-10">
               <div>
                  <h2 className="text-4xl md:text-6xl font-black text-[#092C74] tracking-tighter mb-4">Profil Lulusan</h2>
                  <p className="text-2xl text-gray-400 font-black italic">"{programData.motto}"</p>
               </div>
               <div className="h-2 w-32 bg-gradient-to-r from-[#092C74] to-[#E31D1A] rounded-full" />
            </div>

            <p className="text-2xl text-gray-500 mb-16 leading-relaxed font-medium max-w-4xl">
              Kurikulum dirancang untuk mengintegrasikan keunggulan akademis dengan pembentukan karakter yang mendalam.
            </p>

            <div className="grid md:grid-cols-3 gap-12 relative z-10">
              {[
                { t: "Informed", d: programData.informedDescription },
                { t: "Transformed", d: programData.transformedDescription },
                { t: "Transformative", d: programData.transformativeDescription }
              ].map((item, i) => (
                <div key={i} className="bg-gray-50/50 p-10 rounded-[2.5rem] border border-gray-100 hover:border-[#092C74]/20 transition-all duration-500 hover:shadow-xl group">
                   <div className="size-14 bg-white rounded-2xl flex items-center justify-center text-[#E31D1A] font-black text-xl mb-8 shadow-sm group-hover:bg-[#092C74] group-hover:text-white transition-all duration-500">
                      0{i+1}
                   </div>
                   <h3 className="font-black text-3xl text-[#092C74] mb-6 tracking-tight">{item.t}</h3>
                   <p className="text-gray-500 leading-relaxed font-medium text-lg italic">
                     {item.d}
                   </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section - Premium Accordion */}
      <section className="container mx-auto px-4">
        <div className="bg-white p-12 md:p-24 rounded-[4rem] shadow-2xl border border-gray-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 p-12 opacity-[0.02] pointer-events-none">
             <BookOpen className="size-96" />
          </div>
          
          <div className="text-center mb-24 relative z-10">
            <h2 className="text-5xl md:text-6xl font-black text-[#092C74] mb-6 tracking-tighter uppercase">Struktur Kurikulum</h2>
            <div className="w-24 h-2 bg-[#E31D1A] mx-auto rounded-full mb-8" />
            <p className="text-2xl text-gray-500 font-medium italic">Total Beban Akademik: {programData.totalCredits} SKS</p>
          </div>

          <div className="space-y-8 relative z-10">
            {curriculum.map((cat: CurriculumCategory, index: number) => (
              <div key={index} className="rounded-[2.5rem] overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-xl">
                <button
                  onClick={() => setOpenCategory(openCategory === index ? null : index)}
                  className={`w-full flex items-center justify-between p-10 transition-all duration-500 ${openCategory === index ? 'bg-[#092C74] text-white' : 'bg-gray-50 hover:bg-white text-[#092C74]'}`}
                >
                  <div className="flex items-center gap-8 text-left">
                    <div className={`size-20 font-black text-2xl flex items-center justify-center rounded-3xl transition-all duration-500 ${openCategory === index ? 'bg-white text-[#092C74]' : 'bg-[#092C74] text-white shadow-lg'}`}>
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-3xl font-black tracking-tight mb-1">{cat.categoryName}</h3>
                      <p className={`font-black uppercase tracking-widest text-xs ${openCategory === index ? 'text-white/60' : 'text-[#E31D1A]'}`}>Distribusi: {cat.totalCredits} SKS</p>
                    </div>
                  </div>
                  <div className={`size-12 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${openCategory === index ? 'border-white/30 rotate-180' : 'border-[#092C74]/10'}`}>
                    <ChevronDown className="size-6" />
                  </div>
                </button>
                
                {openCategory === index && (
                  <div className="bg-white border-t border-gray-100">
                    <div className="hidden md:flex bg-gray-50/50 text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] px-10">
                      <div className="w-20 py-6">ID</div>
                      <div className="flex-1 py-6 px-10">Course Description</div>
                      <div className="w-32 text-center py-6">Credits</div>
                    </div>
                    <div className="divide-y divide-gray-50">
                      {cat.lectures.map((lecture: Lecture, idx: number) => (
                        <div key={idx} className="flex flex-col md:flex-row md:items-start group hover:bg-gray-50/50 transition-colors px-10">
                          <div className="w-20 py-8 text-gray-300 font-black text-xl group-hover:text-[#E31D1A] transition-colors">
                            {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                          </div>
                          <div className="flex-1 py-8 md:px-10">
                            <h4 className="text-2xl font-black text-[#092C74] mb-3 tracking-tight group-hover:translate-x-2 transition-transform duration-500">{lecture.lectureName}</h4>
                            <p className="text-lg text-gray-500 leading-relaxed font-medium italic opacity-80">{lecture.description}</p>
                          </div>
                          <div className="w-32 py-8 text-center">
                            <div className="inline-flex flex-col items-center">
                               <span className="text-3xl font-black text-[#092C74]">{lecture.credits}</span>
                               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">SKS</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const Scroll = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
  </svg>
);
