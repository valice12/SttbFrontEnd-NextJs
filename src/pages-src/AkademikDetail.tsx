'use client';

import { useParams } from 'next/navigation';
import { motion } from 'motion/react';
import { GraduationCap, Clock, BookOpen, Target, ChevronDown, CheckCircle2 } from 'lucide-react';
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

      {/* Main Info Cards */}
      <section className="-mt-12 relative z-10 container mx-auto px-4 mb-20">
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center border-t-4 border-[#092C74]"
          >
            <div className="bg-[#F2ECF8] w-20 h-20 rounded-full flex items-center justify-center mb-6">
              <BookOpen className="size-10 text-[#092C74]" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-800">Jumlah Kredit</h3>
            <p className="text-3xl font-black text-[#092C74]">{programData.totalCredits || (programData as any).totalCredit} SKS</p>
            <p className="text-gray-500 mt-2 text-sm">Total Kredit Semester</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center border-t-4 border-[#E31D1A]"
          >
            <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mb-6">
              <Clock className="size-10 text-[#E31D1A]" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-800">Masa Studi</h3>
            <p className="text-3xl font-black text-[#E31D1A]">{programData.duration}</p>
            <p className="text-gray-500 mt-2 text-sm">Estimasi Waktu Lulus</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center border-t-4 border-[#092C74]"
          >
            <div className="bg-[#F2ECF8] w-20 h-20 rounded-full flex items-center justify-center mb-6">
              <Target className="size-10 text-[#092C74]" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-800">Motto</h3>
            <p className="text-xl font-black text-[#092C74] italic leading-tight">
              "{programData.motto}"
            </p>
            <p className="text-gray-500 mt-2 text-sm">Visi Program Studi</p>
          </motion.div>
        </div>
      </section>

      {/* Details Section */}
      <section className="container mx-auto px-4 mb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Persyaratan */}
          <div className="bg-white p-10 rounded-2xl shadow-md border border-gray-100">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-4 text-[#092C74]">
              <span className="bg-[#092C74] w-2 h-8 rounded-full"></span>
              Persyaratan
            </h2>
            <ul className="space-y-4">
              {programData.programRequirements.map((req: string, i: number) => (
                <li key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="size-6 text-[#E31D1A] shrink-0 mt-0.5" />
                  <span className="text-lg text-gray-700 leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sistem Perkuliahan */}
          <div className="bg-[#092C74] text-white p-10 rounded-2xl shadow-md relative overflow-hidden">
            <GraduationCap className="absolute top-0 right-0 size-64 text-white opacity-5 translate-x-16 -translate-y-16" />
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-4 relative z-10">
              <span className="bg-[#E31D1A] w-2 h-8 rounded-full"></span>
              Sistem Perkuliahan
            </h2>
            <ul className="space-y-4 relative z-10">
              {programData.lecturingSystem.map((sys: string, i: number) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="size-2 bg-[#E31D1A] rounded-full shrink-0 mt-2" />
                  <span className="text-lg text-blue-100 leading-relaxed">{sys}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Keterangan */}
          <div className="bg-[#092C74] text-white p-10 rounded-2xl shadow-md relative overflow-hidden col-span-1 lg:col-span-2">
            <Target className="absolute top-0 right-0 size-64 text-white opacity-5 translate-x-16 -translate-y-16" />
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-4 relative z-10">
              <span className="bg-[#E31D1A] w-2 h-8 rounded-full"></span>
              Keterangan Tambahan
            </h2>
            <ul className="space-y-4 relative z-10">
              {programData.notes.map((desc: string, i: number) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="size-2 bg-[#E31D1A] rounded-full shrink-0 mt-2" />
                  <span className="text-lg text-blue-100 leading-relaxed">{desc}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Profil Lulusan */}
          <div className="bg-white p-10 lg:p-14 rounded-2xl shadow-md border-t-4 border-[#092C74] col-span-1 lg:col-span-2 mt-4 lg:mt-0">
            <h2 className="text-3xl font-extrabold mb-8 flex flex-col sm:flex-row sm:items-center gap-4 text-[#092C74]">
              <div className="flex items-center gap-3">
                <span className="bg-[#092C74] w-2 h-8 rounded-full hidden sm:block"></span>
                Profil Lulusan
              </div>
              <span className="text-xl sm:text-2xl text-gray-500 font-medium">({programData.motto})</span>
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed font-medium">
              Profil lulusan {programData.programName} dirancang untuk menghasilkan pemimpin yang transformatif.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#F2ECF8] p-8 rounded-2xl border-l-4 border-[#E31D1A] hover:-translate-y-1 transition-transform">
                <h3 className="font-black text-2xl text-[#092C74] mb-4 tracking-tight">Informed</h3>
                <p className="text-gray-700 leading-relaxed">
                  {programData.informedDescription}
                </p>
              </div>
              <div className="bg-[#F2ECF8] p-8 rounded-2xl border-l-4 border-[#E31D1A] hover:-translate-y-1 transition-transform">
                <h3 className="font-black text-2xl text-[#092C74] mb-4 tracking-tight">Transformed</h3>
                <p className="text-gray-700 leading-relaxed">
                  {programData.transformedDescription}
                </p>
              </div>
              <div className="bg-[#F2ECF8] p-8 rounded-2xl border-l-4 border-[#E31D1A] hover:-translate-y-1 transition-transform">
                <h3 className="font-black text-2xl text-[#092C74] mb-4 tracking-tight">Transformative</h3>
                <p className="text-gray-700 leading-relaxed">
                  {programData.transformativeDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="container mx-auto px-4">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-[#092C74] mb-4 uppercase tracking-tight">Daftar Mata Kuliah</h2>
            <p className="text-xl text-gray-500">Struktur kurikulum {programData.programName} ({programData.totalCredits} SKS)</p>
          </div>

          <div className="grid gap-6">
            {curriculum.map((cat: CurriculumCategory, index: number) => (
              <div key={index} className="border-2 border-gray-100 rounded-xl overflow-hidden hover:border-gray-200 transition-colors">
                <button
                  onClick={() => setOpenCategory(openCategory === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className="bg-[#092C74] text-white font-bold w-12 h-12 flex items-center justify-center rounded-lg shadow-inner">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{cat.categoryName}</h3>
                      <p className="text-[#E31D1A] font-semibold text-sm">Total: {cat.totalCredits} SKS</p>
                    </div>
                  </div>
                  <ChevronDown className={`size-6 text-gray-500 transition-transform duration-300 ${openCategory === index ? 'rotate-180' : ''}`} />
                </button>
                
                {openCategory === index && (
                  <div className="bg-white divide-y divide-gray-100 border-t border-gray-100">
                    <div className="flex bg-[#092C74] text-white text-xs font-bold uppercase tracking-wider">
                      <div className="w-16 text-center py-3">No</div>
                      <div className="flex-1 py-3 px-4 md:px-6">Mata Kuliah & Deskripsi</div>
                      <div className="w-24 text-center py-3">SKS</div>
                    </div>
                    {cat.lectures.map((lecture: Lecture, idx: number) => (
                      <div key={idx} className="flex items-start group hover:bg-gray-50 transition-colors">
                        <div className="w-16 text-center py-6 text-gray-400 font-medium group-hover:text-[#E31D1A]">
                          {idx + 1}
                        </div>
                        <div className="flex-1 py-4 px-4 md:px-6">
                          <h4 className="font-bold text-gray-800 mb-1">{lecture.lectureName}</h4>
                          <p className="text-sm text-gray-600 leading-relaxed">{lecture.description}</p>
                        </div>
                        <div className="w-24 text-center py-6 font-bold text-[#092C74]">
                          {lecture.credits}
                        </div>
                      </div>
                    ))}
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



