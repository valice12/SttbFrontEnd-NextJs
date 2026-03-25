'use client';

import { motion } from 'motion/react';
import { Building, Users, Heart } from 'lucide-react';
const fasilitasPerpustakaan = "/assets/fasilitas-1-2-480x480.png";
const fasilitasAsrama = "/assets/fasilitas-4-480x480.png";
const fasilitasKelas = "/assets/fasilitas-8-480x480.png";
const fasilitasKapel = "/assets/fasilitas-2.png";
const fasilitasKantin = "/assets/fasilitas-19-480x480.png";
const fasilitasOlahraga = "/assets/fasilitas-16.png";
const bgHeader = "/assets/kehidupan-komunitas.png";
const bgPattern = "/assets/background.webp";

const facilities = [
  { name: 'Perpustakaan', img: fasilitasPerpustakaan },
  { name: 'Asrama', img: fasilitasAsrama },
  { name: 'Ruang Kelas', img: fasilitasKelas },
  { name: 'Kapel', img: fasilitasKapel },
  { name: 'Kantin', img: fasilitasKantin },
  { name: 'Lapangan Olahraga', img: fasilitasOlahraga },
];

export function KehidupanKampus() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgPattern})` }}
    >
      <section className="relative text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={bgHeader} alt="Kehidupan Kampus" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#092C74]/80 mix-blend-multiply" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Kehidupan Kampus</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Fasilitas dan kehidupan mahasiswa di STTB
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 lg:mb-24">
            <Building className="size-16 text-[#092C74] mx-auto mb-6" />
            <h2 className="text-4xl lg:text-5xl font-black text-[#092C74]">Fasilitas Kampus</h2>
            <div className="w-24 h-1.5 bg-[#E31D1A] mx-auto rounded-full mt-4" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
            {facilities.map((facility, i) => (
              <motion.div 
                key={i} 
                className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 group hover:shadow-2xl transition-all duration-500 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="aspect-square w-full mb-8 overflow-hidden rounded-3xl border-4 border-gray-50 shadow-inner group-hover:scale-[1.02] transition-transform duration-500">
                  <img src={facility.img} alt={facility.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <h3 className="font-black text-2xl text-[#092C74] transition-colors group-hover:text-[#E31D1A]">{facility.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


