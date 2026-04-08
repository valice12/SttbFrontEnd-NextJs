'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import {
  BookOpen,
  GraduationCap,
  Award,
  Users,
  Heart,
  ArrowRight,
  Target,
  Eye,
  Sparkles,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { MediaCard } from '@/components/MediaCard';
import { dataService } from '@/lib/data-service';
import { useState, useEffect } from 'react';
const imgHeroImage = "/assets/gedung1.png";
const imgLongBackground = "/assets/Page-Panjang-1.webp";
const bgPattern = "/assets/background.webp";
const PHI = 1.61803398875;

// Color Palette with Purple transitions
const COLORS = {
  primary: "#092C74", // Deep Blue
  secondary: "#E31D1A", // Red
  accent: "#6A0DAD", // Purple
  indigo: "#4B0082",
  plum: "#8B008B",
  glass: "rgba(255, 255, 255, 0.05)",
  glassBorder: "rgba(255, 255, 255, 0.1)"
};

// Icon mapping for programs
const iconMap: Record<string, any> = {
  BookOpen,
  GraduationCap,
  Award,
  Users,
  Heart
};

export function Home() {
  const [news, setNews] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHomeData() {
      try {
        setLoading(true);
        const [newsRes, eventsRes, programsRes, testimonialsRes] = await Promise.all([
          dataService.getNews({ pageSize: 6 }),
          dataService.getEvents({ pageSize: 6 }),
          dataService.getAcademicPrograms(),
          dataService.getTestimonials()
        ]);
        
        setNews(newsRes?.items || []);
        setEvents(eventsRes?.items || []);
        setPrograms(programsRes || []);
        setTestimonials(testimonialsRes || []);
      } catch (error) {
        console.error("Failed to fetch home data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHomeData();
  }, []);

  // Get latest 3 news and events
  const latestNews = news.slice(0, 3);
  const upcomingEvents = events.slice(0, 3);

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgPattern})` }}
    >
      {/* Modern Hero Section with Golden Ratio */}
      <section className="relative h-[700px] md:h-[900px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={imgHeroImage}
            alt="STTB Campus"
            className="w-full h-full object-cover scale-105"
          />
          {/* Advanced Gradient Overlay (Blue -> Purple -> Transparent) */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#061B46]/95 via-[#4B0082]/40 to-transparent z-10" />
          
          {/* Animated Mesh Gradients for "WOW" factor */}
          <div className="absolute top-1/4 -right-1/4 size-[600px] bg-[#E31D1A]/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 -left-1/4 size-[500px] bg-[#092C74]/40 blur-[100px] rounded-full" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center z-20">
          <div className="flex flex-col lg:flex-row items-center w-full">
            {/* Content Area - roughly 61.8% (PHI ratio) */}
            <div className="w-full lg:w-[61.8%] relative">
              {/* Premium Glassmorphism Panel */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="backdrop-blur-md bg-white/5 border border-white/10 p-8 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E31D1A] rounded-full text-white text-xs font-black uppercase tracking-widest mb-8 shadow-lg shadow-red-500/30"
                >
                   <Sparkles className="size-3" /> Pelopor Pendidikan Teologi
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8, ease: "backOut" }}
                  className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white mb-6 leading-[1.1] tracking-tight drop-shadow-2xl"
                >
                  SEKOLAH TINGGI<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6AACE6] via-[#A855F7] to-[#E31D1A]">
                    TEOLOGI BANDUNG
                  </span>
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="text-2xl md:text-3xl font-bold mb-8 text-white/90 leading-tight"
                >
                  "Menghasilkan pastor – scholar yang berdampak dalam konteks pelayanan urban"
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="flex flex-wrap gap-6 pt-4"
                >
                  <Link href="/tentang-kami">
                    <Button className="group bg-[#1C64E8] hover:bg-white !text-white hover:!text-[#092C74] px-10 py-7 text-xl font-black rounded-2xl shadow-2xl transition-all duration-500 hover:-translate-y-1 border-0">
                      MULAI JELAJAHI
                      <ArrowRight className="ml-2 size-6 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/admisi">
                    <Button className="bg-transparent border-2 border-white/30 !text-white hover:bg-white hover:!text-[#E31D1A] hover:border-white px-10 py-7 text-xl font-bold rounded-2xl backdrop-blur-sm transition-all duration-500">
                      DAFTAR SEKARANG
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Empty space for image focus - the remaining 38.2% */}
            <div className="hidden lg:block lg:w-[38.2%]" />
          </div>
        </div>
        
        {/* Scroll Indicator derived from Phi positioning */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 opacity-50 hidden md:block"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Vision & Mission Section - Asymmetrical Golden Ratio Layout */}
      <section className="py-32 bg-[#FBFAFF] relative overflow-hidden">
        {/* Abstract Purple Background Element */}
        <div className="absolute top-0 right-0 w-[40%] h-full bg-[#F5F3FB]/50 -skew-x-12 transform origin-top translate-x-1/4" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* Vision - 61.8% */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-[61.8%] bg-white p-12 md:p-16 rounded-[3rem] shadow-xl border border-gray-100 group hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex items-center gap-6 mb-10">
                <div className="size-20 bg-gradient-to-br from-[#092C74] to-[#4B0082] rounded-3xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                  <Eye className="size-10 text-white" />
                </div>
                <div>
                   <span className="text-[#E31D1A] font-black tracking-widest text-sm uppercase mb-2 block">Our Vision</span>
                   <h2 className="text-5xl font-black text-[#092C74]">Visi STT Bandung</h2>
                </div>
              </div>
              <p className="text-2xl md:text-3xl text-gray-700 leading-[1.4] font-medium italic">
                "Menjadi lembaga pendidikan teologi terdepan di Asia Tenggara yang menghasilkan lulusan berkarakter Kristus, kompeten secara akademis, dan berdampak bagi transformasi gereja dan masyarakat."
              </p>
            </motion.div>

            {/* Mission - 38.2% */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="w-full lg:w-[38.2%] bg-gradient-to-br from-[#E31D1A] to-[#8B008B] p-12 rounded-[3rem] shadow-xl text-white relative overflow-hidden group"
            >
               {/* Decorative Circle */}
               <div className="absolute -bottom-10 -right-10 size-48 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
               
               <div className="flex items-center gap-4 mb-8">
                  <div className="size-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                    <Target className="size-7 text-white" />
                  </div>
                  <h2 className="text-3xl font-black">Misi Kami</h2>
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

      {/* Programs Section - Premium Cards */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-[#E31D1A] font-black tracking-widest text-sm uppercase mb-4 block">Our Excellence</span>
            <h2 className="text-5xl md:text-6xl font-black text-[#092C74] mb-6">
              Program Studi Kami
            </h2>
            <div className="w-24 h-2 bg-gradient-to-r from-[#092C74] via-[#6A0DAD] to-[#E31D1A] mx-auto rounded-full mb-8" />
            <p className="text-xl text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed">
              Pilihan program akademik yang dirancang secara strategis untuk mempersiapkan Anda menjadi pemimpin yang berdampak.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {programs.slice(0, 3).map((program, index) => {
              const IconComponent = iconMap[program.icon] || BookOpen;

              return (
                <Link key={program.slug} href={`/akademik/${program.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(9,44,116,0.1)] hover:-translate-y-2 transition-all duration-500 h-full flex flex-col items-start text-left"
                  >
                    <div className="flex items-center justify-between w-full mb-8">
                      <div className="size-16 bg-gradient-to-br from-[#092C74] to-[#4B0082] group-hover:from-[#E31D1A] group-hover:to-[#8B008B] rounded-2xl flex items-center justify-center text-white shadow-lg transition-all duration-500">
                        <IconComponent className="size-8" />
                      </div>
                      <span className="text-xs font-black tracking-widest text-[#E31D1A] bg-red-50 px-4 py-2 rounded-full uppercase">
                        {program.degree}
                      </span>
                    </div>
                    <h3 className="font-black text-2xl text-[#092C74] mb-4 group-hover:text-[#E31D1A] transition-colors leading-tight">
                      {program.programName || program.title}
                    </h3>
                    <p className="text-gray-600 mb-8 font-medium leading-relaxed">
                      {program.description}
                    </p>
                    <div className="mt-auto flex items-center gap-3 text-sm font-black text-[#6A0DAD] bg-purple-50 px-5 py-2.5 rounded-2xl">
                       <Clock className="size-4" />
                       <span>{program.duration} SEMESTER</span>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <Link href="/akademik">
              <Button className="bg-[#092C74] hover:bg-[#E31D1A] text-white px-12 py-8 text-xl font-black rounded-2xl shadow-xl transition-all duration-500 hover:-translate-y-1">
                LIHAT SEMUA PROGRAM
                <ArrowRight className="ml-3 size-6" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* News Section */}
      {/* News Section - Refined Grid with Phi Spacing */}
      <section className="py-32 bg-[#FBFAFF]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-[#6A0DAD] font-black tracking-widest text-sm uppercase mb-4 block underline underline-offset-8 decoration-[#092C74]">STTB Updates</span>
              <h2 className="text-5xl md:text-6xl font-black text-[#092C74] mb-6">
                Berita Terkini
              </h2>
              <p className="text-xl text-gray-500 font-medium">
                Ikuti perkembangan terbaru dan wawasan teologis dari kampus kami.
              </p>
            </div>
            <Link href="/berita">
              <Button variant="outline" className="border-2 border-[#092C74] text-[#092C74] hover:bg-[#092C74] hover:text-white px-10 py-7 text-xl font-bold rounded-2xl transition-all duration-500">
                LIHAT SEMUA
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <MediaCard {...news} type="news" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      {/* Events Section - Refined Grid with Phi Spacing */}
      <section className="py-32 bg-white border-t border-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-[#E31D1A] font-black tracking-widest text-sm uppercase mb-4 block underline underline-offset-8 decoration-[#8B008B]">Join Our Events</span>
              <h2 className="text-5xl md:text-6xl font-black text-[#092C74] mb-6">
                Acara Mendatang
              </h2>
              <p className="text-xl text-gray-500 font-medium">
                Jangan lewatkan berbagai kegiatan seminar, ibadah, dan acara akademik kami.
              </p>
            </div>
            <Link href="/kegiatan">
              <Button variant="outline" className="border-2 border-[#E31D1A] text-[#E31D1A] hover:bg-[#E31D1A] hover:text-white px-10 py-7 text-xl font-bold rounded-2xl transition-all duration-500">
                LIHAT SEMUA
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <MediaCard {...event} type="event" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Premium Carousel with Phi Spacing */}
      <section className="py-32 bg-gradient-to-br from-[#092C74] via-[#4B0082] to-[#092C74] relative overflow-hidden">
        {/* Animated Orbs */}
        <div className="absolute top-0 left-0 size-[500px] bg-white/5 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 size-[400px] bg-[#E31D1A]/10 blur-[100px] rounded-full translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20 text-white"
          >
            <span className="text-white/60 font-black tracking-[0.3em] text-xs uppercase mb-4 block underline underline-offset-8 decoration-[#E31D1A]">Success Stories</span>
            <h2 className="text-5xl md:text-7xl font-black mb-8">
              Kisah Alumni
            </h2>
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto font-medium">
              Bagaimana STTB membentuk perjalanan hidup dan pelayanan mereka.
            </p>
          </motion.div>

          <div className="relative px-4 md:px-12">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-6">
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={testimonial.id} className="pl-6 md:basis-1/2 lg:basis-1/3">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white p-12 rounded-[3rem] shadow-2xl h-full flex flex-col relative group overflow-hidden"
                    >
                      {/* Quote Icon */}
                      <div className="absolute top-8 right-8 text-[#092C74]/5 group-hover:text-[#E31D1A]/10 transition-colors">
                         <BookOpen className="size-24" />
                      </div>
                      
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="mb-8">
                           <div className="size-16 bg-[#F5F3FB] rounded-2xl mb-6 flex items-center justify-center">
                              <Users className="size-8 text-[#092C74]" />
                           </div>
                           <h3 className="font-black text-2xl text-[#092C74] mb-1">
                             {testimonial.name}
                           </h3>
                           <p className="text-sm font-black text-[#E31D1A] uppercase tracking-widest">
                             {testimonial.role} • Class of {testimonial.year}
                           </p>
                        </div>
                        
                        <p className="text-lg text-gray-600 font-medium leading-relaxed italic grow">
                          "{testimonial.message}"
                        </p>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-12 lg:-left-20 size-16 bg-white text-[#092C74] border-0 shadow-2xl hover:bg-[#E31D1A] hover:text-white transition-all duration-300" />
              <CarouselNext className="hidden md:flex -right-12 lg:-right-20 size-16 bg-white text-[#092C74] border-0 shadow-2xl hover:bg-[#E31D1A] hover:text-white transition-all duration-300" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* CTA Section - Advanced Gradient with "WOW" Animations */}
      <section className="py-32 relative overflow-hidden">
        {/* Animated Background Layers */}
        <div className="absolute inset-0 bg-[#092C74]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#E31D1A] via-[#6A0DAD] to-[#092C74] opacity-80" />
        
        {/* Floating background blobs */}
        <div className="absolute top-0 right-0 size-96 bg-white/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 size-96 bg-[#8B008B]/30 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight text-white drop-shadow-xl">
              Siap Memulai Perjalanan Teologi Anda?
            </h2>
            <p className="text-2xl md:text-3xl mb-12 text-white/90 max-w-2xl mx-auto font-medium leading-relaxed">
              Bergabunglah dengan ribuan mahasiswa yang telah mempercayakan pendidikan teologi mereka kepada STTB.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <a href="https://sis.sttb.ac.id/pmb" target="_blank" rel="noopener noreferrer">
                <Button className="group bg-white text-[#E31D1A] hover:bg-[#092C74] hover:text-white px-10 py-8 text-2xl font-black rounded-3xl shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  DAFTAR SEKARANG
                  <ArrowRight className="ml-3 size-8 group-hover:translate-x-2 transition-transform" />
                </Button>
              </a>
              <Link href="/admisi">
                <Button variant="outline" className="bg-transparent border-2 border-white/40 text-white hover:bg-white hover:text-[#092C74] px-10 py-8 text-2xl font-bold rounded-3xl backdrop-blur-sm transition-all duration-500 hover:-translate-y-2">
                  INFO PENDAFTARAN
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


