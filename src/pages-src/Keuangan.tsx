'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import Link from 'next/link';
import { DollarSign, Award, Heart, CheckCircle2, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { dataService } from '@/lib/data-service';
const bgHeader = "/assets/04-Beasiswa-Image-Header-scaled.jpg";
const bgPatternPanjang = "/assets/Page-Panjang-1.webp";

export function Keuangan() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("tuition");
  const [admissionCosts, setAdmissionCosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCosts = async () => {
      try {
        const data = await dataService.getAdmissionCosts();
        setAdmissionCosts(data.items || []);
      } catch (error) {
        console.error('Error fetching admission costs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCosts();

    const tab = searchParams.get('tab');
    if (tab && ['tuition', 'scholarship', 'support'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    router.replace(`/keuangan?tab=${value}`);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgPatternPanjang})` }}
    >
      <section className="relative text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={bgHeader} alt="Keuangan" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#092C74]/80 mix-blend-multiply" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Keuangan</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Informasi biaya kuliah dan program beasiswa
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white border-b border-gray-200 py-6 relative z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/admisi"
              className="flex items-center gap-2 px-6 py-3 bg-[#f8f9fa] hover:bg-[#F2ECF8] text-gray-700 hover:text-[#092C74] border border-gray-200 hover:border-[#092C74] rounded-full transition-all font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <CheckCircle2 className="size-5 text-[#E31D1A]" /> Informasi Pendaftaran
            </Link>
            <button
              onClick={() => setActiveTab('tuition')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 ${activeTab === 'tuition'
                ? 'bg-[#092C74] text-white border-transparent'
                : 'bg-[#f8f9fa] hover:bg-[#F2ECF8] text-gray-700 hover:text-[#092C74] border border-gray-200 hover:border-[#092C74]'
                }`}
            >
              <DollarSign className={`size-5 ${activeTab === 'tuition' ? 'text-white' : 'text-[#E31D1A]'}`} /> Informasi Biaya Studi
            </button>
            <button
              onClick={() => setActiveTab('scholarship')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 ${activeTab === 'scholarship'
                ? 'bg-[#E31D1A] text-white border-transparent'
                : 'bg-[#f8f9fa] hover:bg-[#F2ECF8] text-gray-700 hover:text-[#092C74] border border-gray-200 hover:border-[#092C74]'
                }`}
            >
              <Award className={`size-5 ${activeTab === 'scholarship' ? 'text-white' : 'text-[#E31D1A]'}`} /> Beasiswa STTB
            </button>
            <Link
              href="/dukungan"
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 ${activeTab === 'support'
                ? 'bg-[#092C74] text-white border-transparent'
                : 'bg-[#f8f9fa] hover:bg-[#F2ECF8] text-gray-700 hover:text-[#092C74] border border-gray-200 hover:border-[#092C74]'
                }`}
            >
              <Heart className={`size-5 ${activeTab === 'support' ? 'text-white' : 'text-[#E31D1A]'}`} /> Dukungan Pelayanan
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {activeTab === 'tuition' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-5xl mx-auto"
            >
              <div className="flex flex-col items-center mb-12 text-center">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex justify-center items-center mb-6">
                  <DollarSign className="size-10 text-[#092C74]" />
                </div>
                <h2 className="text-4xl font-extrabold text-[#092C74] mb-4">Biaya Studi (Perkuliahan)</h2>
                <p className="text-gray-600 max-w-2xl text-lg">Informasi lengkap rincian biaya pendidikan untuk seluruh program studi di Sekolah Tinggi Teologi Bandung.</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {admissionCosts.map((program, idx) => (
                  <div key={program.id || idx} className="bg-white border-2 border-gray-100 rounded-3xl p-8 hover:border-[#092C74] hover:shadow-xl transition-all h-full flex flex-col relative overflow-hidden">
                    {program.programName.includes('Magister') && (
                      <div className="absolute top-0 right-0 bg-[#092C74] text-white px-4 py-1 rounded-bl-xl font-semibold text-sm">Pascasarjana</div>
                    )}
                    <div className="flex items-center gap-3 mb-6">
                      <span className="flex items-center justify-center size-8 rounded-full bg-[#092C74] text-white font-bold text-lg shrink-0">{idx + 1}</span>
                      <h3 className="font-extrabold text-2xl text-[#092C74]">{program.programName}</h3>
                    </div>
                    
                    <div className="space-y-6 mb-6 flex-grow">
                      {program.costCategory && program.costCategory.length > 0 ? (
                        program.costCategory.map((category: any, catIdx: number) => (
                          <div key={catIdx} className="space-y-2">
                            <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-3">{category.categoryName}</h4>
                            <div className="space-y-3">
                              {category.costBreakdown.map((item: any, itemIdx: number) => (
                                <div key={itemIdx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                  <span className="text-gray-600 font-medium">{item.costName}</span>
                                  <span className="font-bold text-gray-900">Rp {item.cost.toLocaleString('id-ID')}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-10 text-gray-400 italic">
                          Data biaya belum tersedia untuk program ini.
                        </div>
                      )}
                    </div>

                    {program.programName.includes('Sarjana') && (
                      <div className="bg-[#f8f9fa] rounded-xl p-4 text-sm text-gray-600 border border-gray-200 mt-auto">
                        <strong className="text-gray-800 block mb-1">Catatan Khusus Sarjana:</strong>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Biaya pendidikan dapat dicicil per bulan.</li>
                          <li>Tersedia subsidi akomodasi & konsumsi bagi mahasiswa asrama.</li>
                        </ul>
                      </div>
                    )}
                  </div>
                ))}

                {admissionCosts.length === 0 && !isLoading && (
                  <div className="col-span-full text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                    <p className="text-gray-500 font-medium">Mohon maaf, informasi biaya studi saat ini sedang diperbarui.</p>
                  </div>
                )}
              </div>

              <div className="mt-10 bg-[#092C74] text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-xl">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center shrink-0 border border-white/20">
                  <Award className="size-8 text-yellow-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold mb-3">Catatan Umum Program Magister</h4>
                  <ul className="list-disc pl-5 space-y-2 text-white/90">
                    <li>Biaya pendidikan/kuliah dibayarkan selambat-lambatnya <strong className="text-white">2 (dua) minggu sebelum perkuliahan dimulai</strong>.</li>
                    <li>Biaya administrasi semester dibayarkan di <strong className="text-white">awal semester</strong>.</li>
                    <li>Biaya sewaktu-waktu dapat berubah dengan pemberitahuan sebelumnya dari pihak kampus.</li>
                  </ul>
                </div>
                <div className="shrink-0 w-full md:w-auto">
                  <Button className="w-full bg-[#E31D1A] hover:bg-[#C11815] font-bold py-6 px-8 rounded-full md:rounded-xl md:w-auto">Unduh Brosur PDF</Button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'scholarship' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-6xl mx-auto"
            >
              <div className="flex flex-col items-center mb-12 text-center">
                <div className="w-20 h-20 bg-red-50 rounded-full flex justify-center items-center mb-6 border border-red-100">
                  <Award className="size-10 text-[#E31D1A]" />
                </div>
                <h2 className="text-4xl font-extrabold text-[#092C74] mb-4">Program Beasiswa STTB</h2>
                <p className="text-gray-600 max-w-2xl text-lg">STTB menyediakan beasiswa bagi mahasiswa S1 dan S2 yang membutuhkan, asalkan memenuhi kriteria dan lolos seleksi.</p>
              </div>

              {/* Scholarship Image */}
              <div className="w-full h-[400px] mb-16 rounded-3xl overflow-hidden border-4 border-white shadow-lg">
                <img 
                  src="/assets/04-Beasiswa-Image-Header-scaled.jpg" 
                  alt="Beasiswa STTB" 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid lg:grid-cols-3 gap-8 mb-16">
                {/* 1. Beasiswa S1 Pastor Scholar */}
                <div className="bg-white border-2 border-gray-100 hover:border-[#E31D1A] rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all flex flex-col h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-[#E31D1A] text-white px-4 py-1.5 rounded-bl-2xl font-bold text-xs">S1 Mahasiswa Baru</div>
                  <div className="flex items-center gap-3 mb-6 mt-2">
                    <span className="flex items-center justify-center size-8 rounded-full bg-[#E31D1A]/10 text-[#E31D1A] font-bold text-lg shrink-0">1</span>
                    <h3 className="font-extrabold text-2xl text-[#092C74] text-balance">Beasiswa S1 Pastor Scholar</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-6 flex-grow">Bagi calon mahasiswa baru S1 yang menjadikan STTB sebagai pilihan pertama.</p>

                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 mb-2 mt-4 text-sm uppercase tracking-wide">Cakupan:</h4>
                    <p className="text-sm text-[#092C74] font-semibold bg-blue-50/50 p-4 rounded-xl border border-blue-100/50">Biaya pendidikan sejak semester 1.</p>

                    <h4 className="font-bold text-gray-900 mt-6 mb-3 text-sm uppercase tracking-wide">Persyaratan Utama:</h4>
                    <ul className="text-sm text-gray-700 space-y-2.5 list-none">
                      <li className="flex items-start gap-2"><span className="text-[#E31D1A] shrink-0 font-bold">•</span> Rata-rata rapor SMA min. 8.0 / 8.5</li>
                      <li className="flex items-start gap-2"><span className="text-[#E31D1A] shrink-0 font-bold">•</span> Panggilan pelayanan jelas & rekomendasi kuat</li>
                      <li className="flex items-start gap-2"><span className="text-[#E31D1A] shrink-0 font-bold">•</span> Pertahankan IPK min. 2.75 (Smst. 1) & 3.0 (Smst. 2-4)</li>
                      <li className="flex items-start gap-2"><span className="text-[#E31D1A] shrink-0 font-bold">•</span> Bantu kampus 15 jam/bulan</li>
                      <li className="flex items-start gap-2 font-medium"><span className="text-[#E31D1A] shrink-0 font-bold">•</span> Ikatan dinas 0.5 N (± 2 tahun pelayanan)</li>
                    </ul>
                  </div>
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 font-medium">* Evaluasi beasiswa dilakukan periodik setiap semester.</p>
                  </div>
                </div>

                {/* 2. Beasiswa S1 Formatio */}
                <div className="bg-white border-2 border-gray-100 hover:border-[#092C74] rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all flex flex-col h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-[#092C74] text-white px-4 py-1.5 rounded-bl-2xl font-bold text-xs">S1 Mahasiswa Aktif</div>
                  <div className="flex items-center gap-3 mb-6 mt-2">
                    <span className="flex items-center justify-center size-8 rounded-full bg-[#092C74]/10 text-[#092C74] font-bold text-lg shrink-0">2</span>
                    <h3 className="font-extrabold text-2xl text-[#092C74] text-balance">Beasiswa S1 Formatio</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-6 flex-grow">Ditujukan untuk mahasiswa S1 aktif yang sudah berjalan masa studinya.</p>

                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 mb-2 mt-4 text-sm uppercase tracking-wide">Cakupan:</h4>
                    <p className="text-sm text-[#092C74] font-semibold bg-blue-50/50 p-4 rounded-xl border border-blue-100/50">Biaya pendidikan S1 mulai tahun kedua (setelah tempuh semester 2).</p>

                    <h4 className="font-bold text-gray-900 mt-6 mb-3 text-sm uppercase tracking-wide">Persyaratan Utama:</h4>
                    <ul className="text-sm text-gray-700 space-y-2.5 list-none">
                      <li className="flex items-start gap-2"><span className="text-[#092C74] shrink-0 font-bold">•</span> Prestasi belajar baik (IPK min. 3.0)</li>
                      <li className="flex items-start gap-2"><span className="text-[#092C74] shrink-0 font-bold">•</span> Lolos tahap seleksi dan wawancara</li>
                      <li className="flex items-start gap-2"><span className="text-[#092C74] shrink-0 font-bold">•</span> Bantu kampus 15 jam/bulan</li>
                      <li className="flex items-start gap-2 font-medium"><span className="text-[#092C74] shrink-0 font-bold">•</span> Bersedia memenuhi Ikatan dinas 0.5 N</li>
                    </ul>
                  </div>
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 font-medium">* Evaluasi beasiswa dilakukan periodik setiap semester.</p>
                  </div>
                </div>

                {/* 3. Beasiswa S1 - S2 Transformative Leadership */}
                <div className="bg-gradient-to-br from-purple-50 to-white border-2 border-purple-100 hover:border-purple-300 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all flex flex-col h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-purple-600 text-white px-4 py-1.5 rounded-bl-2xl font-bold text-xs">S2 / S1 Menonjol</div>
                  <div className="flex items-center gap-3 mb-6 mt-2">
                    <span className="flex items-center justify-center size-8 rounded-full bg-purple-100 text-purple-600 font-bold text-lg shrink-0">3</span>
                    <h3 className="font-extrabold text-2xl text-[#092C74] text-balance">Transformative Leadership</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-6 flex-grow">Diperuntukkan utamanya bagi mahasiswa S2 yang menonjol secara akademik/non-akademik.</p>

                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 mb-2 mt-4 text-sm uppercase tracking-wide">Cakupan:</h4>
                    <p className="text-sm text-purple-700 font-semibold bg-white p-4 rounded-xl border border-purple-100 shadow-sm">Maksimal 50% dari total biaya pendidikan.</p>

                    <h4 className="font-bold text-gray-900 mt-6 mb-3 text-sm uppercase tracking-wide">Persyaratan Utama:</h4>
                    <ul className="text-sm text-gray-700 space-y-2.5 list-none">
                      <li className="flex items-start gap-2"><span className="text-purple-600 shrink-0 font-bold">•</span> Prestasi akademik/non-akademik menonjol</li>
                      <li className="flex items-start gap-2"><span className="text-purple-600 shrink-0 font-bold">•</span> Integritas dan panggilan yang jelas</li>
                      <li className="flex items-start gap-2"><span className="text-purple-600 shrink-0 font-bold">•</span> Bukti pelayanan 10 jam di lembaga/gereja</li>
                      <li className="flex items-start gap-2"><span className="text-purple-600 shrink-0 font-bold">•</span> Bersedia menjadi panitia event STTB</li>
                      <li className="flex items-start gap-2"><span className="text-purple-600 shrink-0 font-bold">•</span> Bersedia menjadi koordinator/ketua kelas</li>
                    </ul>
                  </div>
                  <div className="mt-auto pt-4 border-t border-purple-200">
                    <p className="text-sm font-bold text-green-600 flex items-center gap-2"><CheckCircle2 className="size-5" /> Tidak ada ikatan dinas</p>
                  </div>
                </div>
              </div>

              {/* Syarat, Ketentuan, & Sanksi Umum Beasiswa */}
              <div className="bg-[#092C74] rounded-[2rem] p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden xl:mx-12">
                {/* Decorative */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-[0.03] rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

                <h3 className="font-extrabold text-3xl mb-10 flex items-center gap-4 relative z-10">
                  <span className="w-2 h-10 bg-[#E31D1A] rounded-full inline-block"></span>
                  Syarat, Ketentuan, & Sanksi Umum
                </h3>

                <div className="grid lg:grid-cols-2 gap-12 relative z-10">
                  <div>
                    <h4 className="font-bold text-xl mb-6 text-blue-200 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-sm">A</div>
                      Prosedur Pendaftaran
                    </h4>
                    <ol className="list-decimal pl-5 space-y-4 text-white/90 text-[15px] leading-relaxed marker:text-blue-300 marker:font-bold">
                      <li>Mengunduh formulir beasiswa (tersedia untuk S1 dan S2 di website).</li>
                      <li>Melengkapi dokumen penunjang.</li>
                      <li>Mengirimkan kembali aplikasi via email ke <strong className="text-white bg-blue-900/50 px-2 py-0.5 rounded">beasiswa@sttb.ac.id</strong> selambat-lambatnya 3 minggu sebelum proses pendaftaran periode ditutup.</li>
                      <li>Mengikuti proses seleksi dan wawancara.</li>
                    </ol>
                    <div className="mt-8 p-5 bg-white/5 rounded-2xl text-sm text-blue-100 border border-white/10 backdrop-blur-sm">
                      <strong className="block text-white mb-2 uppercase tracking-wide text-xs">Catatan Penting</strong>
                      Jika tidak lolos seleksi, pendaftar diperbolehkan mengajukan ulang di periode berikutnya. Namun, penerima beasiswa satu jenis tidak dapat mengajukan jenis beasiswa lain di periode yang sama/berikutnya.
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-xl mb-6 text-red-300 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-sm text-red-300">B</div>
                      Evaluasi & Sanksi
                    </h4>
                    <ul className="space-y-6 text-[15px] text-white/90 leading-relaxed">
                      <li className="flex items-start gap-4">
                        <div className="mt-1.5 size-2 bg-blue-300 rounded-full shrink-0 shadow-[0_0_8px_rgba(147,197,253,0.8)]"></div>
                        <p>Mahasiswa wajib mengikuti evaluasi per semester. Jika gagal memenuhi syarat (IPK turun di bawah ketentuan), beasiswa akan dihentikan pada semester berjalan.</p>
                      </li>
                      <li className="flex items-start gap-4 bg-red-950/40 p-5 rounded-2xl border border-red-500/20">
                        <div className="mt-1.5 size-2 bg-[#E31D1A] rounded-full shrink-0 shadow-[0_0_8px_rgba(227,29,26,0.8)]"></div>
                        <div>
                          <strong className="block text-white mb-3 text-lg">Pelanggaran Berat</strong>
                          <p className="mb-3 text-red-200/80">Jika penerima beasiswa melanggar aturan kampus dan mendapat Surat Peringatan (SP), maka:</p>
                          <ul className="list-none space-y-2 text-white/90">
                            <li className="flex gap-2"><span className="text-red-400">1.</span> Dana beasiswa langsung dihentikan.</li>
                            <li className="flex gap-2"><span className="text-red-400">2.</span> Penerima beasiswa <span className="font-bold text-red-300 mx-1">wajib mengembalikan</span> seluruh dukungan dana beasiswa yang telah diterima selama ini.</li>
                            <li className="flex gap-2"><span className="text-red-400">3.</span> Penerima beasiswa akan diskorsing selama 1 semester.</li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

          {activeTab === 'support' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-4xl mx-auto text-center"
            >
              <Heart className="size-16 text-[#E31D1A] mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-6">Dukung STTB</h2>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                Kontribusi Anda akan membantu mahasiswa yang membutuhkan untuk melanjutkan studi teologi dan melayani Tuhan dengan lebih baik.
              </p>
              <div className="bg-[#F2ECF8] p-10 rounded-3xl max-w-xl mx-auto border border-blue-100 shadow-xl">
                <h3 className="font-bold text-2xl mb-6 text-[#092C74]">Mari Berkontribusi</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  STTB mengalokasikan dukungan dana untuk Program Beasiswa, Perpustakaan Digital, dan Pengembangan Institusi.
                </p>
                <Link href="/dukungan">
                  <Button className="w-full py-7 bg-[#092C74] hover:bg-[#1C64E8] text-white font-bold text-lg rounded-xl transition-all shadow-lg hover:-translate-y-1">
                    Lihat Informasi Donasi Selengkapnya
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}

        </div>
      </section>
    </div>
  );
}

