'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { Play } from 'lucide-react';

interface VideoSectionProps {
  videoId?: string;
  title?: string;
  description?: string;
  thumbnailUrl?: string; // Optional: if not provided, will use YouTube's maxresdefault
  tag?: string;
}

export function VideoSection({
  videoId = 'hTh0QkKxNhg',
  title = 'Jelajahi Kampus STT Bandung',
  description = 'Saksikan pengalaman belajar yang transformatif dan fasilitas yang mendukung pertumbuhan spiritual serta akademis Anda.',
  thumbnailUrl,
  tag = 'Campus Tour'
}: VideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Use local asset for thumbnail if not provided
  const finalThumbnail = thumbnailUrl || '/assets/maxresdefault.jpg';

  return (
    <section className="py-12 lg:py-24 bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#092C74]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-[#E31D1A]/5 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 lg:mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-[2px] w-8 lg:w-12 bg-[#E31D1A]" />
              <span className="text-[#E31D1A] font-black tracking-[0.2em] text-xs lg:text-sm uppercase">
                {tag}
              </span>
              <span className="h-[2px] w-8 lg:w-12 bg-[#E31D1A]" />
            </div>
            <h2 className="text-3xl lg:text-6xl font-black text-[#092C74] mb-6 tracking-tight">
              {title.split('STT Bandung')[0]}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#092C74] to-[#E31D1A]">
                STT Bandung
              </span>
              {title.split('STT Bandung')[1]}
            </h2>
            <p className="text-gray-600 text-lg lg:text-xl max-w-2xl mx-auto font-medium">
              {description}
            </p>
          </motion.div>

          {/* Video Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative group shadow-2xl rounded-[2rem] lg:rounded-[3rem] overflow-hidden border-8 border-white/50 backdrop-blur-sm aspect-video bg-gray-100"
          >
            <AspectRatio.Root ratio={16 / 9} className="w-full h-full">
              <AnimatePresence mode="wait">
                {!isPlaying ? (
                  <motion.div
                    key="thumbnail"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative w-full h-full cursor-pointer overflow-hidden"
                    onClick={() => setIsPlaying(true)}
                  >
                    {/* Thumbnail Image */}
                    <img
                      src={finalThumbnail}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="size-20 lg:size-28 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border-2 border-white/50 shadow-2xl relative group/btn"
                      >
                         <div className="absolute inset-0 bg-white rounded-full scale-0 group-hover/btn:scale-100 transition-transform duration-500 opacity-20" />
                         <Play className="size-10 lg:size-14 text-white fill-white ml-1" />
                      </motion.div>
                    </div>

                    {/* Glow Effect */}
                    <div className="absolute -inset-20 bg-gradient-conic from-[#092C74]/40 via-transparent to-[#E31D1A]/40 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-1000 pointer-events-none" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="iframe"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full h-full"
                  >
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                      title={title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </AspectRatio.Root>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
