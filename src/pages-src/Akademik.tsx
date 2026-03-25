'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { GraduationCap, BookOpen, Award, Sparkles, Languages, Users, Layout, Scroll } from 'lucide-react';
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

const bgHeader = "/assets/header-faq.png";
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
      <section className="relative text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={bgHeader} alt="Program Akademik" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#092C74]/80 mix-blend-multiply" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 uppercase">Program Akademik</h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-200">
              Pilihan program studi yang dirancang untuk mempersiapkan pelayan Tuhan yang kompeten
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">

          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 border-b pb-4">
              <GraduationCap className="text-[#E31D1A] size-8" />
              Program Sarjana
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      <div className="bg-gradient-to-br from-white to-[#F2ECF8] p-8 rounded-2xl border-2 border-gray-200 hover:border-[#092C74] hover:shadow-xl transition-all group h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                          <IconComponent className="size-12 text-[#092C74] group-hover:text-[#E31D1A] transition-colors" />
                          <span className="px-4 py-2 bg-[#E31D1A] text-white rounded-full font-bold text-sm">
                            {program.degree}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-[#092C74] transition-colors">{program.title}</h3>
                        <p className="text-gray-500 mb-4 text-sm font-medium">Lulusan {program.level || 'Sarjana'}</p>
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
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 border-b pb-4">
              <Award className="text-[#E31D1A] size-8" />
              Program Magister
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      <div className="bg-gradient-to-br from-white to-[#F2ECF8] p-8 rounded-2xl border-2 border-gray-200 hover:border-[#092C74] hover:shadow-xl transition-all group h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                          <IconComponent className="size-12 text-[#092C74] group-hover:text-[#E31D1A] transition-colors" />
                          <span className="px-4 py-2 bg-[#E31D1A] text-white rounded-full font-bold text-sm">
                            {program.degree}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-[#092C74] transition-colors">{program.title}</h3>
                        <p className="text-gray-500 mb-4 text-sm font-medium">Lulusan {program.level || 'Magister'}</p>
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
          </div>

          <div>
            {/* <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 border-b pb-4">
              <Sparkles className="text-[#E31D1A] size-8" />
              Program Doktor & Matrikulasi
            </h2> */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      <div className="bg-gradient-to-br from-white to-[#F2ECF8] p-8 rounded-2xl border-2 border-gray-200 hover:border-[#092C74] hover:shadow-xl transition-all group h-full flex flex-col">
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
          </div>

        </div>
      </section>
    </div>
  );
}
