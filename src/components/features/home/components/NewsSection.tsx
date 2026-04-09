'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MediaCard } from '@/components/common/NewsCard';

interface NewsSectionProps {
  latestNews: any[];
}

export function NewsSection({ latestNews }: NewsSectionProps) {
  return (
    <section className="py-12 lg:py-24 bg-[#FBFAFF]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-10 lg:mb-16 gap-8">
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
            <Button variant="outline" className="border-2 border-[#092C74] text-[#092C74] hover:bg-[#092C74] hover:text-white px-6 py-4 md:px-10 md:py-7 text-sm md:text-xl font-black rounded-xl md:rounded-2xl transition-all duration-500">
              LIHAT SEMUA
            </Button>
          </Link>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden lg:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Mobile List Layout */}
        <div className="flex flex-col lg:hidden gap-4">
          {latestNews.map((news, index) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <MediaCard {...news} type="news" variant="compact" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
