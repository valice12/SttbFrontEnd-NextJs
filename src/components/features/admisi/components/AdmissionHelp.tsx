'use client';

import { motion } from 'motion/react';
import { Phone, Mail, UserCheck, BookOpen } from 'lucide-react';

export function AdmissionHelp() {
  const supportItems = [
    { label: 'Admisi & Marketing', sub: 'Pendaftaran & Seminar', contact: '+62 815-7336-0009', icon: Phone, color: 'bg-green-500' },
    { label: 'Akademik & Beasiswa', sub: 'Hubungi WA untuk info', contact: '+62 815-7127-228', icon: UserCheck, color: 'bg-blue-500' },
    { label: 'Layanan Keuangan', sub: 'keuangan@sttb.ac.id', contact: 'Kirim Bukti Transfer', icon: Mail, color: 'bg-purple-500' },
    { label: 'Perpustakaan', sub: 'Jurnal Stulos & Buku', contact: '+62 857-9153-8527', icon: BookOpen, color: 'bg-orange-500' },
  ];

  return (
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {supportItems.map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl hover:bg-white/20 transition-all group">
                <div className={`size-12 ${item.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform mx-auto`}>
                  <item.icon className="size-6 text-white" />
                </div>
                <h4 className="text-white font-bold mb-1 text-sm md:text-base">{item.label}</h4>
                <p className="text-white/60 text-[10px] md:text-xs mb-3">{item.sub}</p>
                <p className="text-[#6AACE6] font-black text-xs md:text-sm tabular-nums">{item.contact}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
