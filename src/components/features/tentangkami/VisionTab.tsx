import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Target, Info, Music, X, Maximize2 } from 'lucide-react';

interface VisionTabProps {
  images: {
    imgApi: string;
    imgAlkitab: string;
    imgSalib: string;
    imgTongkat: string;
    logoSttb: string;
    marsSTTB: string;
  };
}

export function VisionTab({ images }: VisionTabProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="m-0 focus-visible:outline-none space-y-6">
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Visi Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-[#092C74] to-[#2158AE] text-white p-8 md:p-12 rounded-2xl flex flex-col h-full"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="size-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
              <Eye className="size-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black">Visi</h2>
          </div>
          <p className="text-xl md:text-2xl font-bold leading-relaxed mb-8 text-white/90">
            Menjadi institusi pendidikan teologi yang mempersiapkan pastor-scholar yang transformatif dan memberdayakan seluruh umat Allah untuk menghadirkan Injil seutuhnya di tengah konteks masyarakat urban.
          </p>

          <div className="space-y-4 mt-auto">
            {[
              { title: "Pastor-Scholar", desc: "Memiliki jiwa gembala (kepemimpinan yg melayani di gereja, dunia pendidikan, maupun profesi lain) dan sekaligus pembelajar (semangat untuk terus belajar, daya nalar kritis seorang intelektual Kristen, dan kemampuan berkontribusi terhadap dunia ilmu pengetahuan dari perspektif Kristen)." },
              { title: "Berita Injil yang utuh", desc: "Kuasa Injil yg mampu mentransformasi seluruh aspek hidup manusia dan seluruh ciptaan yg sudah jatuh dalam dosa (total depravity), yg kesempurnaannya baru akan terjadi setelah kedatangan Kristus yang kedua, namun cicipan awalnya sudah bisa dirasakan hari ini." },
              { title: "Seluruh umat Allah", desc: "Kuasa penebusan Kristus dinyatakan melalui hidup setiap pengikut Kristus, di tengah keluarga, gereja, dan masyarakat." },
              { title: "Masyarakat urban", desc: "Mahasiswa STTB dipersiapkan dengan fokus melayani masyarakat di perkotaan, tanpa menutup kemungkinan tuntunan lain yang Tuhan berikan kepada mereka di tempat lain." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/10 p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors">
                <h3 className="text-lg font-black text-[#73B2F5] mb-2">{item.title}</h3>
                <p className="text-sm md:text-base text-gray-100 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Misi Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-[#E31D1A] to-[#BA1126] text-white p-8 md:p-12 rounded-2xl flex flex-col h-full"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="size-16 bg-black/10 rounded-2xl flex items-center justify-center border border-white/20">
              <Target className="size-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black">Misi</h2>
          </div>
          <ul className="space-y-6">
            {[
              { num: "1", text: <>Mempersiapkan <span className="font-black text-[#FFB3B3]">pastor-scholar</span> yang transfomatif untuk melayani dalam konteks urban.</> },
              { num: "2", text: <>Memberdayakan <span className="font-black text-[#FFB3B3]">seluruh umat Allah</span> untuk menghadirkan Injil seutuhnya di tengah konteks masyarakat urban melalui penelitian dan pendidikan non-formal.</> },
              { num: "3", text: <>Mengembangkan <span className="font-black text-[#FFB3B3]">tim dosen, struktur organisasi dan keuangan, serta kemitraan</span> untuk mendukung pencapaian visi STTB.</> }
            ].map((misi, i) => (
              <li key={i} className="flex items-start gap-6 bg-white/10 p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors">
                <span className="text-4xl font-black text-[#FFB3B3] leading-none">{misi.num}</span>
                <span className="text-lg md:text-xl font-medium leading-relaxed">{misi.text}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Identitas Section */}
        <div className="mt-20 space-y-12 lg:col-span-2">
          {/* Arti Logo Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white p-10 md:p-16 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-100/50"
          >
            <div className="flex items-center gap-6 mb-12">
              <div className="size-16 bg-[#E31D1A]/5 rounded-2xl flex items-center justify-center">
                <Info className="size-10 text-[#E31D1A]" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#092C74] tracking-tight">Arti Logo STTB</h2>
            </div>

            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { img: images.imgApi, title: "Api", desc: "Melambangkan penyertaan dan pemenuhan dari Allah Roh Kudus yang menjadi sumber hikmat, kuasa, dan kasih serta merupakan syarat mutlak bagi pelayan Tuhan." },
                  { img: images.imgAlkitab, title: "Alkitab", desc: "Adalah satu-satunya sumber pengetahuan yang benar tentang Allah dan dasar bagi panggilan serta pelayanan (Sola Scriptura)." },
                  { img: images.imgSalib, title: "Salib & Mahkota", desc: "Melambangkan panggilan untuk berpegang kepada kebenaran dan merajakan Kristus." },
                  { img: images.imgTongkat, title: "Tongkat Gembala", desc: "Melambangkan panggilan Tuhan untuk menggembalakan umat-Nya." }
                ].map((logo, i) => (
                  <div key={i} className="bg-[#F8F9FA] p-8 rounded-2xl border border-gray-100 hover:border-[#092C74] transition-all group hover:bg-white hover:shadow-xl">
                    <img src={logo.img} alt={logo.title} className="size-16 mb-4 group-hover:scale-110 transition-transform" />
                    <h4 className="font-black text-[#E31D1A] mb-3 uppercase text-sm tracking-[0.2em]">{logo.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">{logo.desc}</p>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-4 text-center">
                <div className="p-10 bg-gray-50 rounded-[3rem] inline-block border-2 border-dashed border-gray-200">
                  <img src={images.logoSttb} alt="Logo STTB" className="w-56 h-auto mx-auto mb-8 drop-shadow-lg" />
                  <h3 className="font-black text-[#092C74] mb-4 uppercase tracking-[0.3em] text-sm">Logo STTB</h3>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-[240px] mx-auto font-medium">
                    Menggambarkan pola pendidikan teologi yang akan memperlengkapi para mahasiswa untuk menjadi hamba Allah yang baik, setia, dan penuh hikmat.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mars STTB Section - Enhanced and Enlarged */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#092C74] via-[#0D3B97] to-[#092C74] p-8 md:p-24 rounded-[3.5rem] text-white overflow-hidden relative shadow-2xl border border-white/5"
          >
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 pointer-events-none">
              <Music className="size-96 text-white" />
            </div>
            <div className="absolute -bottom-24 -left-24 size-96 bg-[#E31D1A]/10 blur-[120px] rounded-full" />

            <div className="relative z-10 w-full">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-20">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="size-16 bg-[#E31D1A] rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/20">
                      <Music className="size-8 text-white" />
                    </div>
                    <span className="text-white/60 font-black tracking-[0.3em] text-xs uppercase">Official Anthem</span>
                  </div>
                  <h2 className="text-6xl md:text-[7rem] font-black tracking-tighter leading-[0.9]">
                    Mars STT<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6AACE6] via-[#A855F7] to-[#E31D1A]">Bandung</span>
                  </h2>
                </div>
                <div className="text-right hidden md:block">
                  <p className="text-white/40 font-black text-sm uppercase tracking-widest vertical-text transform rotate-180 [writing-mode:vertical-lr]">
                    Domino Optimo Maximo
                  </p>
                </div>
              </div>

              <div 
                className="bg-white p-4 md:p-12 rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.6)] transform -rotate-1 hover:rotate-0 transition-all duration-700 cursor-zoom-in group relative"
                onClick={() => setIsFullscreen(true)}
              >
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={images.marsSTTB}
                    alt="Partitur Mars STTB"
                    className="w-full h-auto rounded-lg shadow-inner group-hover:scale-[1.02] transition-transform duration-700"
                    draggable="false"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                    <div className="bg-white/90 p-4 rounded-full shadow-2xl text-[#092C74] scale-75 group-hover:scale-100 transition-all">
                      <Maximize2 className="size-8" />
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-400 text-xs uppercase font-black tracking-[0.3em]">
                  <span className="flex items-center gap-3">
                    <div className="size-2 bg-[#E31D1A] rounded-full animate-pulse" />
                    © Sekolah Tinggi Teologi Bandung
                  </span>
                  <div className="flex items-center gap-8">
                    <span className="text-[#E31D1A]">Hymn of Purpose</span>
                    <span className="text-[#092C74] opacity-50">Est. 1992</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-20 text-center">
                <p className="text-white/50 text-lg md:text-xl font-medium italic max-w-3xl mx-auto leading-relaxed">
                  "Menyanyikan Mars STTB bukan sekadar rangkaian nada, melainkan komitmen hati untuk melayani sang Raja di atas segala raja di tengah konteks masyarakat urban."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Fullscreen Viewer Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setIsFullscreen(false)}
              className="absolute top-8 right-8 z-[110] size-16 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 transition-all active:scale-90"
            >
              <X className="size-8" />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-6xl max-h-screen overflow-y-auto no-scrollbar rounded-3xl bg-white shadow-2xl p-4 md:p-8"
            >
              <img
                src={images.marsSTTB}
                alt="Fullscreen Mars STTB"
                className="w-full h-auto rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
