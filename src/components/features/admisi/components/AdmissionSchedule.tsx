'use client';

import { motion } from 'motion/react';
import { Calendar, UserCheck, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AdmissionScheduleProps {
  schedules: any[];
  defaultTab: string;
  isLoading: boolean;
  formatDate: (date: string) => string;
}

export function AdmissionSchedule({ schedules, defaultTab, isLoading, formatDate }: AdmissionScheduleProps) {
  return (
    <section className="py-10 md:py-20 bg-white relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="text-[#6A0DAD] font-black tracking-[0.2em] text-[10px] md:text-sm uppercase mb-4 block underline underline-offset-8 decoration-[#092C74]">Admissions Guide</span>
          <h2 className="text-3xl md:text-6xl font-black text-[#092C74] mb-6 px-4">Jadwal Gelombang Pendaftaran</h2>
          <div className="w-24 h-2 bg-gradient-to-r from-[#092C74] via-[#6A0DAD] to-[#E31D1A] mx-auto rounded-full mb-8" />
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed italic">
            Tahun Akademik {schedules.length > 0 ? schedules[0].academicYear : '2026-2027'}
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
             <div className="w-10 h-10 border-4 border-[#092C74] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : schedules.length > 0 ? (
          <Tabs defaultValue={defaultTab} className="max-w-5xl mx-auto">
            <div className="mb-10 w-full overflow-hidden">
              <div className="overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                <TabsList className="flex flex-nowrap gap-3 bg-transparent h-auto p-0 border-0 shadow-none justify-start w-max md:w-full md:grid md:grid-cols-3 lg:grid-cols-4">
                  {schedules.map((item) => (
                    <TabsTrigger 
                      key={item.batchOrder} 
                      value={`Gelombang ${item.batchOrder}`}
                      className="h-14 md:h-16 rounded-2xl md:rounded-[2rem] font-black text-xs md:text-lg bg-[#F5F3FB] text-gray-400 border-2 border-transparent data-[state=active]:bg-[#092C74] data-[state=active]:text-white data-[state=active]:border-[#092C74] data-[state=active]:shadow-xl transition-all duration-500 uppercase tracking-widest whitespace-nowrap px-8 md:whitespace-normal md:px-4 text-center leading-tight hover:bg-white hover:border-[#6A0DAD] hover:text-[#092C74] shrink-0"
                    >
                      Batch {item.batchOrder}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>

            {schedules.map((item) => (
              <TabsContent key={item.batchOrder} value={`Gelombang ${item.batchOrder}`} className="focus-visible:outline-none">
                <div className="grid gap-8">
                  <div className="bg-white p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl border border-gray-100 group hover:border-[#092C74] transition-all duration-500">
                    <div className="flex flex-col md:flex-row items-center gap-6 mb-8 bg-[#F5F3FB] p-6 rounded-[2rem] border border-gray-100">
                      <div className="size-16 bg-gradient-to-br from-[#E31D1A] to-[#8B008B] rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                         <Calendar className="size-8 text-white" />
                      </div>
                      <div className="text-center md:text-left">
                        <p className="text-xs font-black text-[#E31D1A] uppercase tracking-[0.2em] mb-1">Status Batch</p>
                        <p className="text-xl md:text-2xl font-black text-[#092C74] leading-tight">
                          Batas Pendaftaran: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#092C74] to-[#6A0DAD]">{formatDate(item.batchDeadlineAt)}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#092C74] p-6 md:p-8 rounded-[2rem] md:rounded-3xl shadow-xl text-white">
                    <h3 className="text-lg md:text-xl font-bold mb-6 flex items-center gap-2">
                        <UserCheck className="size-6 text-[#6AACE6]" /> Detail Aktivitas Gelombang {item.batchOrder}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-3 md:space-y-4">
                        {[
                          { activity: "Batas Pengembalian Formulir", time: formatDate(item.formReturnDeadlineAt) },
                          { activity: "Seleksi Dokumen", time: formatDate(item.documentSelectionDeadlineAt) },
                        ].map((act, idx) => (
                          <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 border-b border-white/10 last:border-0 hover:bg-white/5 px-3 rounded-lg transition-colors gap-2">
                            <span className="text-white/80 font-medium text-sm md:text-base">{act.activity}</span>
                            <span className="font-bold text-[#6AACE6] bg-white/10 px-3 py-1 rounded-lg text-xs md:text-sm">{act.time}</span>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-3 md:space-y-4">
                        {[
                          { activity: "Panggilan Peserta", time: formatDate(item.participantCallAt) },
                          { activity: "Pengumuman Hasil", time: formatDate(item.resultBroadcastAt) },
                        ].map((act, idx) => (
                          <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 border-b border-white/10 last:border-0 hover:bg-white/5 px-3 rounded-lg transition-colors gap-2">
                            <span className="text-white/80 font-medium text-sm md:text-base">{act.activity}</span>
                            <span className="font-bold text-[#6AACE6] bg-white/10 px-3 py-1 rounded-lg text-xs md:text-sm">{act.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-8 p-4 bg-white/10 rounded-2xl border border-white/20">
                      <p className="text-xs md:text-sm text-white/70 italic flex items-center gap-2">
                        <Info className="size-4 shrink-0" /> Jadwal pendaftaran bersifat dinamis dari server.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
             <Calendar className="size-12 text-gray-400 mx-auto mb-4" />
             <p className="text-gray-500 font-medium">Belum ada jadwal pendaftaran yang tersedia saat ini.</p>
          </div>
        )}
      </div>
    </section>
  );
}
