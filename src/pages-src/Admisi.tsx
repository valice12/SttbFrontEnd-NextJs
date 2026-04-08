'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { 
  Calendar, CheckCircle, UserCheck, FileText, HelpCircle, 
  Phone, Mail, Info, Clock, BookOpen 
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { dataService } from '@/lib/data-service';
import { FinanceNavbar } from '@/components/finance/FinanceNavbar';

const bgHeader = "/assets/04-Beasiswa-Image-Header-scaled.jpg";
const bgPattern = "/assets/background.webp";

export function Admisi() {
  const [admissionSchedule, setAdmissionSchedule] = useState<any>(null);
  const [academicRequirements, setAcademicRequirements] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [schedule, requirements] = await Promise.all([
          dataService.getAdmissionSchedule(),
          dataService.getAcademicRequirements()
        ]);
        setAdmissionSchedule(schedule);
        setAcademicRequirements(requirements.items || []);
      } catch (error) {
        console.error('Error fetching admission data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    try {
      return new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const addDays = (dateStr: string, days: number) => {
    if (!dateStr) return "-";
    try {
      const date = new Date(dateStr);
      date.setDate(date.getDate() + days);
      return date.toISOString();
    } catch {
      return "-";
    }
  };

  const faqCategories = [
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
        { q: 'Apakah diperbolehkan bekerja sambil kuliah?', a: 'Memungkinkan, namun harus sangat memperhatikan jadwal kuliah dan beban studi yang padat.' },
      ]
    },
    {
      name: 'Biaya Studi',
      items: [
        { q: 'Bagaimana sistem pembayaran biayanya?', a: 'Pembayaran dilakukan per semester, namun dapat diangsur/dicicil 6 kali setiap bulan sebelum tanggal 10.' },
        { q: 'Apa saja komponen biaya pendidikannya?', a: 'Mencakup biaya kuliah bulanan, administrasi, buku per semester, serta biaya skripsi/wisuda di akhir studi.' },
      ]
    }
  ];

  const requirements = {
    general: [
      "Ijazah kelulusan harus berasal dari lembaga yang terdaftar & diakui pemerintah.",
      "Lulusan luar negeri akan dipertimbangkan case-by-case.",
      "Memenuhi seluruh prosedur pendaftaran online STTB."
    ],
    s1: [
      { 
        title: "Sarjana Teologi (S.Th.)", 
        items: [
          "Minimal lulusan SMA/sederajat.",
          "Pengalaman pelayanan minimal 2 tahun.",
          "Panggilan jelas sebagai hamba Tuhan.",
          "Kemampuan baca & memahami literatur Bahasa Inggris."
        ]
      },
      { 
        title: "Sarjana Pendidikan Kristen (S.Pd.K.)", 
        items: [
          "Minimal lulusan SMA/sederajat.",
          "Pengalaman pelayanan minimal 2 tahun.",
          "Panggilan jelas sebagai pendidik kristen.",
          "Kemampuan baca & memahami literatur Bahasa Inggris."
        ]
      }
    ],
    s2: [
      {
        title: "Magister Pendidikan Kristen (M.Pd.)",
        items: [
          "Lulus S1 semua jurusan (teologi/non-teologi).",
          "Pengalaman pelayanan sekolah/gereja minimal 2 tahun.",
          "Menyerahkan book review pada saat mendaftar."
        ]
      },
      {
        title: "Magister Ministri Marketplace (M.Min.)",
        items: [
          "Lulus S1 program Teologi maupun Umum.",
          "Pengalaman kerja profesional (marketplace) minimal 2 tahun.",
          "Pengalaman pelayanan gereja/lembaga minimal 1 tahun.",
          "Menyerahkan book review pada saat mendaftar."
        ]
      }
    ]
  };

  const schedules = Array.isArray(admissionSchedule) ? admissionSchedule : [];
  const defaultTab = schedules.length > 0 ? `Gelombang ${schedules[0].batchOrder}` : "Gelombang I";

  return (
    <div 
      className="min-h-screen bg-white bg-cover bg-center"
      style={{ backgroundImage: `url(${bgPattern})` }}
    >
      {/* Modern Hero Section - Admissions */}
      <section className="relative h-[550px] md:h-[650px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={bgHeader} alt="Admissions Hero" className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#061B46]/95 via-[#4C1D95]/45 to-transparent z-10" />
          
          {/* Decorative Mesh Blobs */}
          <div className="absolute top-1/4 -right-20 size-[400px] bg-[#E31D1A]/20 blur-[100px] rounded-full animate-pulse" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center z-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="backdrop-blur-md bg-white/5 border border-white/10 p-8 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E31D1A] rounded-full text-white text-xs font-black uppercase tracking-widest mb-6 shadow-lg shadow-red-500/30"
              >
                 <UserCheck className="size-3" /> Bergabunglah Bersama Kami
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl tracking-tight leading-tight">
                Admisi & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6AACE6] via-[#A855F7] to-[#E31D1A]">Pendaftaran</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-medium mb-10 max-w-2xl leading-relaxed">
                Mulai perjalanan transformatif Anda di STT Bandung. Kami mengundang calon pemimpin urban untuk dipersiapkan secara akademis dan spiritual.
              </p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <a href="https://sis.sttb.ac.id/pmb" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-white hover:bg-[#E31D1A] text-[#E31D1A] hover:text-white px-10 py-7 text-xl font-black rounded-2xl shadow-xl transition-all duration-500 hover:-translate-y-1">
                    DAFTAR SEKARANG
                  </Button>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Navigation Section - Centralized */}
      <FinanceNavbar />

      {/* Schedule Section - Clean PHI Layout */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-[#6A0DAD] font-black tracking-widest text-sm uppercase mb-4 block underline underline-offset-8 decoration-[#092C74]">Admissions Guide</span>
            <h2 className="text-5xl md:text-6xl font-black text-[#092C74] mb-6">Jadwal Gelombang Pendaftaran</h2>
            <div className="w-24 h-2 bg-gradient-to-r from-[#092C74] via-[#6A0DAD] to-[#E31D1A] mx-auto rounded-full mb-8" />
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed italic">
              Tahun Akademik {schedules.length > 0 ? schedules[0].academicYear : '2026-2027'}
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
               <div className="w-10 h-10 border-4 border-[#092C74] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : schedules.length > 0 ? (
            <Tabs defaultValue={defaultTab} className="max-w-5xl mx-auto">
              <TabsList className={`grid w-full mb-16 bg-[#F5F3FB] p-2 rounded-[2rem] h-20 shadow-inner`} style={{ gridTemplateColumns: `repeat(${schedules.length}, minmax(0, 1fr))` }}>
                {schedules.map((item) => (
                  <TabsTrigger 
                    key={item.batchOrder} 
                    value={`Gelombang ${item.batchOrder}`}
                    className="rounded-[1.5rem] font-black text-lg data-[state=active]:bg-[#092C74] data-[state=active]:text-white data-[state=active]:shadow-xl transition-all duration-500 uppercase tracking-widest"
                  >
                    Batch {item.batchOrder}
                  </TabsTrigger>
                ))}
              </TabsList>

              {schedules.map((item) => (
                <TabsContent key={item.batchOrder} value={`Gelombang ${item.batchOrder}`} className="focus-visible:outline-none">
                  <div className="grid gap-8">
                    <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100 group hover:border-[#092C74] transition-all duration-500">
                      <div className="flex items-center gap-6 mb-8 bg-[#F5F3FB] p-6 rounded-[2rem] border border-gray-100">
                        <div className="size-16 bg-gradient-to-br from-[#E31D1A] to-[#8B008B] rounded-2xl flex items-center justify-center shadow-lg">
                           <Calendar className="size-8 text-white" />
                        </div>
                        <div>
                          <p className="text-xs font-black text-[#E31D1A] uppercase tracking-[0.2em] mb-1">Status Batch</p>
                          <p className="text-2xl font-black text-[#092C74] leading-tight">
                            Batas Pendaftaran: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#092C74] to-[#6A0DAD]">{formatDate(item.batchDeadlineAt)}</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#092C74] p-8 rounded-3xl shadow-xl text-white">
                      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                          <UserCheck className="size-6 text-[#6AACE6]" /> Detail Aktivitas Gelombang {item.batchOrder}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          {[
                            { activity: "Batas Pengembalian Formulir", time: formatDate(item.formReturnDeadlineAt) },
                            { activity: "Seleksi Dokumen", time: formatDate(item.documentSelectionDeadlineAt) },
                          ].map((act, idx) => (
                            <div key={idx} className="flex justify-between items-center py-3 border-b border-white/10 last:border-0 hover:bg-white/5 px-2 rounded-lg transition-colors">
                              <span className="text-white/80 font-medium">{act.activity}</span>
                              <span className="font-bold text-[#6AACE6] bg-white/10 px-3 py-1 rounded-lg text-sm">{act.time}</span>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-4">
                          {[
                            { activity: "Panggilan Peserta", time: formatDate(item.participantCallAt) },
                            { activity: "Pengumuman Hasil", time: formatDate(item.resultBroadcastAt) },
                          ].map((act, idx) => (
                            <div key={idx} className="flex justify-between items-center py-3 border-b border-white/10 last:border-0 hover:bg-white/5 px-2 rounded-lg transition-colors">
                              <span className="text-white/80 font-medium">{act.activity}</span>
                              <span className="font-bold text-[#6AACE6] bg-white/10 px-3 py-1 rounded-lg text-sm">{act.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-8 p-4 bg-white/10 rounded-2xl border border-white/20">
                        <p className="text-sm text-white/70 italic flex items-center gap-2">
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

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100"
            >
              <h2 className="text-3xl font-black text-[#092C74] mb-8 flex items-center gap-3">
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
                    <div className="size-6 rounded-full bg-[#092C74] text-white flex items-center justify-center text-sm font-bold shrink-0 mt-0.5 group-hover:bg-[#E31D1A] transition-colors">
                      {idx + 1}
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#092C74] p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <h2 className="text-3xl font-black mb-8 relative z-10">Catatan Penting</h2>
                <div className="space-y-6 relative z-10">
                  {[
                    "Tanggal penutupan pendaftaran adalah batas akhir semua berkas pendaftaran harus sudah diterima oleh pihak Admisi STTB.",
                    "Pendaftar yang berkasnya tidak lolos pada tahap seleksi dokumen pendaftaran tidak akan dipanggil untuk mengikuti tes.",
                    "Tanggal tes akan dikonfirmasi resmi melalui surat panggilan, grup WhatsApp, serta pengumuman dari staf Admisi."
                  ].map((note, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="size-3 bg-[#E31D1A] rounded-full shrink-0 mt-2 shadow-[0_0_10px_#E31D1A]" />
                      <p className="text-white/90 leading-relaxed">{note}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl shadow-xl border-2 border-[#092C74]/10"
              >
                <h3 className="text-xl font-bold text-[#092C74] mb-6">Hubungi Kami</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <a href="https://wa.me/6281573360009" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl hover:bg-green-100 transition-colors group">
                    <Phone className="size-5 text-green-600 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-xs font-bold text-green-600 uppercase">WhatsApp</p>
                      <p className="font-bold text-gray-900">0815 7336 0009</p>
                    </div>
                  </a>
                  <a href="mailto:admisi@sttb.ac.id" className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors group">
                    <Mail className="size-5 text-blue-600 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-xs font-bold text-blue-600 uppercase">Email</p>
                      <p className="font-bold text-gray-900">admisi@sttb.ac.id</p>
                    </div>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-[#092C74] mb-4">Persyaratan Pendaftaran</h2>
            <div className="w-24 h-1.5 bg-[#E31D1A] mx-auto rounded-full" />
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* General Requirements */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-1 space-y-6"
              >
                <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-blue-50">
                  <h3 className="text-xl font-bold text-[#092C74] mb-6 flex items-center gap-2">
                    <Info className="size-6 text-[#E31D1A]" /> Syarat Umum
                  </h3>
                  <div className="grid gap-4">
                    {requirements.general.map((item, idx) => (
                      <div key={idx} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                        <div className="size-1.5 bg-[#E31D1A] rounded-full shrink-0 mt-1.5" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-[#092C74] to-[#061B46] p-8 rounded-[2rem] text-white shadow-xl">
                  <h3 className="text-xl font-bold mb-4">Catatan Khusus</h3>
                  <p className="text-sm text-white/70 italic">
                    Bagi lulusan luar negeri (B.A., B.S., dst), penerimaan akan dipertimbangkan berdasarkan kasus per kasus.
                  </p>
                </div>
              </motion.div>

              {/* Specific Requirements - S1 & S2 */}
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
                  
                  <TabsContent value="s1" className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100">
                    {academicRequirements.filter(r => r.programName.toLowerCase().includes('sarjana')).map((prog, idx) => (
                      <div key={idx} className="mb-12 last:mb-0">
                        <h4 className="text-xl font-black text-[#092C74] mb-6 pb-2 border-b-2 border-red-500 inline-block">{prog.programName}</h4>
                        <ul className="grid sm:grid-cols-2 gap-4">
                          {prog.requirements.map((item: string, i: number) => (
                            <li key={i} className="flex gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 text-sm text-gray-700 font-medium">
                              <CheckCircle className="size-5 text-green-600 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    {academicRequirements.filter(r => r.programName.toLowerCase().includes('sarjana')).length === 0 && (
                      <p className="text-gray-500 italic">Tidak ada prasyarat khusus yang tercatat.</p>
                    )}
                  </TabsContent>

                  <TabsContent value="s2" className="space-y-6">
                    {academicRequirements.filter(r => !r.programName.toLowerCase().includes('sarjana')).map((prog, idx) => (
                      <div key={idx} className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100">
                        <h4 className="text-xl font-black text-[#092C74] mb-6 pb-2 border-b-2 border-red-500 inline-block">{prog.programName}</h4>
                        <ul className="grid sm:grid-cols-2 gap-4">
                          {prog.requirements.map((item: string, i: number) => (
                            <li key={i} className="flex gap-3 p-4 bg-[#F2ECF8]/30 rounded-2xl border border-[#F2ECF8] text-sm text-gray-700 font-medium">
                              <CheckCircle className="size-5 text-[#E31D1A] shrink-0" />
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

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <HelpCircle className="size-16 text-[#092C74] mx-auto mb-4" />
              <h2 className="text-4xl font-black text-[#092C74]">FAQ Pendaftaran</h2>
              <p className="text-gray-500 mt-2 italic">Informasi lengkap untuk membantu pertimbangan studi Anda</p>
            </div>

            <div className="space-y-8">
              {faqCategories.map((category, idx) => (
                <div key={idx}>
                  <h3 className="text-lg font-black text-[#E31D1A] mb-4 uppercase tracking-widest flex items-center gap-2">
                    <div className="w-8 h-1 bg-[#E31D1A] rounded-full" /> {category.name}
                  </h3>
                  <Accordion type="single" collapsible className="space-y-3">
                    {category.items.map((item, i) => (
                      <AccordionItem key={i} value={`cat-${idx}-item-${i}`} className="bg-white border border-gray-200 rounded-2xl px-6 py-1 hover:border-[#092C74] transition-all shadow-sm">
                        <AccordionTrigger className="text-left font-bold text-gray-800 hover:text-[#092C74] hover:no-underline">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 leading-relaxed pb-6">
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

      <section className="py-20 bg-[#092C74] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-12">Pusat Bantuan & Layanan STTB</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Admisi & Marketing', sub: 'Pendaftaran & Seminar', contact: '+62 815-7336-0009', icon: Phone, color: 'bg-green-500' },
                { label: 'Akademik & Beasiswa', sub: 'Hubungi WA untuk info', contact: '+62 815-7127-228', icon: UserCheck, color: 'bg-blue-500' },
                { label: 'Layanan Keuangan', sub: 'keuangan@sttb.ac.id', contact: 'Kirim Bukti Transfer', icon: Mail, color: 'bg-purple-500' },
                { label: 'Perpustakaan', sub: 'Jurnal Stulos & Buku', contact: '+62 857-9153-8527', icon: BookOpen, color: 'bg-orange-500' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl hover:bg-white/20 transition-all group">
                  <div className={`size-12 ${item.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform mx-auto`}>
                    <item.icon className="size-6 text-white" />
                  </div>
                  <h4 className="text-white font-bold mb-1">{item.label}</h4>
                  <p className="text-white/60 text-xs mb-3">{item.sub}</p>
                  <p className="text-[#6AACE6] font-black text-sm tabular-nums">{item.contact}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Catatan Penting Section (Moved to integrated layout above or kept as separate logic) */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-red-100 italic text-center">
            <p className="text-gray-600 leading-relaxed font-medium">
              "Tanggal penutupan pendaftaran adalah batas akhir semua berkas pendaftaran harus sudah diterima oleh pihak Admisi STTB. Pendaftar yang berkasnya tidak lolos pada tahap seleksi dokumen tidak akan dipanggil untuk mengikuti tes."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}


