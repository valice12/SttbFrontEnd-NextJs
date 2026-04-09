'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';
import Link from 'next/link';
import { DollarSign, Award, Heart, CheckCircle2, ChevronRight, FileText, PieChart, Landmark, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { dataService } from '@/lib/data-service';
import { FinanceNavbar } from '@/components/features/keuangan/FinanceNavbar';

const bgHeader = "/assets/04-Beasiswa-Image-Header-scaled.jpg";
const bgPatternPanjang = "/assets/Page-Panjang-1.webp";

const heroConfigs: Record<string, { top: string, bottom: string, tag: string, bg: string, grad: string }> = {
  tuition: {
    top: "Finansial &",
    bottom: "Biaya Studi",
    tag: "Fulfilling Your Calling",
    bg: "from-[#064E3B]/95 via-[#061B46]/45",
    grad: "text-transparent bg-clip-text bg-gradient-to-r from-[#6AACE6] via-[#A855F7] to-[#E31D1A]"
  },
  scholarship: {
    top: "Program &",
    bottom: "Beasiswa STTB",
    tag: "Academic Excellence",
    bg: "from-[#312E81]/95 via-[#1E3A8A]/45",
    grad: "text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] via-[#C084FC] to-[#E0E7FF]"
  },
  support: {
    top: "Membangun",
    bottom: "Masa Depan",
    tag: "Giving with Heart",
    bg: "from-[#7F1D1D]/95 via-[#9A3412]/45",
    grad: "text-transparent bg-clip-text bg-gradient-to-r from-[#FCA5A5] via-[#F87171] to-[#EF4444]"
  }
};

export function Keuangan() {
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

  const currentHero = heroConfigs[activeTab] || heroConfigs.tuition;

  return (
    <div
      className="min-h-screen bg-white bg-cover bg-center"
      style={{ backgroundImage: `url(${bgPatternPanjang})` }}
    >
      {/* Premium Hero Section - Financial Info */}
      <section className="relative h-[550px] md:h-[650px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={bgHeader} alt="Financial Info" className="w-full h-full object-cover scale-105" />
          <div className={`absolute inset-0 bg-gradient-to-br ${currentHero.bg} to-transparent z-10 transition-colors duration-1000`} />
          
          <div className="absolute top-1/4 -right-20 size-[500px] bg-[#E31D1A]/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-0 -left-20 size-[400px] bg-[#092C74]/40 blur-[100px] rounded-full" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center z-20">
          <div className="max-w-4xl">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="backdrop-blur-md bg-white/5 border border-white/10 p-10 md:p-14 rounded-[40px] shadow-2xl relative overflow-hidden"
            >
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E31D1A] rounded-full text-white text-xs font-black uppercase tracking-widest mb-8 shadow-lg shadow-red-500/30"
                >
                   <DollarSign className="size-3" /> {currentHero.tag}
                </motion.div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[1.1] tracking-tight drop-shadow-2xl">
                  {currentHero.top} <br />
                  <span className={currentHero.grad}>{currentHero.bottom}</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl leading-relaxed">
                  Investasikan masa depan pelayanan Anda melalui sistem keuangan yang transparan, akomodatif, dan didukung berbagai opsi beasiswa prestisius.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Navigation Tabs - Centralized */}
      <FinanceNavbar />

      <section className="py-24">
        <div className="container mx-auto px-4">
          {activeTab === 'tuition' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-7xl mx-auto"
            >
              <div className="flex flex-col items-center mb-24 text-center">
                <div className="size-20 bg-[#F2ECF8] rounded-[1.5rem] flex justify-center items-center mb-8 border border-blue-50 shadow-inner">
                  <Landmark className="size-10 text-[#092C74]" />
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-[#092C74] mb-8 tracking-tighter">Biaya Studi <span className="text-[#E31D1A]">&</span> Investasi Akademik</h2>
                <div className="w-24 h-1.5 bg-gradient-to-r from-[#092C74] via-[#6A0DAD] to-[#E31D1A] rounded-full" />
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                {admissionCosts.map((program, idx) => (
                  <motion.div 
                    key={program.id || idx}
                    whileHover={{ y: -10 }}
                    className="backdrop-blur-xl bg-white/40 border border-white p-10 md:p-14 rounded-[3.5rem] shadow-[0_40px_80px_rgba(9,44,116,0.05)] relative overflow-hidden group transition-all duration-700 h-full flex flex-col"
                  >
                    <div className="absolute top-0 right-0 size-64 bg-[#092C74]/5 blur-[60px] rounded-full -mr-32 -mt-32 group-hover:bg-[#E31D1A]/5 transition-colors duration-700" />
                    
                    <div className="flex justify-between items-start mb-12 relative z-10">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="size-12 bg-[#092C74] text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-xl shadow-blue-900/20">
                            {idx + 1}
                          </div>
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Program Akademik</span>
                        </div>
                        <h3 className="font-black text-3xl md:text-4xl text-[#092C74] tracking-tighter max-w-sm">{program.programName}</h3>
                      </div>
                      {program.programName.includes('Magister') && (
                        <div className="bg-[#4B0082] text-white px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl">Postgraduate</div>
                      )}
                    </div>
                    
                    <div className="space-y-12 mb-16 flex-grow relative z-10">
                      {program.costCategory?.map((category: any, catIdx: number) => (
                        <div key={catIdx} className="space-y-6">
                          <h4 className="text-[10px] font-black text-[#E31D1A] uppercase tracking-[0.4em] flex items-center gap-4">
                            <div className="h-px w-8 bg-[#E31D1A]" />
                            {category.categoryName}
                          </h4>
                          <div className="space-y-1">
                            {category.costBreakdown.map((item: any, itemIdx: number) => (
                              <div key={itemIdx} className="flex justify-between items-center py-5 border-b border-gray-100/50 group/item hover:bg-white/40 rounded-xl px-4 transition-all">
                                <span className="text-gray-500 font-bold text-base group-hover/item:text-[#092C74] transition-colors">{item.costName}</span>
                                <div className="text-right">
                                  <span className="block font-black text-[#092C74] text-xl tracking-tight">Rp {item.cost.toLocaleString('id-ID')}</span>
                                  <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Net Amount</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-[#092C74] p-10 rounded-[2.5rem] text-white relative z-10 overflow-hidden shadow-2xl">
                      <div className="absolute top-0 right-0 p-6 opacity-10">
                        <PieChart className="size-20" />
                      </div>
                      <h5 className="font-black text-xs uppercase tracking-widest mb-6 text-[#6AACE6]">Kebijakan Finansial</h5>
                      <ul className="space-y-5">
                        <li className="flex items-center gap-4">
                          <CheckCircle2 className="size-5 text-[#E31D1A]" />
                          <span className="font-bold text-sm text-white/90">Instalment Plan Bulanan Tersedia</span>
                        </li>
                        <li className="flex items-center gap-4">
                          <CheckCircle2 className="size-5 text-[#E31D1A]" />
                          <span className="font-bold text-sm text-white/90">Subsidi Akomodasi Khusus</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-20 backdrop-blur-xl bg-[#092C74] p-10 md:p-14 rounded-[4rem] text-white shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center gap-12">
                 <div className="absolute top-0 right-0 size-96 bg-white/5 blur-[100px] rounded-full" />
                 <div className="size-24 bg-white/10 rounded-[2.5rem] flex items-center justify-center border border-white/20 shrink-0">
                    <Award className="size-12 text-yellow-400" />
                 </div>
                 <div className="flex-1 space-y-6">
                    <h4 className="text-3xl font-black tracking-tight">Catatan Transparansi</h4>
                    <ul className="space-y-4">
                       <li className="flex items-start gap-4 text-white/70 font-medium">
                          <div className="size-2 bg-[#E31D1A] rounded-full mt-2 lg:mt-3 shrink-0" />
                          <p>Pembayaran selambat-lambatnya <strong className="text-white">14 hari</strong> sebelum perkuliahan dimulai.</p>
                       </li>
                       <li className="flex items-start gap-4 text-white/70 font-medium">
                          <div className="size-2 bg-[#E31D1A] rounded-full mt-2 lg:mt-3 shrink-0" />
                          <p>Biaya administrasi semester wajib diselesaikan di <strong className="text-white">awal periode akademik</strong>.</p>
                       </li>
                    </ul>
                 </div>
                 <Button className="h-20 px-12 bg-white hover:bg-[#E31D1A] text-[#092C74] hover:text-white font-black text-lg rounded-[1.5rem] shadow-2xl transition-all duration-500 uppercase tracking-widest">
                    Unduh Katalog PDF <ChevronRight className="ml-2 size-5" />
                 </Button>
              </div>
            </motion.div>
          )}

          {activeTab === 'scholarship' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-7xl mx-auto"
            >
              <div className="flex flex-col items-center mb-24 text-center">
                <div className="size-20 bg-[#F2ECF8] rounded-[1.5rem] flex justify-center items-center mb-8 border border-blue-50 shadow-inner">
                  <Award className="size-10 text-[#092C74]" />
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-[#092C74] mb-8 tracking-tighter">Program <span className="text-[#E31D1A]">Beasiswa</span> Unggulan</h2>
                <div className="w-24 h-1.5 bg-gradient-to-r from-[#092C74] via-[#6A0DAD] to-[#E31D1A] rounded-full" />
              </div>

              <div className="grid lg:grid-cols-3 gap-10 mb-32">
                {[
                  { title: "Pastor Scholar", cat: "Entry Level", c1: "Biaya Pendidikan Penuh", req: ["Rapor min. 8.5", "Rekomendasi Gereja"], color: "from-[#092C74] to-blue-900" },
                  { title: "Beasiswa Formatio", cat: "Active Student", c1: "Tahun ke-2 Full Coverage", req: ["IPK Minimal 3.2", "Wawancara Institusi"], color: "from-[#4B0082] to-indigo-900" },
                  { title: "Leadership Grant", cat: "Elite Program", c1: "Potongan Hingga 50%", req: ["Prestasi Non-Akademik", "Aktif Organisasi"], color: "from-[#E31D1A] to-red-900" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -10 }}
                    className="backdrop-blur-xl bg-white/40 border border-white p-10 lg:p-14 rounded-[3.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.05)] relative overflow-hidden group h-full flex flex-col"
                  >
                    <div className={`absolute top-0 right-0 size-32 bg-gradient-to-br ${item.color} rounded-full -mr-16 -mt-16 opacity-5 group-hover:opacity-10 transition-opacity`} />
                    <div className="mb-12">
                      <span className="text-[10px] font-black text-[#E31D1A] uppercase tracking-[0.3em] block mb-4">{item.cat}</span>
                      <h3 className="text-3xl font-black text-[#092C74] tracking-tight leading-tight">{item.title}</h3>
                    </div>
                    
                    <div className="p-8 bg-[#092C74] rounded-[2rem] text-white shadow-xl mb-10 relative overflow-hidden">
                       <div className="absolute inset-0 bg-white/5 opacity-10" />
                       <p className="text-[9px] font-black uppercase tracking-widest text-blue-300 mb-3 relative z-10">Cakupan Beasiswa</p>
                       <p className="text-lg font-black italic relative z-10">{item.c1}</p>
                    </div>

                    <div className="space-y-4 mb-12 flex-grow">
                       {item.req.map((r, ri) => (
                         <div key={ri} className="flex items-center gap-3">
                            <CheckCircle2 className="size-4 text-[#092C74]" />
                            <span className="text-sm font-bold text-gray-500">{r}</span>
                         </div>
                       ))}
                    </div>

                    <div className="mt-auto pt-8 border-t border-gray-100 flex justify-between items-center">
                       <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Selective Process</span>
                       <ChevronRight className="size-5 text-gray-300" />
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-[#092C74] rounded-[4rem] p-12 md:p-24 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 size-[600px] bg-white/5 blur-[120px] rounded-full -mr-48 -mt-48" />
                
                <div className="relative z-10">
                   <div className="flex flex-col lg:flex-row justify-between items-center gap-16 mb-20">
                      <div className="max-w-2xl text-center lg:text-left">
                         <h3 className="text-4xl md:text-5xl font-black mb-8 leading-tight tracking-tighter">Syarat, Ketentuan <br /> <span className="text-[#6AACE6]">& Regulasi Beasiswa</span></h3>
                         <div className="w-20 h-2 bg-[#E31D1A] rounded-full mx-auto lg:mx-0" />
                      </div>
                      <div className="flex-1 max-w-lg p-10 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-md">
                         <h4 className="text-[#E31D1A] font-black text-xs uppercase tracking-[0.3em] mb-6">Pelanggaran Etika</h4>
                         <p className="text-lg font-medium leading-relaxed text-white/80">Kecurangan akademik atau pelanggaran kode etik STTB akan berakibat pada penghentian total dana beasiswa.</p>
                      </div>
                   </div>

                   <div className="grid md:grid-cols-2 gap-16">
                      <div className="space-y-10">
                         {["Unduh formulir resmi di Portal STTB.", "Lengkapi portofolio pelayanan.", "Interview komprehensif bersama Senat Dosen."].map((step, si) => (
                           <div key={si} className="flex items-start gap-6 group">
                              <div className="size-10 rounded-2xl bg-white/10 flex items-center justify-center font-black text-white shrink-0 group-hover:bg-[#E31D1A] transition-colors">0{si+1}</div>
                              <p className="text-xl font-bold text-white/80 transition-colors group-hover:text-white pt-1">{step}</p>
                           </div>
                         ))}
                      </div>
                      <div className="p-10 border border-white/10 rounded-[3rem] bg-gradient-to-br from-white/5 to-transparent">
                         <h4 className="text-xl font-black mb-6">Evaluasi Semester</h4>
                         <p className="text-white/60 leading-relaxed italic">"Penerima beasiswa wajib mempertahankan standar IPK dan keaktifan pelayanan yang dievaluasi secara ketat setiap semester."</p>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'support' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto text-center"
            >
              <div className="size-24 bg-[#F2ECF8] rounded-[2.5rem] flex items-center justify-center mx-auto mb-12 border border-blue-50 shadow-xl">
                 <Heart className="size-12 text-[#E31D1A] animate-pulse" />
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-[#092C74] mb-10 tracking-tighter leading-tight">Membangun Masa Depan <br /> Melalui <span className="text-[#E31D1A]">Dukungan Anda.</span></h2>
              <p className="text-2xl text-gray-500 font-medium mb-16 max-w-3xl mx-auto leading-relaxed italic">
                Setiap kontribusi Anda merupakan investasi abadi bagi pertumbuhan Kerajaan Allah melalui pendidikan teologi yang holistik.
              </p>
              
              <div className="backdrop-blur-2xl bg-white/40 p-12 md:p-20 rounded-[4rem] border border-white shadow-[0_50px_100px_rgba(9,44,116,0.08)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 size-80 bg-[#092C74]/5 blur-[80px] rounded-full group-hover:scale-110 transition-transform duration-1000" />
                
                <h3 className="font-black text-4xl mb-8 text-[#092C74] relative z-10 tracking-tight">Menjadi Mitra Pelayanan</h3>
                <p className="text-gray-500 mb-12 leading-relaxed font-bold text-lg relative z-10 max-w-2xl mx-auto">
                  Dukungan Anda akan dikelola secara transparan untuk memfasilitasi beasiswa, riset teologi, dan pengembangan infrastruktur kampus modern.
                </p>
                <Link href="/dukungan">
                  <Button className="h-20 px-16 bg-[#092C74] hover:bg-[#E31D1A] text-white font-black text-xl rounded-[1.5rem] shadow-2xl transition-all duration-500 hover:-translate-y-2 relative z-10 uppercase tracking-widest">
                    SAYA INGIN BERKONTRIBUSI <ChevronRight className="ml-3 size-6" />
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
