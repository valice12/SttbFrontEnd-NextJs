'use client';

import { motion } from 'motion/react';

export function FaithTab() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-8 rounded-sm border-4 border-[#092C74] shadow-sm"
    >
      <h2 className="text-3xl font-bold mb-12 text-center text-[#092C74] uppercase tracking-tighter">Pengakuan Iman</h2>
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div className="space-y-8">
          <div className="relative pl-6 border-l-2 border-[#E31D1A]">
            <h3 className="text-lg font-bold text-[#E31D1A] mb-3 uppercase tracking-wider">1. Alkitab</h3>
            <p className="text-[13px] text-gray-700 leading-relaxed text-justify">
              Bahwa Alkitab secara keseluruhan, Perjanjian Lama dan Perjanjian Baru, adalah firman Allah yang diwahyukan dan diilhamkan tanpa kesalahan. Oleh karena itu, Alkitab adalah sumber otoritas tertinggi bagi iman dan kehidupan orang percaya di segala abad dan tempat.
            </p>
          </div>
          <div className="relative pl-6 border-l-2 border-[#E31D1A]">
            <h3 className="text-lg font-bold text-[#E31D1A] mb-3 uppercase tracking-wider">3. Manusia & Dosa</h3>
            <p className="text-[13px] text-gray-700 leading-relaxed text-justify">
              Bahwa manusia, laki-laki dan perempuan, telah diciptakan oleh Allah menurut gambar-Nya, namun telah jatuh ke dalam dosa, terpisah dari Allah, dan kehilangan kemampuan untuk hidup sesuai dengan citranya sebagai ciptaan Allah.
            </p>
          </div>
          <div className="relative pl-6 border-l-2 border-[#E31D1A]">
            <h3 className="text-lg font-bold text-[#E31D1A] mb-3 uppercase tracking-wider">5. Roh Kudus</h3>
            <p className="text-[13px] text-gray-700 leading-relaxed text-justify">
              Bahwa Roh Kudus adalah Allah yang hidup, yang menginsafkan manusia akan dosa, kebenaran, dan penghakiman. Ia melahirbarukan orang berdosa yang percaya, mendiami, menguduskan, dan memberi kuasa serta karunia-karunia.
            </p>
          </div>
          <div className="relative pl-6 border-l-2 border-[#E31D1A]">
            <h3 className="text-lg font-bold text-[#E31D1A] mb-3 uppercase tracking-wider">7. Gereja</h3>
            <p className="text-[13px] text-gray-700 leading-relaxed text-justify">
              Bahwa Gereja selaku garam dan terang dunia adalah himpunan semua orang percaya dari segala abad dan bangsa. Ia adalah tubuh Kristus yang kudus dan Am, dengan Kristus sebagai Kepalanya.
            </p>
          </div>
        </div>
        <div className="space-y-8">
          <div className="relative pl-6 border-l-2 border-[#092C74]">
            <h3 className="text-lg font-bold text-[#092C74] mb-3 uppercase tracking-wider">2. Allah Tritunggal</h3>
            <p className="text-[13px] text-gray-700 leading-relaxed text-justify">
              Bahwa Allah adalah Esa dan kekal, Mahakudus, dan penuh rahmat. Ia adalah pencipta, penguasa, dan pemelihara alam semesta, Tritunggal sebagai Bapa, Anak, dan Roh Kudus.
            </p>
          </div>
          <div className="relative pl-6 border-l-2 border-[#092C74]">
            <h3 className="text-lg font-bold text-[#092C74] mb-3 uppercase tracking-wider">4. Yesus Kristus</h3>
            <p className="text-[13px] text-gray-700 leading-relaxed text-justify">
              Bahwa Yesus Kristus adalah Anak Tunggal Allah, Allah sejati dan Manusia sejati, penebus dan satu-satunya jalan keselamatan bagi seluruh umat manusia.
            </p>
          </div>
          <div className="relative pl-6 border-l-2 border-[#092C74]">
            <h3 className="text-lg font-bold text-[#092C74] mb-3 uppercase tracking-wider">6. Keselamatan</h3>
            <p className="text-[13px] text-gray-700 leading-relaxed text-justify">
              Bahwa manusia hanya dapat diselamatkan oleh kasih karunia melalui penebusan oleh Tuhan Yesus Kristus dan dibenarkan melalui iman, tanpa jasa atau usaha dari pihak manusia.
            </p>
          </div>
          <div className="relative pl-6 border-l-2 border-[#092C74]">
            <h3 className="text-lg font-bold text-[#092C74] mb-3 uppercase tracking-wider">8. Akhir Zaman</h3>
            <p className="text-[13px] text-gray-700 leading-relaxed text-justify">
              Bahwa kepastian kedatangan kembali Yesus Kristus secara nyata dan pribadi akan terjadi pada akhir zaman untuk menjemput umat-Nya dan menghakimi seluruh umat manusia.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center border-t border-gray-100 pt-8">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-12">
          <div className="font-bold text-[#092C74] text-xl leading-snug tracking-tighter">
            <p>DOMINO</p>
            <p>OPTIMO</p>
            <p>MAXIMO</p>
          </div>
          <div className="hidden md:block w-[1px] h-16 bg-gray-200"></div>
          <div className="font-bold text-[#E31D1A] text-xl leading-snug tracking-tighter italic">
            <p>To the Lord</p>
            <p>The Best</p>
            <p>The Greatest</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
