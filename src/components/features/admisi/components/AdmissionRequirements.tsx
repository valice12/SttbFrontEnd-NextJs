'use client';

import { motion } from 'motion/react';
import { CheckCircle, Phone, Mail, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AdmissionRequirementsProps {
  academicRequirements: any[];
}

export function AdmissionRequirements({ academicRequirements }: AdmissionRequirementsProps) {
  return (
    <>
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-gray-100"
            >
              <h2 className="text-2xl md:text-3xl font-black text-[#092C74] mb-8 flex items-center gap-3">
                <CheckCircle className="size-8 text-[#E31D1A]" /> Persyaratan Utama
              </h2>
              <ul className="space-y-4">
                {[
                  "Lulusan SMA/sederajat",
                  "Aktif dalam pelayanan gereja",
                  "Surat rekomendasi dari gembala/pemimpin gereja",
                  "Panggilan pelayanan yang jelas dan teruji"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 p-4 bg-[#F5F3FB] rounded-2xl border border-[#F2ECF8] group hover:border-[#092C74] transition-all">
                    <div className="size-6 rounded-full bg-[#092C74] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 group-hover:bg-[#E31D1A] transition-colors">
                      {idx + 1}
                    </div>
                    <span className="text-gray-700 font-medium text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#092C74] p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <h2 className="text-2xl md:text-3xl font-black mb-8 relative z-10">Catatan Penting</h2>
                <div className="space-y-6 relative z-10">
                  {[
                    "Tanggal penutupan pendaftaran adalah batas akhir semua berkas pendaftaran.",
                    "Pendaftar yang berkasnya tidak lolos seleksi dokumen tidak akan dipanggil tes.",
                    "Tanggal tes akan dikonfirmasi melalui WhatsApp & Email staf Admisi."
                  ].map((note, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="size-3 bg-[#E31D1A] rounded-full shrink-0 mt-2 shadow-[0_0_10px_#E31D1A]" />
                      <p className="text-white/90 leading-relaxed text-sm md:text-base">{note}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border-2 border-[#092C74]/10"
              >
                <h3 className="text-xl font-bold text-[#092C74] mb-6">Hubungi Kami</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <a href="https://wa.me/6281573360009" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl hover:bg-green-100 transition-colors group">
                    <Phone className="size-5 text-green-600 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-[10px] font-bold text-green-600 uppercase">WhatsApp</p>
                      <p className="font-bold text-gray-900 text-sm md:text-base">0815 7336 0009</p>
                    </div>
                  </a>
                  <a href="mailto:admisi@sttb.ac.id" className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors group">
                    <Mail className="size-5 text-blue-600 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-[10px] font-bold text-blue-600 uppercase">Email</p>
                      <p className="font-bold text-gray-900 text-sm md:text-base">admisi@sttb.ac.id</p>
                    </div>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black text-[#092C74] mb-4">Persyaratan Pendaftaran</h2>
            <div className="w-24 h-1.5 bg-[#E31D1A] mx-auto rounded-full" />
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-1 space-y-6"
              >
                <div className="bg-[#FBFAFF] p-8 rounded-[2rem] shadow-xl border border-blue-50">
                  <h3 className="text-xl font-bold text-[#092C74] mb-6 flex items-center gap-2">
                    <Info className="size-6 text-[#E31D1A]" /> Syarat Umum
                  </h3>
                  <div className="grid gap-4">
                    {[
                      "Ijazah kelulusan harus berasal dari lembaga yang terdaftar & diakui pemerintah.",
                      "Lulusan luar negeri akan dipertimbangkan case-by-case.",
                      "Memenuhi seluruh prosedur pendaftaran online STTB."
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                        <div className="size-1.5 bg-[#E31D1A] rounded-full shrink-0 mt-1.5" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2"
              >
                <Tabs defaultValue="s1">
                  <TabsList className="bg-[#F2ECF8] w-full p-1 rounded-2xl h-14 mb-6">
                    <TabsTrigger value="s1" className="w-full rounded-xl data-[state=active]:bg-white data-[state=active]:text-[#092C74] font-bold">Program Sarjana (S1)</TabsTrigger>
                    <TabsTrigger value="s2" className="w-full rounded-xl data-[state=active]:bg-white data-[state=active]:text-[#092C74] font-bold">Program Pascasarjana (S2)</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="s1" className="bg-white p-6 md:p-8 rounded-[2rem] shadow-xl border border-gray-100">
                    {academicRequirements.filter(r => r.programName.toLowerCase().includes('sarjana')).map((prog, idx) => (
                      <div key={idx} className="mb-10 last:mb-0">
                        <h4 className="text-lg md:text-xl font-black text-[#092C74] mb-6 pb-2 border-b-2 border-red-500 inline-block">{prog.programName}</h4>
                        <ul className="grid sm:grid-cols-2 gap-4">
                          {prog.requirements.map((item: string, i: number) => (
                            <li key={i} className="flex gap-3 p-4 bg-gray-50/50 rounded-2xl border border-gray-100 text-[13px] md:text-sm text-gray-700 font-medium">
                              <CheckCircle className="size-4 md:size-5 text-green-600 shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="s2" className="space-y-6">
                    {academicRequirements.filter(r => !r.programName.toLowerCase().includes('sarjana')).map((prog, idx) => (
                      <div key={idx} className="bg-white p-6 md:p-8 rounded-[2rem] shadow-xl border border-gray-100">
                        <h4 className="text-lg md:text-xl font-black text-[#092C74] mb-6 pb-2 border-b-2 border-red-500 inline-block">{prog.programName}</h4>
                        <ul className="grid sm:grid-cols-2 gap-4">
                          {prog.requirements.map((item: string, i: number) => (
                            <li key={i} className="flex gap-3 p-4 bg-[#F2ECF8]/30 rounded-2xl border border-[#F2ECF8] text-[13px] md:text-sm text-gray-700 font-medium">
                              <CheckCircle className="size-4 md:size-5 text-[#E31D1A] shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
