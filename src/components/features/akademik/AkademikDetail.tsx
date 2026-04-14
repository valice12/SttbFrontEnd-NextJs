'use client';

import { useParams } from 'next/navigation';
import { motion } from 'motion/react';
import { GraduationCap, Clock, BookOpen, Target, ChevronDown, CheckCircle2, Award, Layers } from 'lucide-react';
import { useState, useEffect } from 'react';
import { dataService } from '@/lib/data-service';
const bgHeader = "/assets/sttb-2-BG.png"; 
const bgPattern = "/assets/background.webp";
import { AcademicDto, CurriculumCategory, CourseItem } from '@/lib/types';

export function AkademikDetail() {
  const { slug } = useParams();
  const [openCategory, setOpenCategory] = useState<number | null>(0);
  const [programData, setProgramData] = useState<AcademicDto | null>(null);
  const [curriculum, setCurriculum] = useState<CurriculumCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!slug) {
        return;
      }
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
      {/* Premium Hero Section - Synchronized with Global Standard */}
      <section className="relative min-h-[600px] md:min-h-[750px] flex items-center pt-32 pb-48 overflow-hidden">
        <div className="absolute inset-0">
          <img src={bgHeader} alt={programData.programName} className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#061B46]/95 via-[#4B0082]/40 to-transparent z-10" />
          
          <div className="absolute top-1/2 -right-20 size-[500px] bg-[#E31D1A]/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-0 -left-20 size-[400px] bg-[#092C74]/40 blur-[100px] rounded-full" />
        </div>

        <div className="relative container mx-auto px-4 z-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="backdrop-blur-md bg-white/5 border border-white/10 p-10 md:p-14 lg:p-16 rounded-[40px] shadow-2xl relative overflow-hidden group"
            >
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E31D1A] rounded-full text-white text-xs font-black uppercase tracking-widest mb-8 shadow-lg shadow-red-500/30"
                >
                   <GraduationCap className="size-3" /> {programData.degree} Program 
                </motion.div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-[1.1] drop-shadow-2xl">
                  {programData.programName || (programData as any).title}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl leading-relaxed">
                  {programData.programDescription || (programData as any).description}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Info Cards */}
      <section className="-mt-8 sm:-mt-12 md:-mt-16 relative z-20 container mx-auto px-4 mb-16 md:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_40px_80px_rgba(9,44,116,0.08)] flex flex-row md:flex-col items-center gap-6 md:gap-0 text-left md:text-center border border-gray-50 group hover:-translate-y-2 transition-all duration-700"
          >
            <div className="size-14 md:size-24 bg-[#092C74]/5 rounded-2xl md:rounded-[2rem] flex items-center justify-center shrink-0 md:mb-10 shadow-inner group-hover:bg-[#092C74] md:group-hover:rotate-[15deg] transition-all duration-700">
              <BookOpen className="size-6 md:size-12 text-[#092C74] group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col md:items-center">
              <h3 className="font-black text-[10px] uppercase text-gray-400 tracking-widest mb-1">Mata Kuliah</h3>
              <p className="text-3xl md:text-5xl font-black text-[#092C74] tracking-tighter">{programData.totalCredits || (programData as any).totalCredit}</p>
              <p className="text-[10px] font-black text-[#E31D1A]/60 uppercase tracking-widest">SKS Total</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-4 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_40px_80px_rgba(9,44,116,0.08)] flex flex-row md:flex-col items-center gap-6 md:gap-0 text-left md:text-center border border-gray-50 group hover:-translate-y-2 transition-all duration-700"
          >
            <div className="size-14 md:size-24 bg-[#E31D1A]/5 rounded-2xl md:rounded-[2rem] flex items-center justify-center shrink-0 md:mb-10 shadow-inner group-hover:bg-[#E31D1A] md:group-hover:rotate-[15deg] transition-all duration-700">
              <Clock className="size-6 md:size-12 text-[#E31D1A] group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col md:items-center">
              <h3 className="font-black text-[10px] uppercase text-gray-400 tracking-widest mb-1">Estimasi Lulus</h3>
              <p className="text-3xl md:text-5xl font-black text-[#092C74] tracking-tighter">{programData.duration.split(' ')[0]}</p>
              <p className="text-[10px] font-black text-[#E31D1A]/60 uppercase tracking-widest">{programData.duration.split(' ').slice(1).join(' ') || 'Semester'}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-4 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_40px_80px_rgba(9,44,116,0.08)] flex flex-row md:flex-col items-center gap-6 md:gap-0 text-left md:text-center border border-gray-50 group hover:-translate-y-2 transition-all duration-700"
          >
            <div className="size-14 md:size-24 bg-[#092C74]/5 rounded-2xl md:rounded-[2rem] flex items-center justify-center shrink-0 md:mb-10 shadow-inner group-hover:bg-[#092C74] md:group-hover:rotate-[15deg] transition-all duration-700">
              <Target className="size-6 md:size-12 text-[#092C74] group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col md:items-center pr-4">
              <h3 className="font-black text-[10px] uppercase text-gray-400 tracking-widest mb-2">Misi Utama</h3>
              <p className="text-sm md:text-xl font-black text-[#092C74] italic leading-tight">
                "{programData.motto}"
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Details Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Persyaratan */}
          <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl border border-gray-50 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                <Scroll className="size-48" />
             </div>
            <h2 className="text-2xl sm:text-3xl font-black mb-10 flex items-center gap-6 text-[#092C74] tracking-tighter">
              <div className="w-2.5 h-8 bg-[#E31D1A] rounded-full" />
              Persyaratan
            </h2>
            <ul className="space-y-4 relative z-10">
              {programData.programRequirements.map((req: string, i: number) => (
                <li key={i} className="flex items-start gap-4 group">
                  <div className="size-6 rounded-lg bg-gray-50 text-[#E31D1A] flex items-center justify-center shrink-0 mt-1 transition-all group-hover:bg-[#E31D1A] group-hover:text-white shadow-inner">
                     <CheckCircle2 className="size-3" />
                  </div>
                  <span className="text-base md:text-lg text-gray-600 font-medium leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sistem Perkuliahan */}
          <div className="bg-[#092C74] text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <GraduationCap className="absolute top-0 right-0 size-64 text-white opacity-[0.03] translate-x-12 -translate-y-12 group-hover:rotate-12 transition-transform duration-[2s]" />
            <h2 className="text-2xl sm:text-3xl font-black mb-10 flex items-center gap-6 tracking-tighter">
              <div className="w-2.5 h-8 bg-[#E31D1A] rounded-full" />
              Sistem Perkuliahan
            </h2>
            <ul className="space-y-4 relative z-10">
              {programData.lecturingSystem.map((sys: string, i: number) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="size-2.5 bg-[#E31D1A] rounded-full shrink-0 mt-2.5 shadow-[0_0_10px_rgba(227,29,26,0.5)]" />
                  <span className="text-lg text-blue-50 font-medium leading-relaxed opacity-90">{sys}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Profil Lulusan - Full Width */}
          <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-gray-50 col-span-1 lg:col-span-2 relative overflow-hidden">
             <div className="absolute bottom-0 right-0 p-12 opacity-[0.02] pointer-events-none">
                <Target className="size-[400px]" />
             </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-12 relative z-10">
               <div>
                  <h2 className="text-3xl md:text-5xl font-black text-[#092C74] tracking-tighter mb-3">Profil Lulusan</h2>
                  <p className="text-xl text-gray-400 font-black italic">"{programData.motto}"</p>
               </div>
               <div className="h-1.5 w-24 bg-gradient-to-r from-[#092C74] to-[#E31D1A] rounded-full" />
            </div>

            <p className="text-xl text-gray-500 mb-12 leading-relaxed font-medium max-w-3xl">
              Kurikulum dirancang untuk mengintegrasikan keunggulan akademis dengan pembentukan karakter yang mendalam.
            </p>

            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              {[
                { t: "Informed", d: programData.informedDescription },
                { t: "Transformed", d: programData.transformedDescription },
                { t: "Transformative", d: programData.transformativeDescription }
              ].map((item, i) => (
                <div key={i} className="bg-gray-50/50 p-8 rounded-[2rem] border border-gray-100 hover:border-[#092C74]/20 transition-all duration-500 hover:shadow-xl group">
                   <div className="size-12 bg-white rounded-xl flex items-center justify-center text-[#E31D1A] font-black text-lg mb-6 shadow-sm group-hover:bg-[#092C74] group-hover:text-white transition-all duration-500">
                      0{i+1}
                   </div>
                   <h3 className="font-black text-2xl text-[#092C74] mb-4 tracking-tight">{item.t}</h3>
                   <p className="text-gray-500 leading-relaxed font-medium text-base italic">
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
        <div className="bg-white p-8 md:p-16 rounded-[3rem] shadow-2xl border border-gray-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 p-12 opacity-[0.02] pointer-events-none">
             <BookOpen className="size-72" />
          </div>
          
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-[#092C74] mb-4 tracking-tighter uppercase">Struktur Kurikulum</h2>
            <div className="w-20 h-1.5 bg-[#E31D1A] mx-auto rounded-full mb-6" />
            <p className="text-xl text-gray-500 font-medium italic">Total Beban Akademik: {programData.totalCredits} SKS</p>
          </div>

          <div className="space-y-6 relative z-10">
            {curriculum.map((cat: CurriculumCategory, index: number) => (
              <div key={index} className="rounded-[2rem] overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-xl">
                <button
                  onClick={() => setOpenCategory(openCategory === index ? null : index)}
                  className={`w-full flex items-center justify-between p-6 sm:p-10 transition-all duration-500 ${openCategory === index ? 'bg-[#092C74] text-white' : 'bg-white hover:bg-gray-50 text-[#092C74]'}`}
                >
                  <div className="flex items-center gap-4 sm:gap-8 text-left">
                    <div className={`size-12 sm:size-20 font-black text-xl flex items-center justify-center rounded-2xl transition-all duration-500 ${openCategory === index ? 'bg-white text-[#092C74]' : 'bg-[#092C74] text-white shadow-xl shadow-blue-900/10'}`}>
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-3xl font-black tracking-tighter mb-1">{cat.categoryName}</h3>
                      <p className={`font-black uppercase tracking-widest text-[8px] sm:text-[10px] ${openCategory === index ? 'text-white/60' : 'text-[#E31D1A]'}`}>Total Beban: {cat.totalCredits} SKS</p>
                    </div>
                  </div>
                  <div className={`size-10 sm:size-14 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${openCategory === index ? 'border-white/30 rotate-180 bg-white/10' : 'border-[#092C74]/10 bg-gray-50'}`}>
                    <ChevronDown className="size-5 sm:size-7" />
                  </div>
                </button>
                
                {openCategory === index && (
                  <div className="bg-white border-t border-gray-100">
                    <div className="hidden md:flex bg-gray-50/50 text-gray-400 text-[8px] font-black uppercase tracking-[0.3em] px-8">
                      <div className="w-16 py-4">ID</div>
                      <div className="flex-1 py-4 px-8">Course Description</div>
                      <div className="w-24 text-center py-4">Credits</div>
                    </div>
                    <div className="divide-y divide-gray-50">
                      {(cat.courses || (cat as any).lectures || []).map((lecture: any, idx: number) => (
                        <div key={idx} className="flex flex-col md:flex-row md:items-start group hover:bg-gray-50/50 transition-colors px-8">
                          <div className="w-16 py-6 text-gray-300 font-black text-lg group-hover:text-[#E31D1A] transition-colors">
                            {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                          </div>
                          <div className="flex-1 py-6 md:px-8">
                            <h4 className="text-xl font-black text-[#092C74] mb-2 tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                              {lecture.courseName || lecture.lectureName}
                            </h4>
                            <p className="text-base text-gray-500 leading-relaxed font-medium italic opacity-80">{lecture.description}</p>
                          </div>
                          <div className="w-24 py-6 text-center">
                            <div className="inline-flex flex-col items-center">
                               <span className="text-2xl font-black text-[#092C74]">{lecture.credits}</span>
                               <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">SKS</span>
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
