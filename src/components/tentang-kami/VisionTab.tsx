'use client';

import { motion } from 'motion/react';
import { Eye, Target, Info, Music } from 'lucide-react';

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
  return (
    <div className="m-0 focus-visible:outline-none space-y-6">
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Visi Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-[#092C74] to-[#2158AE] text-white p-8 rounded-2xl flex flex-col h-full"
        >
          <div className="flex items-center gap-4 mb-6">
            <Eye className="size-12 shrink-0" />
            <h2 className="text-3xl font-bold">Visi</h2>
          </div>
          <p className="text-lg font-medium leading-relaxed mb-6">
            Menjadi institusi pendidikan teologi yang mempersiapkan pastor-scholar yang transformatif dan memberdayakan seluruh umat Allah untuk menghadirkan Injil seutuhnya di tengah konteks masyarakat urban.
          </p>

          <div className="space-y-4 mt-auto">
            <div className="bg-white/10 p-5 rounded-xl border border-white/20">
              <h3 className="font-bold text-[#73B2F5] mb-2">Pastor-Scholar</h3>
              <p className="text-sm text-gray-100 leading-relaxed">
                Memiliki jiwa gembala (kepemimpinan yg melayani di gereja, dunia pendidikan, maupun profesi lain) dan sekaligus pembelajar (semangat untuk terus belajar, daya nalar kritis seorang intelektual Kristen, dan kemampuan berkontribusi terhadap dunia ilmu pengetahuan dari perspektif Kristen).
              </p>
            </div>
            <div className="bg-white/10 p-5 rounded-xl border border-white/20">
              <h3 className="font-bold text-[#73B2F5] mb-2">Berita Injil yang utuh</h3>
              <p className="text-sm text-gray-100 leading-relaxed">
                Kuasa Injil yg mampu mentransformasi seluruh aspek hidup manusia dan seluruh ciptaan yg sudah jatuh dalam dosa (total depravity), yg kesempurnaannya baru akan terjadi setelah kedatangan Kristus yang kedua, namun cicipan awalnya sudah bisa dirasakan hari ini.
              </p>
            </div>
            <div className="bg-white/10 p-5 rounded-xl border border-white/20">
              <h3 className="font-bold text-[#73B2F5] mb-2">Seluruh umat Allah</h3>
              <p className="text-sm text-gray-100 leading-relaxed">
                Kuasa penebusan Kristus dinyatakan melalui hidup setiap pengikut Kristus, di tengah keluarga, gereja, dan masyarakat.
              </p>
            </div>
            <div className="bg-white/10 p-5 rounded-xl border border-white/20">
              <h3 className="font-bold text-[#73B2F5] mb-2">Masyarakat urban</h3>
              <p className="text-sm text-gray-100 leading-relaxed">
                Mahasiswa STTB dipersiapkan dengan fokus melayani masyarakat di perkotaan, tanpa menutup kemungkinan tuntunan lain yang Tuhan berikan kepada mereka di tempat lain.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Misi Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-[#E31D1A] to-[#BA1126] text-white p-8 rounded-2xl flex flex-col h-full"
        >
          <div className="flex items-center gap-4 mb-6">
            <Target className="size-12 shrink-0" />
            <h2 className="text-3xl font-bold">Misi</h2>
          </div>
          <ul className="space-y-6 text-lg">
            <li className="flex items-start gap-4 bg-white/10 p-5 rounded-xl border border-white/20">
              <span className="text-3xl font-bold text-[#FFB3B3] leading-none mt-1">1</span>
              <span className="leading-relaxed">Mempersiapkan <span className="font-semibold text-[#FFB3B3]">pastor-scholar</span> yang transfomatif untuk melayani dalam konteks urban.</span>
            </li>
            <li className="flex items-start gap-4 bg-white/10 p-5 rounded-xl border border-white/20">
              <span className="text-3xl font-bold text-[#FFB3B3] leading-none mt-1">2</span>
              <span className="leading-relaxed">Memberdayakan <span className="font-semibold text-[#FFB3B3]">seluruh umat Allah</span> untuk menghadirkan Injil seutuhnya di tengah konteks masyarakat urban melalui penelitian dan pendidikan non-formal.</span>
            </li>
            <li className="flex items-start gap-4 bg-white/10 p-5 rounded-xl border border-white/20">
              <span className="text-3xl font-bold text-[#FFB3B3] leading-none mt-1">3</span>
              <span className="leading-relaxed">Mengembangkan <span className="font-semibold text-[#FFB3B3]">tim dosen, struktur organisasi dan keuangan, serta kemitraan</span> untuk mendukung pencapaian visi STTB.</span>
            </li>
          </ul>
        </motion.div>

        {/* Identitas Section */}
        <div className="mt-20 space-y-12 lg:col-span-2">
          {/* Arti Logo Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-sm border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-8">
              <Info className="size-10 text-[#E31D1A]" />
              <h2 className="text-3xl font-bold text-[#092C74]">Arti Logo STTB</h2>
            </div>

            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8 grid grid-cols-2 gap-6">
                <div className="bg-[#F8F9FA] p-6 rounded-xl border border-gray-100 hover:border-[#1C64E8] transition-all group">
                  <img src={images.imgApi} alt="Api" className="size-16 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold text-[#E31D1A] mb-2 uppercase text-sm tracking-widest">Api</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">Melambangkan penyertaan dan pemenuhan dari Allah Roh Kudus yang menjadi sumber hikmat, kuasa, dan kasih serta merupakan syarat mutlak bagi pelayan Tuhan.</p>
                </div>
                <div className="bg-[#F8F9FA] p-6 rounded-xl border border-gray-100 hover:border-[#1C64E8] transition-all group">
                  <img src={images.imgAlkitab} alt="Alkitab" className="size-16 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold text-[#E31D1A] mb-2 uppercase text-sm tracking-widest">Alkitab</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">Adalah satu-satunya sumber pengetahuan yang benar tentang Allah dan dasar bagi panggilan serta pelayanan (Sola Scriptura).</p>
                </div>
                <div className="bg-[#F8F9FA] p-6 rounded-xl border border-gray-100 hover:border-[#1C64E8] transition-all group">
                  <img src={images.imgSalib} alt="Salib & Mahkota" className="size-16 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold text-[#E31D1A] mb-2 uppercase text-sm tracking-widest">Salib & Mahkota</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">Melambangkan panggilan untuk berpegang kepada kebenaran dan merajakan Kristus.</p>
                </div>
                <div className="bg-[#F8F9FA] p-6 rounded-xl border border-gray-100 hover:border-[#1C64E8] transition-all group">
                  <img src={images.imgTongkat} alt="Tongkat Gembala" className="size-16 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold text-[#E31D1A] mb-2 uppercase text-sm tracking-widest">Tongkat Gembala</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">Melambangkan panggilan Tuhan untuk menggembalakan umat-Nya.</p>
                </div>
              </div>

              <div className="lg:col-span-4 text-center">
                <div className="p-8 bg-gray-50 rounded-2xl inline-block border-2 border-dashed border-gray-200">
                  <img src={images.logoSttb} alt="Logo STTB" className="w-48 h-auto mx-auto mb-6" />
                  <h3 className="font-bold text-[#092C74] mb-2 uppercase tracking-widest">Logo STTB</h3>
                  <p className="text-xs text-gray-500 leading-relaxed max-w-[200px] mx-auto">
                    Menggambarkan pola pendidikan teologi yang akan memperlengkapi para mahasiswa untuk menjadi hamba Allah yang baik, setia, dan penuh hikmat.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mars STTB Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-[#092C74] p-10 rounded-sm text-white overflow-hidden relative shadow-xl"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Music className="size-48 text-white" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <Music className="size-10 text-[#E31D1A]" />
                <h2 className="text-3xl font-bold">Mars STT Bandung</h2>
              </div>

              <div className="bg-white p-6 rounded-sm shadow-2xl">
                <img
                  src={images.marsSTTB}
                  alt="Partitur Mars STTB"
                  className="w-full h-auto rounded-sm shadow-inner"
                  draggable="false"
                />
                <div className="mt-4 flex justify-between items-center text-gray-400 text-[10px] uppercase font-bold tracking-widest">
                  <span>© Sekolah Tinggi Teologi Bandung</span>
                  <span className="text-[#E31D1A]">Domino Optimo Maximo</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
