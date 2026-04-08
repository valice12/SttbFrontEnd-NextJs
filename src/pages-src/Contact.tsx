'use client';

import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const imgMapsintegration = "/assets/maps.png";
const imgBlueprintBackground = "/assets/background-reversed.webp";
const bgHeader = "/assets/sttb-3-BG.png";

export function Contact() {
  return (
    <div className="min-h-screen bg-white">
      {/* Premium Hero Section - Contact */}
      <section className="relative h-[550px] md:h-[650px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={bgHeader} alt="Kontak" className="w-full h-full object-cover scale-110" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E293B]/95 via-[#0F172A]/45 to-transparent z-10" />
          
          <div className="absolute top-1/4 -right-1/4 size-[450px] bg-[#E31D1A]/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-0 -left-1/4 size-[400px] bg-[#092C74]/30 blur-[100px] rounded-full" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center z-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="backdrop-blur-md bg-white/5 border border-white/10 p-10 md:p-14 rounded-[40px] shadow-2xl relative overflow-hidden group"
            >
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E31D1A] rounded-full text-white text-xs font-black uppercase tracking-widest mb-8 shadow-lg shadow-red-500/30"
                >
                   <MessageSquare className="size-3" /> Get In Touch
                </motion.div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.95] drop-shadow-2xl">
                  Hubungi <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6AACE6] via-[#A855F7] to-[#E31D1A]">Kami</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl leading-relaxed">
                  Kami siap mendukung perjalanan akademis dan spiritual Anda. Silakan hubungi tim kami untuk informasi lebih lanjut.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bagian Kontak & Form dengan Background Blueprint */}
      <section
        className="py-32 relative overflow-hidden"
        style={{
          backgroundImage: `url(${imgBlueprintBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Info - Modernized Cards */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="mb-12">
                <h2 className="text-4xl md:text-6xl font-black text-[#092C74] mb-6 tracking-tighter">Informasi <span className="text-[#E31D1A]">Kontak</span></h2>
                <div className="w-20 h-2 bg-gradient-to-r from-[#092C74] to-[#E31D1A] rounded-full" />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: MapPin, title: "Alamat", desc: "Jl. Teologia No. 123\nJakarta Selatan 12345", color: "from-[#1C64E8] to-blue-700" },
                  { icon: Phone, title: "Telepon", desc: "+62 21 1234 5678\nWA: +62 812 3456 7890", color: "from-[#E31D1A] to-red-800" },
                  { icon: Mail, title: "Email", desc: "info@stt-jakarta.ac.id\nadmisi@stt-jakarta.ac.id", color: "from-[#9F195D] to-purple-800" },
                  { icon: Clock, title: "Jam Operasional", desc: "Sen-Jum: 08:00 - 17:00\nSab: 08:00 - 12:00", color: "from-[#092C74] to-[#1E293B]" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -5 }}
                    className="bg-white/70 backdrop-blur-md p-8 rounded-[2rem] border border-white shadow-[0_20px_40px_rgba(9,44,116,0.05)] group"
                  >
                    <div className={`size-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:rotate-12 transition-transform`}>
                      <item.icon className="size-6 text-white" />
                    </div>
                    <h3 className="font-black text-xl text-[#092C74] mb-3 tracking-tight">{item.title}</h3>
                    <p className="text-gray-500 font-medium whitespace-pre-line leading-relaxed italic">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              <div className="p-10 bg-[#092C74] rounded-[2.5rem] text-white relative overflow-hidden mt-8 shadow-2xl">
                 <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Globe className="size-48" />
                 </div>
                 <h4 className="text-2xl font-black mb-4 relative z-10">Kunjungi Kampus</h4>
                 <p className="text-white/70 relative z-10 leading-relaxed font-medium">
                   Alami atmosfer akademis yang transformatif secara langsung. Kami terbuka bagi calon mahasiswa untuk konsultasi mendalam.
                 </p>
              </div>
            </motion.div>

            {/* Contact Form - Premium Design */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-[#092C74] p-10 md:p-14 rounded-[4rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 size-[500px] bg-white/5 blur-[100px] rounded-full -mr-32 -mt-32" />
                
                <h2 className="text-3xl md:text-5xl font-black text-white mb-10 tracking-tighter relative z-10">Kirim <span className="text-[#6AACE6]">Pesan</span></h2>
                <form className="space-y-6 relative z-10">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black text-white/50 uppercase tracking-widest mb-3 ml-2">Nama Lengkap</label>
                      <Input placeholder="Nama Anda" className="h-16 bg-white/5 border-white/10 text-white rounded-2xl focus:bg-white/10 transition-all placeholder:text-white/20" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-white/50 uppercase tracking-widest mb-3 ml-2">Email</label>
                      <Input type="email" placeholder="email@example.com" className="h-16 bg-white/5 border-white/10 text-white rounded-2xl focus:bg-white/10 transition-all placeholder:text-white/20" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-white/50 uppercase tracking-widest mb-3 ml-2">Topik Pesan</label>
                    <Input placeholder="Contoh: Pertanyaan Admisi" className="h-16 bg-white/5 border-white/10 text-white rounded-2xl focus:bg-white/10 transition-all placeholder:text-white/20" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-white/50 uppercase tracking-widest mb-3 ml-2">Pesan Anda</label>
                    <Textarea
                      placeholder="Tulis pesan Anda secara detail..."
                      className="min-h-[180px] bg-white/5 border-white/10 text-white rounded-3xl focus:bg-white/10 transition-all placeholder:text-white/20 p-5"
                    />
                  </div>
                  <Button className="w-full h-20 bg-white hover:bg-[#E31D1A] text-[#092C74] hover:text-white font-black text-xl rounded-2xl shadow-2xl transition-all duration-500 uppercase tracking-widest group">
                    KIRIM PESAN <Send className="ml-3 size-5 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section - Full Width Integrated */}
      <section className="pb-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="group relative rounded-[4rem] overflow-hidden shadow-2xl h-[500px] border-8 border-white">
            <div className="absolute inset-0 bg-[#092C74]/20 mix-blend-overlay z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-700" />
            <img
              src={imgMapsintegration}
              alt="Lokasi Peta STT Jakarta"
              className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[2s]"
            />
            
            <div className="absolute bottom-10 left-10 z-20">
               <div className="bg-white p-6 rounded-[2rem] shadow-2xl flex items-center gap-4 border border-gray-100">
                  <div className="size-12 bg-[#092C74] rounded-xl flex items-center justify-center">
                     <MapPin className="size-6 text-white" />
                  </div>
                  <div>
                     <p className="font-bold text-[#092C74]">Temukan Kami di Google Maps</p>
                     <p className="text-xs text-gray-400 font-black uppercase tracking-widest">Petunjuk Arah & Lokasi</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
