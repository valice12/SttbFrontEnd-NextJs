'use client';

import { motion } from 'motion/react';
import { Building, Users, Heart, ShieldCheck, ChevronRight, MapPin, Zap } from 'lucide-react';
import { VideoSection } from '../home/components/VideoSection';

const fasilitasPerpustakaan = "/assets/fasilitas-1-2-480x480.png";
const fasilitasAsrama = "/assets/fasilitas-4-480x480.png";
const fasilitasKelas = "/assets/fasilitas-8-480x480.png";
const fasilitasKapel = "/assets/fasilitas-2.png";
const fasilitasKantin = "/assets/fasilitas-19-480x480.png";
const fasilitasOlahraga = "/assets/fasilitas-16.png";
const bgHeader = "/assets/sttb-2-BG.png";
const bgPattern = "/assets/background.webp";

const facilities = [
  { name: 'Perpustakaan', img: fasilitasPerpustakaan, desc: 'Pusat literasi digital & koleksi teologi terlengkap.' },
  { name: 'Asrama Putra/i', img: fasilitasAsrama, desc: 'Hunian nyaman untuk pembentukan karakter & komunitas.' },
  { name: 'Ruang Kelas', img: fasilitasKelas, desc: 'Fasilitas belajar modern dengan dukungan multimedia.' },
  { name: 'Kapel STTB', img: fasilitasKapel, desc: 'Pusat peribadahan & pertumbuhan spiritual bersama.' },
  { name: 'Kantin Sehat', img: fasilitasKantin, desc: 'Area sosial & konsumsi yang higienis dan representatif.' },
  { name: 'Area Olahraga', img: fasilitasOlahraga, desc: 'Sarana kebugaran untuk keseimbangan hidup sehat.' },
];

