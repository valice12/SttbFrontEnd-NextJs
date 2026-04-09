'use client';

import { motion } from 'motion/react';
import { Eye, Target } from 'lucide-react';

export function VisionMissionSection() {
  return (
    <section className="py-12 lg:py-20 bg-[#FBFAFF] relative overflow-hidden">
      {/* Abstract Purple Background Element */}
      <div className="absolute top-0 right-0 w-[40%] h-full bg-[#F5F3FB]/50 -skew-x-12 transform origin-top translate-x-1/4" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Vision - 61.8% */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-[61.8%] bg-white p-8 lg:p-16 rounded-[2.5rem] lg:rounded-[3rem] shadow-xl border border-gray-100 group hover:shadow-2xl transition-all duration-500"
          >
            <div className="flex items-center gap-4 lg:gap-6 mb-6 lg:mb-10">
              <div className="size-14 lg:size-20 bg-gradient-to-br from-[#092C74] to-[#4B0082] rounded-2xl lg:rounded-3xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                <Eye className="size-7 lg:size-10 text-white" />
              </div>
              <div>
                 <span className="text-[#E31D1A] font-black tracking-widest text-[10px] lg:text-sm uppercase mb-1 lg:mb-2 block">Our Vision</span>
                 <h2 className="text-2xl lg:text-5xl font-black text-[#092C74]">Visi STT Bandung</h2>
              </div>
            </div>
            <p className="text-base lg:text-3xl text-gray-700 leading-[1.6] font-medium italic">
              "Menjadi lembaga pendidikan teologi terdepan di Asia Tenggara yang menghasilkan lulusan berkarakter Kristus, kompeten secara akademis, dan berdampak bagi transformasi gereja dan masyarakat."
            </p>
          </motion.div>

          {/* Mission - 38.2% */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-[38.2%] bg-gradient-to-br from-[#E31D1A] to-[#8B008B] p-8 lg:p-12 rounded-[2.5rem] lg:rounded-[3rem] shadow-xl text-white relative overflow-hidden group"
          >
             {/* Decorative Circle */}
             <div className="absolute -bottom-10 -right-10 size-48 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
             
             <div className="flex items-center gap-4 mb-6 lg:mb-8">
                <div className="size-12 lg:size-14 bg-white/20 rounded-xl lg:rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <Target className="size-6 lg:size-7 text-white" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-black">Misi Kami</h2>
             </div>
             
             <ul className="space-y-6">
               {[
                 "Pendidikan teologi berkualitas & alkitabiah",
                 "Karakter Kristen yang matang",
                 "Penelitian teologi kontekstual"
               ].map((item, id) => (
                 <li key={id} className="flex items-start gap-4">
                   <span className="size-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-1 font-bold text-xs">{id + 1}</span>
                   <span className="text-lg font-bold leading-tight">{item}</span>
                 </li>
               ))}
             </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
