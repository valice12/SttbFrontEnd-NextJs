'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
// Tambahan useScroll dan useTransform untuk animasi garis timeline
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { Eye, Target, Music, BookOpen, Users, Building, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { dataService } from '@/lib/data-service';

// Import sub-components
import { HistoryTab } from '@/components/features/tentangkami/HistoryTab';
import { VisionTab } from '@/components/features/tentangkami/VisionTab';
import { FaithTab } from '@/components/features/tentangkami/FaithTab';
import { OrganizationTab } from '@/components/features/tentangkami/OrganizationTab';

// Ditempatkan di luar komponen agar referensi stabil (tidak recreated tiap render)
const TAB_TITLES: Record<string, string> = {
  history: "Sejarah & Pendiri",
  vision: "Visi, Misi & Identitas",
  faith: "Pengakuan Iman",
  organization: "Struktur Organisasi"
};

const bgHeader = "/assets/header-tentang-kami.png";
const bgPattern = "/assets/background.webp";
const logoSttb = "/assets/logo.png";
const marsSTTB = "/assets/mars-sttb.webp";

// Images for HistoryTab
const images = {
  sejarah1: "/assets/sejarah-1.png",
  sejarah2: "/assets/sejarah-2-rev.png",
  sejarah3: "/assets/sejarah-3-rev.png",
  imgCaleb: "/assets/caleb-tong-rev-1.png",
  imgJoseph: "/assets/joseph-tong-rev-1.png",
  imgDorothy: "/assets/dorothy-marx-rev-1.png",
  imgApi: "/assets/api.png",
  imgAlkitab: "/assets/alkitab.png",
  imgSalib: "/assets/salib.png",
  imgTongkat: "/assets/tongkat.png",
  logoSttb,
  marsSTTB: "/assets/09-MARS-STTB.jpg"
};

export function TentangKami() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const activeTab = (tabParam && TAB_TITLES[tabParam]) ? tabParam : "history";
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleTabChange = (value: string) => {
    if (value === activeTab) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', value);
    
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Modern Hero Section with Golden Ratio & Staggered Animation */}
      <section className="relative h-[600px] md:h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={bgHeader} alt="About Us" className="w-full h-full object-cover scale-105" />
          {/* Advanced Gradient Overlay (Blue -> Purple -> Transparent) */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#061B46]/95 via-[#4B0082]/45 to-transparent z-10" />
          
          {/* Animated Mesh Gradients */}
          <div className="absolute top-1/4 -right-1/4 size-[500px] bg-[#E31D1A]/20 blur-[100px] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 -left-1/4 size-[400px] bg-[#092C74]/30 blur-[100px] rounded-full" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center z-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="backdrop-blur-md bg-white/5 border border-white/10 p-8 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E31D1A] rounded-full text-white text-xs font-black uppercase tracking-widest mb-6 shadow-lg shadow-red-500/30"
              >
                 <Info className="size-3" /> Mengenal STT Bandung
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, ease: "backOut" }}
                className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight drop-shadow-2xl"
              >
                {TAB_TITLES[activeTab]}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-xl md:text-2xl text-white/90 font-medium leading-relaxed"
              >
                Melayani dengan integritas, membentuk karakter Kristus, dan berdampak bagi masyarakat urban.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Unified Tabs Container */}
      <Tabs value={activeTab} className="w-full">
        {/* Navigation Section - Premium Glassmorphism Tabs */}
        <section className="bg-white/80 border-b border-gray-100 py-8 sticky top-[132px] md:top-[132px] z-40 shadow-sm backdrop-blur-xl">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-4 lg:gap-6">
              {Object.entries(TAB_TITLES).map(([key, title]) => {
                const Icon = key === 'history' ? Users : 
                            key === 'vision' ? Target : 
                            key === 'faith' ? BookOpen : Building;
                
                const isActive = activeTab === key;

                return (
                  <button
                    key={key}
                    onClick={() => handleTabChange(key)}
                    className={`flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-3 px-4 py-4 md:px-8 md:py-4 rounded-2xl transition-all duration-500 font-black tracking-wide shadow-sm hover:shadow-xl border-2 ${
                      isActive 
                        ? 'bg-[#092C74] text-white border-[#092C74] shadow-blue-900/20' 
                        : 'bg-white hover:bg-[#F2ECF8] hover:text-[#092C74] border-gray-100 text-gray-500 hover:border-[#6A0DAD]'
                    }`}
                  >
                    <Icon className={`size-5 md:size-6 ${isActive ? 'text-white' : 'text-[#E31D1A]'}`} />
                    <span className="uppercase text-[10px] md:text-sm text-center md:text-left leading-tight">{title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Main Content Areas */}
        <section
          className="py-16 md:py-24 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgPattern})` }}
        >
          <div className="container mx-auto px-4 max-w-6xl">
            <TabsContent value="history">
              <HistoryTab
                isMounted={isMounted}
                images={images}
              />
            </TabsContent>

            <TabsContent value="vision">
              <VisionTab images={images} />
            </TabsContent>

            <TabsContent value="faith">
              <FaithTab />
            </TabsContent>

            <TabsContent value="organization">
              <OrganizationTab />
            </TabsContent>
          </div>
        </section>
      </Tabs>
    </div>
  );
}
