'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { GraduationCap, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { iconMap } from '../constants';

interface AcademicSectionProps {
  programs: any[];
}

export function AcademicSection({ programs }: AcademicSectionProps) {
  return (
    <section className="py-12 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F5F3FB] to-white" />
      <div className="absolute top-1/4 -left-20 size-96 bg-[#092C74]/5 blur-[100px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 size-96 bg-[#E31D1A]/5 blur-[100px] rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-5 py-2 bg-[#F2ECF8] rounded-full text-[#092C74] text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-[#092C74]/10 shadow-sm"
          >
             <GraduationCap className="size-3 text-[#E31D1A]" /> Investasi Masa Depan
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-black text-[#092C74] mb-8 tracking-tight">
            Pilih Program <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#092C74] via-[#6A0DAD] to-[#E31D1A]">Terbaik</span> Anda
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed">
            Mempersiapkan Pastor-Scholar yang transformatif melalui kurikulum akademik yang mendalam dan pembentukan integritas kristiani yang teguh.
          </p>
        </motion.div>

        {/* Desktop Grid Layout */}
        <div className="hidden lg:grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {programs.slice(0, 3).map((program, index) => {
            const IconComponent = iconMap[program.icon] || BookOpen;

            return (
              <Link key={program.slug} href={`/akademik/${program.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className="group relative bg-white border border-gray-100 p-10 lg:p-14 rounded-[3.5rem] shadow-xl hover:shadow-[0_40px_80px_rgba(9,44,116,0.08)] hover:-translate-y-2 transition-all duration-700 h-full flex flex-col overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#F2ECF8] rounded-full -mr-16 -mt-16 group-hover:bg-[#092C74]/5 transition-colors" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#E31D1A]/5 rounded-full -ml-12 -mb-12 group-hover:bg-[#E31D1A]/10 transition-colors" />

                  <div className="flex items-center justify-between w-full mb-12 relative z-10">
                    <div className="size-20 bg-gradient-to-br from-[#092C74] to-[#4B0082] group-hover:from-[#E31D1A] group-hover:to-[#8B008B] rounded-[2rem] flex items-center justify-center text-white shadow-2xl transition-all duration-700 group-hover:rotate-6">
                      <IconComponent className="size-10" />
                    </div>
                    <span className="text-[10px] font-black tracking-[0.2em] text-[#E31D1A] bg-red-50 px-5 py-2.5 rounded-full uppercase border border-red-100">
                      {program.degree}
                    </span>
                  </div>
                  
                  <div className="relative z-10 space-y-4">
                    <h3 className="font-black text-3xl text-[#092C74] group-hover:text-[#E31D1A] transition-colors leading-[1.1] tracking-tight">
                      {program.programName || program.title}
                    </h3>
                    <p className="text-gray-500 font-medium leading-relaxed line-clamp-3">
                      {program.description}
                    </p>
                  </div>

                  <div className="mt-12 pt-8 border-t border-gray-50 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                       <Clock className="size-4 text-[#6A0DAD]" />
                       <span className="text-xs font-black text-[#092C74] uppercase tracking-widest">{program.duration} SEMESTER</span>
                    </div>
                    <div className="size-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#092C74] group-hover:text-white transition-all duration-500">
                      <ArrowRight className="size-5" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Mobile List Layout */}
        <div className="flex flex-col lg:hidden gap-4">
          {programs.slice(0, 3).map((program, index) => {
            const IconComponent = iconMap[program.icon] || BookOpen;

            return (
              <Link key={program.slug} href={`/akademik/${program.slug}`}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
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
                      {program.programName || program.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5 text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                      <Clock className="size-3 text-[#6A0DAD]" />
                      <span>{program.duration} SEMESTER</span>
                    </div>
                  </div>
                  <div className="ml-auto size-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 shrink-0">
                    <ArrowRight className="size-4" />
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <Link href="/akademik">
            <Button className="bg-[#092C74] hover:bg-[#E31D1A] text-white px-8 py-5 md:px-12 md:py-8 text-sm md:text-xl font-black rounded-xl md:rounded-2xl shadow-xl transition-all duration-500 hover:-translate-y-1">
              LIHAT SEMUA PROGRAM
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
