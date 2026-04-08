'use client';

import { motion } from 'motion/react';
import { Building, Users, Calendar, Target, ShieldCheck, ChevronRight, Zap, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const bgHeader = "/assets/sttb-2-BG.png";
const bgPattern = "/assets/background.webp";

export function Lead() {
  return (
    <div 
      className="min-h-screen bg-white bg-cover bg-center"
      style={{ backgroundImage: `url(${bgPattern})` }}
    >
      {/* Premium Hero Section - L.E.A.D */}
      <section className="relative h-[600px] md:h-[750px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={bgHeader} alt="STTB Leadership" className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E1B4B]/95 via-[#7F1D1D]/45 to-transparent z-10" />
          
          <div className="absolute top-1/4 -right-20 size-[500px] bg-[#E31D1A]/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-0 -left-20 size-[400px] bg-[#092C74]/40 blur-[100px] rounded-full" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center z-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="backdrop-blur-md bg-white/5 border border-white/10 p-12 md:p-24 rounded-[50px] shadow-2xl relative overflow-hidden group"
            >
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-[#E31D1A] rounded-full text-white text-xs font-black uppercase tracking-[0.4em] mb-12 shadow-lg shadow-red-500/30"
                >
                   Institutional Philosophy
                </motion.div>

                <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-black text-white mb-10 leading-[0.85] tracking-tighter drop-shadow-2xl flex flex-col">
                  <span>L.E.A.D</span>
                </h1>
                
                <div className="flex flex-wrap gap-6 mt-10">
                   {["LOYALTY", "EXCELLENCE", "ACCOUNTABILITY", "DISCIPLINE"].map((word, i) => (
                     <div key={i} className="flex items-center gap-3">
                        <div className="size-2 bg-[#E31D1A] rounded-full" />
                        <span className="text-white/80 font-black text-xs md:text-sm uppercase tracking-[0.3em]">{word}</span>
                     </div>
                   ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="space-y-32 mb-20 py-32">
        {/* Institutional Identity Section - Authoritative Typography */}
        <section className="relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 px-5 py-2 bg-[#F2ECF8] rounded-full text-[#092C74] text-[10px] font-black uppercase tracking-[0.3em] mb-12 border border-blue-50 shadow-sm"
              >
                 <ShieldCheck className="size-3 text-[#E31D1A]" /> Established Since 1935
              </motion.div>
              
              <h2 className="text-5xl md:text-8xl font-black text-[#092C74] tracking-tighter leading-[0.95] mb-12 max-w-5xl">
                Kepemimpinan <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#092C74] via-[#4B0082] to-[#E31D1A]">Teologis Visioner.</span>
              </h2>
              
              <p className="text-xl md:text-3xl text-gray-400 font-medium max-w-4xl leading-relaxed italic border-l-8 border-[#E31D1A]/20 pl-10 py-4 mx-auto mb-16">
                "Sekolah Tinggi Teologi Bandung berkomitmen menghasilkan alumni yang setia pada doktrin Alkitabiah, cakap dalam kepemimpinan, dan relevan bagi gereja di era digital."
              </p>

              <div className="w-32 h-2 bg-gradient-to-r from-[#092C74] via-[#E31D1A] to-[#092C74] rounded-full" />
            </div>
          </div>
        </section>

        {/* Strategic Vision - PHI Grid */}
        <section className="relative px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="space-y-10"
              >
                 <div className="size-16 bg-[#092C74]/5 rounded-2xl flex items-center justify-center text-[#092C74] shadow-inner mb-6">
                    <Target className="size-10" />
                 </div>
                 <h2 className="text-4xl md:text-6xl font-black text-[#092C74] tracking-tighter leading-tight">
                    Visi & Misi <br /><span className="text-[#E31D1A]">Transformatif</span>
                 </h2>
                 <p className="text-lg text-gray-500 font-medium leading-relaxed">
                    Kami tidak hanya sekadar mengajar, kami membentuk karakter. Fokus strategis kami adalah integrasi antara integritas teologis dengan penguasaan teknologi informasi.
                 </p>
                 
                 <div className="space-y-8">
                    {[
                      { t: "Excellence in Theology", d: "Kedalaman riset Alkitabiah yang murni." },
                      { t: "Global Impact", d: "Menyiapkan hamba Tuhan bagi dunia global." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-6 group">
                         <div className="size-12 rounded-xl bg-gray-50 flex items-center justify-center text-[#E31D1A] border border-gray-100 group-hover:bg-[#E31D1A] group-hover:text-white transition-all duration-500">
                            <CheckCircle2 className="size-6" />
                         </div>
                         <div>
                            <h4 className="text-xl font-black text-[#092C74] tracking-tight mb-1">{item.t}</h4>
                            <p className="text-gray-400 font-medium">{item.d}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </motion.div>

              <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="backdrop-blur-xl bg-white/40 border-2 border-white p-12 md:p-20 rounded-[4rem] shadow-2xl relative overflow-hidden group"
              >
                 <div className="absolute top-0 right-0 size-80 bg-[#092C74]/5 blur-[80px] rounded-full" />
                 <div className="relative z-10 space-y-12">
                    <div className="size-20 bg-[#092C74] rounded-3xl flex items-center justify-center text-white shadow-xl shadow-blue-900/20 group-hover:rotate-6 transition-transform">
                       <Building className="size-10" />
                    </div>
                    <h3 className="text-3xl font-black text-[#092C74] tracking-tighter">Pusat Inovasi Teologi (PIT) STTB</h3>
                    <p className="text-gray-500 font-medium leading-relaxed italic">
                       "STTB menjadi pionir dalam pengembangan kurikulum teologi berbasis digital di Indonesia, menghubungkan tradisi klasik dengan teknologi mutakhir."
                    </p>
                    <Button className="h-16 px-10 bg-white hover:bg-[#092C74] text-[#092C74] hover:text-white font-black text-sm rounded-2xl border-2 border-gray-100 transition-all duration-500 uppercase tracking-widest shadow-sm">
                       Pelajari Struktur Institusi <ChevronRight className="ml-2 size-5" />
                    </Button>
                 </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section - High End Counters */}
        <section className="py-20 bg-[#061B46] relative overflow-hidden rounded-[4rem] mx-4">
          <div className="absolute inset-0 bg-gradient-to-br from-[#092C74] via-[#4B0082] to-black opacity-80" />
          <div className="absolute top-0 left-0 size-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          
          <div className="relative z-10 container mx-auto px-4">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                {[
                  { l: "Alumni Tersebar", v: "5.000+", icon: Users },
                  { l: "Tahun Berdiri", v: "1935", icon: Calendar },
                  { l: "Program Studi", v: "04", icon: Building },
                  { l: "Akreditasi", v: "UNGGUL", icon: ShieldCheck }
                ].map((stat, i) => (
                  <div key={i} className="space-y-4 group">
                     <div className="size-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto text-[#6AACE6] mb-6 border border-white/5 shadow-2xl group-hover:bg-[#E31D1A] group-hover:text-white transition-all duration-500">
                        <stat.icon className="size-7" />
                     </div>
                     <h5 className="text-4xl md:text-5xl font-black text-white tracking-tighter">{stat.v}</h5>
                     <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em]">{stat.l}</p>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* Directives Section */}
        <section className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
             <div className="size-24 rounded-[2rem] bg-[#092C74] flex items-center justify-center text-white shadow-2xl shrink-0 group hover:rotate-12 transition-transform">
                <Zap className="size-12" />
             </div>
             <div>
                <p className="text-2xl md:text-3xl font-black text-[#092C74] leading-tight tracking-tighter mb-4 italic">
                   "Kami tidak hanya menyiapkan lulusan untuk melayani di dalam gedung gereja, <br /> tapi untuk memimpin di ruang publik."
                </p>
                <div className="flex gap-4">
                   <span className="text-[10px] font-black text-[#E31D1A] uppercase tracking-widest">Senat Akademik STTB</span>
                   <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest px-4 border-l border-gray-200">Official Directive</span>
                </div>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
}
