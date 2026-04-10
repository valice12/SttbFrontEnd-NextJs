'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Users } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from '@/components/ui/carousel';

interface TestimonialsSectionProps {
  testimonials: any[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
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

        <div className="relative md:px-12">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.id} className="pl-4 md:pl-6 basis-[85%] md:basis-1/2 lg:basis-1/3">
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

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={`transition-all duration-300 rounded-full ${
                  current === i 
                    ? "w-8 h-2 bg-white" 
                    : "w-2 h-2 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