export function KehidupanKampus() {
  return (
    <div 
      className="min-h-screen bg-white bg-cover bg-center"
      style={{ backgroundImage: `url(${bgPattern})` }}
    >
      {/* Premium Hero Section - Synchronized with Global Standard */}
      <section className="relative h-[550px] md:h-[650px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={bgHeader} alt="Campus Life Hero" className="w-full h-full object-cover scale-105" />
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
              className="backdrop-blur-md bg-white/5 border border-white/10 p-10 md:p-14 lg:p-16 rounded-[40px] shadow-2xl relative overflow-hidden"
            >
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E31D1A] rounded-full text-white text-xs font-black uppercase tracking-widest mb-8 shadow-lg shadow-red-500/30"
                >
                   <Users className="size-3" /> Vibrant Community
                </motion.div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[1.1] tracking-tighter drop-shadow-2xl">
                  Kehidupan <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6AACE6] via-[#A855F7] to-[#E31D1A]">Kampus</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl leading-relaxed">
                  Menghadirkan ekosistem belajar yang holistik, asrama yang komunal, serta fasilitas modern untuk menunjang pertumbuhan spiritual dan intelektual Anda.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Facilities Section - PHI Based Grid */}
      <section className="py-32 lg:py-48">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-24 lg:mb-32 text-center">
             <div className="size-20 bg-[#F2ECF8] rounded-[1.5rem] flex justify-center items-center mb-8 border border-blue-100 shadow-inner">
                <Building className="size-10 text-[#092C74]" />
             </div>
             <h2 className="text-4xl lg:text-6xl font-black text-[#092C74] tracking-tighter mb-8 leading-tight">Sarana <span className="text-[#E31D1A]">Modern</span> & Eksklusif</h2>
             <p className="text-gray-500 max-w-3xl text-xl font-medium leading-relaxed">STT Bandung berkomitmen menyediakan sarana penunjang akademik dan spiritual yang representatif demi kemuliaan Sang Pencipta.</p>
             <div className="w-24 h-1.5 bg-gradient-to-r from-[#092C74] via-[#6A0DAD] to-[#E31D1A] mt-12 rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 max-w-7xl mx-auto">
            {facilities.map((facility, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                whileHover={{ y: -15 }}
                className="backdrop-blur-xl bg-white/40 p-10 rounded-[3.5rem] shadow-[0_40px_80px_rgba(9,44,116,0.05)] border border-white group hover:shadow-[0_60px_120px_rgba(9,44,116,0.1)] transition-all duration-700 overflow-hidden relative"
              >
                {/* Visual Accent */}
                <div className="absolute top-10 right-10 text-[10rem] font-black text-[#092C74]/5 select-none transition-colors group-hover:text-[#E31D1A]/5">0{i+1}</div>
                
                <div className="aspect-square w-full mb-10 overflow-hidden rounded-[2.5rem] border-4 border-white shadow-2xl relative z-10 group-hover:scale-[1.03] transition-transform duration-700">
                  <img src={facility.img} alt={facility.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#092C74]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute top-6 right-6 size-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                     <Zap className="size-6" />
                  </div>
                </div>
                
                <div className="relative z-10 space-y-4">
                   <div className="flex items-center gap-3">
                      <div className="h-px w-8 bg-[#E31D1A] group-hover:w-16 transition-all duration-700" />
                      <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Campus Facility</span>
                   </div>
                   <h3 className="font-black text-3xl text-[#092C74] tracking-tight group-hover:text-[#E31D1A] transition-colors duration-500">{facility.name}</h3>
                   <p className="text-gray-500 font-medium leading-relaxed italic pr-4">{facility.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Experience Section */}
      <VideoSection 
        tag="Campus Tour"
        title="Jelajahi Fasilitas STT Bandung"
        description="Mari berkeliling dan melihat langsung fasilitas modern serta lingkungan asri yang mendukung perjalanan studi dan pertumbuhan rohani Anda."
      />

      {/* Community Experience Section */}
      <section className="py-32 bg-[#061B46] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#092C74] to-black opacity-90" />
        <div className="absolute top-0 right-0 size-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
             <div className="lg:w-1/2 space-y-12">
                <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/10 rounded-full text-white text-[10px] font-black uppercase tracking-widest border border-white/10 backdrop-blur-md">
                   <Heart className="size-3 text-red-500 animate-pulse" /> Community Life
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
                  Lebih dari Sekadar <br /> <span className="text-[#6AACE6]">Lingkungan Akademik.</span>
                </h2>
                <p className="text-xl text-white/60 font-medium leading-relaxed">
                   Di STTB, kehidupan kampus dirancang untuk membentuk persekutuan yang erat antar mahasiswa melalui berbagai kegiatan rohani, sosial, dan minat bakat.
                </p>
                <div className="grid sm:grid-cols-2 gap-8">
                   {[
                     { title: "Riset Teologi", icon: ShieldCheck },
                     { title: "Pelayanan Misi", icon: Zap },
                     { title: "Olahraga Rutin", icon: MapPin },
                     { title: "Kapel Mingguan", icon: Building }
                   ].map((item, i) => (
                     <div key={i} className="flex items-center gap-4 group">
                        <div className="size-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-[#E31D1A] transition-colors duration-500">
                           <item.icon className="size-5 text-white" />
                        </div>
                        <span className="text-white font-black uppercase tracking-[0.2em] text-[10px]">{item.title}</span>
                     </div>
                   ))}
                </div>
             </div>
             
             <div className="lg:w-1/2 relative">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-4 rounded-[4rem] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-1000">
                   <img 
                      src="/assets/kehidupan-komunitas.png" 
                      alt="Student Experience" 
                      className="w-full h-full object-cover rounded-[3.5rem] grayscale hover:grayscale-0 transition-all duration-700"
                   />
                </div>
                <div className="absolute -bottom-10 -left-10 bg-[#E31D1A] text-white p-10 rounded-[2.5rem] shadow-2xl hidden lg:block animate-bounce-slow">
                   <p className="text-3xl font-black mb-1">500+</p>
                   <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Mahasiswa Aktif</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/40 border-2 border-white p-16 md:p-24 rounded-[4rem] shadow-[0_50px_100px_rgba(9,44,116,0.05)] relative overflow-hidden group">
               <div className="absolute top-0 right-0 size-64 bg-[#F2ECF8] blur-[80px] rounded-full group-hover:scale-110 transition-transform" />
               <h3 className="text-4xl md:text-5xl font-black text-[#092C74] mb-8 tracking-tighter">Mari Menjadi Bagian <br /> dari Keluarga STTB</h3>
               <p className="text-lg text-gray-500 font-medium mb-12 max-w-2xl mx-auto italic">Rasakan pengalaman belajar yang integratif dalam lingkungan yang saling mendukung untuk panggilan pelayanan Anda.</p>
               <button className="h-20 px-16 bg-[#092C74] hover:bg-[#E31D1A] text-white font-black text-xl rounded-[1.5rem] shadow-2xl transition-all duration-500 hover:-translate-y-2 uppercase tracking-widest relative z-10 flex items-center mx-auto">
                  Jelajahi Kampus Virtual <ChevronRight className="ml-3 size-6" />
               </button>
            </div>
        </div>
      </section>
    </div>
  );
}
