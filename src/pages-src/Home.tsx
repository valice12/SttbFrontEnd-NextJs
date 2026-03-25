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
  Sparkles
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
          dataService.getNews(),
          dataService.getEvents(),
          dataService.getAcademicPrograms(),
          dataService.getTestimonials()
        ]);
        
        setNews(newsRes || []);
        setEvents(eventsRes || []);
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
      {/* Hero Section */}
      <section className="relative h-[650px] md:h-[800px] overflow-hidden shadow-[0px_9px_13px_0px_rgba(0,0,0,0.25)]">
        <div className="absolute inset-0">
          <img
            src={imgHeroImage}
            alt="STTB Campus"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay from Reference Design */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#061B46]/90 via-[#061B46]/60 to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              SEKOLAH TINGGI<br />
              TEOLOGI BANDUNG
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-3xl md:text-5xl font-medium mb-8 text-[#6AACE6]"
            >
              Bandung Theological School
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-2xl md:text-4xl mb-10 text-[#F2ECF8] font-['Bona_Nova_SC',serif] italic leading-relaxed max-w-2xl"
            >
              "Menghasilkan pastor – scholar yang berdampak dalam konteks pelayanan urban"
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/tentang-kami">
                <Button className="bg-[#1C64E8] hover:bg-[#75B4F9] text-white px-8 py-6 text-lg rounded-full shadow-lg transition-all duration-300">
                  Tentang Kami
                  <ArrowRight className="ml-2 size-5" />
                </Button>
              </Link>
              <Link href="/kontak">
                <Button className="bg-[#E31D1A] hover:bg-[#BA1126] text-white px-8 py-6 text-lg rounded-full shadow-lg transition-all duration-300">
                  Kontak
                  <ArrowRight className="ml-2 size-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 bg-[#F5F3FB]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-[#1C64E8]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-[#1C64E8] rounded-full">
                  <Eye className="size-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Visi</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Menjadi lembaga pendidikan teologi terdepan di Asia Tenggara yang menghasilkan lulusan berkarakter Kristus, kompeten secara akademis, dan berdampak bagi transformasi gereja dan masyarakat.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-[#E52325]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-[#E52325] rounded-full">
                  <Target className="size-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Misi</h2>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#E52325] mt-1">•</span>
                  <span>Menyelenggarakan pendidikan teologi yang berkualitas dan berlandaskan Alkitab</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E52325] mt-1">•</span>
                  <span>Membentuk karakter Kristen yang matang dan pelayan yang setia</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E52325] mt-1">•</span>
                  <span>Mengembangkan penelitian dan publikasi teologi kontekstual</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Program Studi Kami
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pilihan program akademik yang dirancang untuk mempersiapkan Anda dalam pelayanan yang efektif dan berpengaruh
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.slice(0, 3).map((program, index) => {
              const IconComponent = iconMap[program.icon] || BookOpen;

              return (
                <Link key={program.slug} href={`/akademik/${program.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-gradient-to-br from-white to-[#F5F3FB] p-6 rounded-xl border-2 border-gray-200 hover:border-[#1C64E8] hover:shadow-xl transition-all duration-300 h-full"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-[#1C64E8] group-hover:bg-[#E52325] rounded-lg transition-colors">
                        <IconComponent className="size-6 text-white" />
                      </div>
                      <span className="text-sm font-semibold text-[#9F195D] bg-[#9F195D]/10 px-3 py-1 rounded-full">
                        {program.degree}
                      </span>
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-[#1C64E8] transition-colors">
                      {program.programName || program.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {program.description}
                    </p>
                    <p className="text-sm font-medium text-[#1C64E8]">
                      {program.duration} Semester
                    </p>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/akademik">
              <Button className="bg-[#1C64E8] hover:bg-[#75B4F9] text-white px-8 py-6">
                Lihat Semua Program
                <ArrowRight className="ml-2 size-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-[#F5F3FB]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Berita Terkini
              </h2>
              <p className="text-gray-600">
                Update terbaru dari kampus kami
              </p>
            </div>
            <Link href="/berita">
              <Button variant="outline" className="border-[#1C64E8] text-[#1C64E8] hover:bg-[#1C64E8] hover:text-white">
                Lihat Semua
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
      <section className="py-20 bg-[#F5F3FB]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Acara Mendatang
              </h2>
              <p className="text-gray-600">
                Jangan lewatkan event menarik kami
              </p>
            </div>
            <Link href="/kegiatan">
              <Button variant="outline" className="border-[#E52325] text-[#E52325] hover:bg-[#E52325] hover:text-white">
                Lihat Semua
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

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-[#003049] to-[#1C64E8]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 text-white"
          >
            <h2 className="text-4xl font-bold mb-4">
              Testimoni Alumni
            </h2>
            <p className="text-lg text-gray-200">
              Kisah sukses dari para lulusan kami yang melayani di berbagai bidang
            </p>
          </motion.div>

          <div className="relative px-12">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white p-6 rounded-xl shadow-lg h-full"
                    >
                      <div className="flex flex-col items-center text-center">
                        <h3 className="font-bold text-lg text-gray-900 mb-1">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-[#1C64E8] mb-1">
                          {testimonial.role}
                        </p>
                        <p className="text-xs text-gray-500 mb-4">
                          {testimonial.year}
                        </p>
                        <p className="text-sm text-gray-600 italic">
                          "{testimonial.message}"
                        </p>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-4 text-[#75B4F9] border-[#75B4F9] hover:bg-[#75B4F9] hover:text-white" />
              <CarouselNext className="hidden md:flex -right-4 text-[#75B4F9] border-[#75B4F9] hover:bg-[#75B4F9] hover:text-white" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#E52325] via-[#FE5C36] to-[#9F195D] text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Siap Memulai Perjalanan Teologi Anda?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan mahasiswa yang telah mempercayakan pendidikan teologi mereka kepada kami
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="https://sis.sttb.ac.id/pmb" target="_blank" rel="noopener noreferrer">
                <Button className="bg-white text-[#E52325] hover:bg-[#092C74] hover:text-white px-8 py-6 text-lg transition-all duration-300">
                  Daftar Sekarang
                  <ArrowRight className="ml-2 size-5" />
                </Button>
              </a>
              <Link href="/admisi">
                <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#E52325] px-8 py-6 text-lg transition-all duration-300">
                  Informasi Pendaftaran
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


