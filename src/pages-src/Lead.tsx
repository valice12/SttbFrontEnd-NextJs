'use client';

import { motion } from 'motion/react';
import { 
  Users, 
  Target, 
  Heart, 
  BookOpen, 
  GraduationCap, 
  Lightbulb, 
  CheckCircle2, 
  ChevronRight,
  Globe,
  Cross,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
const bgHeader = "/assets/sttb-3-BG.png";
const bgPattern = "/assets/background.webp";

export function Lead() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const services = [
    {
      title: "Layanan Learning (Pembelajaran)",
      icon: <BookOpen className="size-8" />,
      description: "Akses bagi jemaat awam untuk belajar di STTB tanpa prodi formal.",
      items: [
        { name: "Audit (Sit In)", desc: "Mengikuti kelas formal sebagai pendengar." },
        { name: "Public Lecture", desc: "Kuliah umum terbuka untuk publik." },
        { name: "Public Seminar", desc: "Seminar topik esensial gereja & masyarakat." }
      ],
      color: "from-[#1C64E8] to-blue-400"
    },
    {
      title: "Layanan Equipping (Pemerlengkapan)",
      icon: <GraduationCap className="size-8" />,
      description: "Program pelatihan terstruktur dalam berbagai format praktis.",
      items: [
        { name: "Certificate Course", desc: "Kursus bersertifikat resmi." },
        { name: "Training Course", desc: "Pelatihan praktik langsung." },
        { name: "Crash Course", desc: "Kursus kilat / klinik praktis." }
      ],
      color: "from-[#E31D1A] to-red-400"
    },
    {
      title: "Layanan Development (Pengembangan)",
      icon: <Lightbulb className="size-8" />,
      description: "Riset dan pengembangan bahan ajar esensial bagi gereja.",
      items: [
        { name: "Penelitian Bahan", desc: "Menciptakan kurikulum baru." },
        { name: "Produksi Resources", desc: "Sarana resources esensial." },
        { name: "Distribusi", desc: "Penyaluran bahan ke gereja lokal." }
      ],
      color: "from-amber-500 to-orange-400"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F3FB] selection:bg-[#092C74] selection:text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden shadow-lg">
        <div className="absolute inset-0 z-0">
          <img src={bgHeader} alt="LEAD Center" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#061B46]/95 via-[#061B46]/70 to-transparent" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-[#6AACE6] uppercase bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              Transformative Education
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              L.E.A.D. Center
            </h1>
            <p className="text-2xl md:text-3xl text-[#6AACE6] font-medium mb-4">
              Learning, Equipping, And Development
            </p>
            <p className="text-lg text-white/80 max-w-xl font-light leading-relaxed">
              Pusat pendidikan dan pelatihan nonformal di bawah naungan Sekolah Tinggi Teologi Bandung.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Misi Kami: <br />
              <span className="text-[#092C74]">Membangun Tubuh Kristus</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              LEAD Center hadir untuk melayani tubuh Kristus melalui pendidikan berkelanjutan yang bisa diakses oleh siapa saja. Kami percaya setiap jemaat dipanggil untuk melayani.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <Target className="size-6 text-[#092C74]" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Tujuan Strategis</h4>
                  <p className="text-gray-500 text-sm italic">"Memperlengkapi orang-orang kudus bagi pekerjaan pelayanan..." (Efesus 4:12)</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="p-3 bg-red-50 rounded-xl">
                  <Globe className="size-6 text-[#E31D1A]" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Visi Pendorong</h4>
                  <p className="text-gray-500 text-sm italic">"Seluruh Umat membawa Seluruh Injil ke Seluruh Dunia"</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            {...fadeInUp}
            className="relative"
          >
            <div className="aspect-[4/3] bg-gradient-to-br from-[#092C74] to-[#1C64E8] rounded-[2rem] overflow-hidden shadow-2xl relative group">
              <img 
                src={bgPattern} 
                alt="Background Pattern" 
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 group-hover:scale-110 transition-transform duration-[2s]" 
              />
              <div className="absolute inset-0 p-12 flex flex-col justify-center text-white">
                <Cross className="size-16 mb-8 text-[#6AACE6]" />
                <h3 className="text-3xl font-bold mb-6">Dasar Teologis</h3>
                <p className="text-xl text-white/95 leading-relaxed font-medium italic">
                  "Kami percaya pada Keimaman Semua Orang Percaya. Perlengkapan melayani harus bisa diakses untuk semua."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Two Pillars Section */}
      <section className="bg-white py-24 shadow-[inset_0_4px_20px_rgba(0,0,0,0.02)]">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Mandat Ganda STTB</h2>
          <div className="w-20 h-1.5 bg-[#E31D1A] mx-auto rounded-full" />
        </div>
        
        <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-2 gap-8">
          <div className="p-10 bg-white border-2 border-gray-100 rounded-3xl hover:border-[#1C64E8] transition-all group shadow-sm hover:shadow-xl">
            <h3 className="text-2xl font-bold mb-4 text-[#092C74] group-hover:text-[#1C64E8]">Equipping the Equippers</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Melalui program studi formal (Gelar), STTB memperlengkapi mahasiswa agar nantinya mereka bisa memperlengkapi jemaat lain di tempat mereka diutus.
            </p>
          </div>
          <div className="p-10 bg-white border-2 border-gray-100 rounded-3xl hover:border-[#E31D1A] transition-all group shadow-sm hover:shadow-xl">
            <h3 className="text-2xl font-bold mb-4 text-[#092C74] group-hover:text-[#E31D1A]">Resourcing the Body of Christ</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Melalui LEAD Center (Non-Formal), kami menyediakan sumber dan sarana pembelajaran yang bisa dipakai langsung oleh gereja.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-[#F5F3FB] relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Tiga Bidang Layanan</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Kami menyediakan berbagai program pembelajaran yang fleksibel dan esensial bagi gereja.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                {...fadeInUp}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white rounded-[2.5rem] p-10 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full flex flex-col"
              >
                <div className={`size-20 rounded-2xl bg-gradient-to-br ${service.color} text-white flex items-center justify-center mb-8 shadow-xl`}>
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-5 flex-1">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex gap-4 group/item">
                      <div className="mt-1 size-6 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 group-hover/item:border-[#1C64E8] transition-colors">
                        <CheckCircle2 className="size-4 text-[#1C64E8]" />
                      </div>
                      <div>
                        <span className="font-bold text-gray-900 block">{item.name}</span>
                        <p className="text-sm text-gray-500 leading-tight">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                
                {service.title.includes("Equipping") && (
                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-4 py-1.5 bg-gray-100 rounded-full text-xs font-bold text-gray-600 uppercase tracking-widest leading-none">Partnership</span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-24 bg-gradient-to-r from-[#003049] to-[#1C64E8] relative overflow-hidden text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div 
            {...fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Siap Diperlengkapi?</h2>
            <p className="text-xl md:text-2xl font-light leading-relaxed mb-12 text-blue-100 italic">
              "Menjadi fasilitas yang menghasilkan pekerja Kristus yang siap melayani di seluruh aspek kehidupan."
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/kontak">
                <Button className="bg-[#E31D1A] hover:bg-[#BA1126] text-white px-10 py-7 text-xl font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95">
                  Hubungi Kami <ArrowRight className="ml-2 size-6" />
                </Button>
              </Link>
            </div>
            <div className="mt-12 text-blue-200/50 text-sm font-bold tracking-[0.3em] uppercase">
              Soli Deo Gloria
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


