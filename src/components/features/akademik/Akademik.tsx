'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { GraduationCap, BookOpen, Award, Sparkles, Languages, Users, Layout, Scroll, Layers, Clock, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { dataService } from '@/lib/data-service';

const iconMap: Record<string, any> = {
  'graduation-cap': GraduationCap,
  'book-open': BookOpen,
  'award': Award,
  'languages': Languages,
  'users': Users,
  'layout': Layout,
  'scroll': Scroll,
  'sparkles': Sparkles
};

const bgHeader = "/assets/06-Academic-Image-Header-scaled.jpg";
const bgPatternReversed = "/assets/background-reversed.webp";

export function Akademik() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrograms() {
      try {
        setLoading(true);
        const data = await dataService.getAcademicPrograms();
        setPrograms(data || []);
      } catch (error) {
        console.error("Failed to fetch academic programs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPrograms();
  }, []);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#092C74]"></div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-white bg-cover bg-center"
      style={{ backgroundImage: `url(${bgPatternReversed})` }}
    >
      {/* Premium Hero Section - Synchronized with Global Standard */}
      <section className="relative h-[550px] md:h-[650px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={bgHeader} alt="Academic Programs" className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#061B46]/95 via-[#4B0082]/40 to-transparent z-10" />
          
          <div className="absolute top-1/2 -right-20 size-[500px] bg-[#E31D1A]/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-0 -left-20 size-[400px] bg-[#092C74]/40 blur-[100px] rounded-full" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center z-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
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
                   <GraduationCap className="size-3" /> Keunggulan Akademis
                </motion.div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-[1.1] drop-shadow-2xl">
                  Program <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6AACE6] via-[#A855F7] to-[#E31D1A]">Akademik</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl leading-relaxed">
                  Pilihan program studi yang dirancang untuk mempersiapkan pemimpin kristiani yang kompeten dan berdampak di tengah masyarakat urban.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">

          <div className="mb-16">
            <div className="mb-10">
              <span className="text-[#6A0DAD] font-black tracking-widest text-[10px] uppercase mb-2 block">Undergraduate Programs</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#092C74] flex items-center gap-4 text-center md:text-left">
                <GraduationCap className="text-[#E31D1A] size-8" />
                Program Sarjana
              </h2>
              <div className="w-16 h-1.5 bg-gradient-to-r from-[#092C74] to-[#E31D1A] mt-3 rounded-full mx-auto md:mx-0" />
            </div>
            {/* Desktop Grid Layout */}
            <div className="hidden lg:grid grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.filter((p: any) => p.programName.includes('Sarjana')).map((program: any, index: number) => {
                const IconComponent = iconMap[program.icon] || GraduationCap;
                return (
                  <motion.div
                    key={program.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={`/akademik/${program.slug}`}>
                      <div className="bg-white p-8 rounded-[2rem] border border-gray-100 hover:border-[#092C74] hover:shadow-[0_20px_50px_rgba(9,44,116,0.08)] transition-all duration-500 group h-full flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#F2ECF8] rounded-full -mr-12 -mt-12 group-hover:bg-[#092C74]/10 transition-colors" />
                        <div className="flex items-center justify-between mb-6 relative z-10">
                          <div className="size-14 bg-[#F5F3FB] rounded-xl flex items-center justify-center group-hover:bg-[#092C74] transition-all duration-500 shadow-sm group-hover:shadow-blue-900/20 group-hover:-translate-y-1">
                            <IconComponent className="size-7 text-[#092C74] group-hover:text-white transition-colors" />
                          </div>
                          <span className="px-4 py-1.5 bg-[#E31D1A] text-white rounded-full font-black text-[9px] uppercase tracking-widest shadow-lg shadow-red-500/20">
                            {program.degree}
                          </span>
                        </div>
                        <h3 className="text-xl font-black text-[#092C74] mb-2 group-hover:text-[#E31D1A] transition-colors leading-tight">{program.title}</h3>
                        <p className="text-gray-400 mb-6 text-[10px] font-bold uppercase tracking-wide">Lulusan {program.level || 'Sarjana'}</p>
                        <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center relative z-10">
                          <div className="flex items-center gap-2">
                             <div className="size-1.5 bg-[#6A0DAD] rounded-full group-hover:animate-ping" />
                             <span className="text-[#092C74] font-black text-xs">{program.duration} Semester</span>
                          </div>
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{program.totalCredit} SKS</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            {/* Mobile List Layout */}
            <div className="flex flex-col lg:hidden gap-4">
              {programs.filter((p: any) => p.programName.includes('Sarjana')).map((program: any, index: number) => {
                const IconComponent = iconMap[program.icon] || GraduationCap;
                return (
                  <Link key={program.slug} href={`/akademik/${program.slug}`}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white border border-gray-100 p-4 rounded-3xl shadow-sm flex items-center gap-4 active:scale-95 transition-transform"
                    >
                      <div className="size-14 bg-gradient-to-br from-[#092C74] to-[#4B0082] rounded-2xl flex items-center justify-center text-white shrink-0">
                        <IconComponent className="size-7" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[8px] font-black tracking-widest text-[#E31D1A] uppercase mb-0.5">
                          {program.degree}
                        </span>
                        <h3 className="font-black text-sm text-[#092C74] truncate">
                          {program.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5 text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                          <Clock className="size-3 text-[#6A0DAD]" />
                          <span>{program.duration} SEMESTER • {program.totalCredit} SKS</span>
                        </div>
                      </div>
                      <div className="ml-auto size-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 shrink-0">
                        <ArrowRight className="size-4" />
                      </div>
                    </motion.div>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="mb-16">
            <div className="mb-10">
              <span className="text-[#6A0DAD] font-black tracking-widest text-[10px] uppercase mb-2 block">Graduate Programs</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#092C74] flex items-center gap-4 text-center md:text-left">
                <Award className="text-[#E31D1A] size-8" />
                Program Magister
              </h2>
              <div className="w-16 h-1.5 bg-gradient-to-r from-[#092C74] to-[#E31D1A] mt-3 rounded-full mx-auto md:mx-0" />
            </div>
            {/* Desktop Grid Layout */}
            <div className="hidden lg:grid grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.filter((p: any) => p.programName.includes('Magister')).map((program: any, index: number) => {
                const IconComponent = iconMap[program.icon] || BookOpen;
                return (
                  <motion.div
                    key={program.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={`/akademik/${program.slug}`}>
                      <div className="bg-white p-8 rounded-[2rem] border border-gray-100 hover:border-[#092C74] hover:shadow-[0_20px_50px_rgba(9,44,116,0.08)] transition-all duration-500 group h-full flex flex-col relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-24 h-24 bg-[#F2ECF8] rounded-full -mr-12 -mt-12 group-hover:bg-[#092C74]/10 transition-colors" />
                        <div className="flex items-center justify-between mb-6 relative z-10">
                          <div className="size-14 bg-[#F5F3FB] rounded-xl flex items-center justify-center group-hover:bg-[#092C74] transition-all duration-500 shadow-sm group-hover:shadow-blue-900/20 group-hover:-translate-y-1">
                            <IconComponent className="size-7 text-[#092C74] group-hover:text-white transition-colors" />
                          </div>
                          <span className="px-4 py-1.5 bg-[#E31D1A] text-white rounded-full font-black text-[9px] uppercase tracking-widest shadow-lg shadow-red-500/20">
                            {program.degree}
                          </span>
                        </div>
                        <h3 className="text-xl font-black text-[#092C74] mb-2 group-hover:text-[#E31D1A] transition-colors leading-tight">{program.title}</h3>
                        <p className="text-gray-400 mb-6 text-[10px] font-bold uppercase tracking-wide">Lulusan {program.level || 'Magister'}</p>
                        <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center relative z-10">
                          <div className="flex items-center gap-2">
                             <div className="size-1.5 bg-[#6A0DAD] rounded-full group-hover:animate-ping" />
                             <span className="text-[#092C74] font-black text-xs">{program.duration} Semester</span>
                          </div>
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{program.totalCredit} SKS</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            {/* Mobile List Layout */}
            <div className="flex flex-col lg:hidden gap-4">
              {programs.filter((p: any) => p.programName.includes('Magister')).map((program: any, index: number) => {
                const IconComponent = iconMap[program.icon] || BookOpen;
                return (
                  <Link key={program.slug} href={`/akademik/${program.slug}`}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white border border-gray-100 p-4 rounded-3xl shadow-sm flex items-center gap-4 active:scale-95 transition-transform"
                    >
                      <div className="size-14 bg-gradient-to-br from-[#092C74] to-[#4B0082] rounded-2xl flex items-center justify-center text-white shrink-0">
                        <IconComponent className="size-7" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[8px] font-black tracking-widest text-[#E31D1A] uppercase mb-0.5">
                          {program.degree}
                        </span>
                        <h3 className="font-black text-sm text-[#092C74] truncate">
                          {program.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5 text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                          <Clock className="size-3 text-[#6A0DAD]" />
                          <span>{program.duration} SEMESTER • {program.totalCredit} SKS</span>
                        </div>
                      </div>
                      <div className="ml-auto size-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 shrink-0">
                        <ArrowRight className="size-4" />
                      </div>
                    </motion.div>
                  </Link>
                )
              })}
            </div>
          </div>

          <div>
            {/* Desktop Grid Layout */}
            <div className="hidden lg:grid grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.filter((p: any) => !p.programName.includes('Sarjana') && !p.programName.includes('Magister')).map((program: any, index: number) => {
                const IconComponent = iconMap[program.icon] || Award;
                return (
                  <motion.div
                    key={program.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={`/akademik/${program.slug}`}>
                      <div className="bg-gradient-to-br from-white to-[#F2ECF8] p-8 rounded-[2rem] border-2 border-gray-100 hover:border-[#092C74] hover:shadow-xl transition-all group h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                          <IconComponent className="size-12 text-[#092C74] group-hover:text-[#E31D1A] transition-colors" />
                          <span className="px-4 py-2 bg-[#E31D1A] text-white rounded-full font-bold text-sm">
                            {program.degree}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-[#092C74] transition-colors">{program.title}</h3>
                        <p className="text-gray-500 mb-4 text-sm font-medium">{program.level === 'Non-Gelar' ? 'Program Persiapan' : `Program ${program.level || 'Matrikulasi'}`}</p>
                        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                          <span className="text-[#092C74] font-black text-sm">{program.duration} Semester</span>
                          <span className="text-xs font-bold text-gray-400">{program.totalCredit} SKS</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            {/* Mobile List Layout */}
            <div className="flex flex-col lg:hidden gap-4">
              {programs.filter((p: any) => !p.programName.includes('Sarjana') && !p.programName.includes('Magister')).map((program: any, index: number) => {
                const IconComponent = iconMap[program.icon] || Award;
                return (
                  <Link key={program.slug} href={`/akademik/${program.slug}`}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white border border-gray-100 p-4 rounded-3xl shadow-sm flex items-center gap-4 active:scale-95 transition-transform"
                    >
                      <div className="size-14 bg-gradient-to-br from-[#092C74] to-[#4B0082] rounded-2xl flex items-center justify-center text-white shrink-0">
                        <IconComponent className="size-7" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[8px] font-black tracking-widest text-[#E31D1A] uppercase mb-0.5">
                          {program.degree}
                        </span>
                        <h3 className="font-black text-sm text-[#092C74] truncate">
                          {program.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5 text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                          <Clock className="size-3 text-[#6A0DAD]" />
                          <span>{program.duration} SEMESTER • {program.totalCredit} SKS</span>
                        </div>
                      </div>
                      <div className="ml-auto size-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 shrink-0">
                        <ArrowRight className="size-4" />
                      </div>
                    </motion.div>
                  </Link>
                )
              })}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
