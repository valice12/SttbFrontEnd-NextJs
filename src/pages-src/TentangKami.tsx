'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
// Tambahan useScroll dan useTransform untuk animasi garis timeline
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { Eye, Target, Music, BookOpen, Users, Building, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { dataService } from '@/lib/data-service';

// Import sub-components
import { HistoryTab } from '@/components/tentang-kami/HistoryTab';
import { VisionTab } from '@/components/tentang-kami/VisionTab';
import { FaithTab } from '@/components/tentang-kami/FaithTab';
import { OrganizationTab } from '@/components/tentang-kami/OrganizationTab';

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
      {/* Hero Section */}
      <section className="relative text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={bgHeader} alt="About Us" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#061C4A]/80 mix-blend-multiply" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tighter uppercase drop-shadow-2xl">
              {TAB_TITLES[activeTab]}
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-90 font-medium">
              Mengenal lebih dekat Sekolah Tinggi Teologi Bandung
            </p>
          </motion.div>
        </div>
      </section>

      {/* Unified Tabs Container */}
      <Tabs value={activeTab} className="w-full">
        {/* Navigation Section */}
        <section className="bg-white border-b border-gray-200 py-6 sticky top-[132px] md:top-[132px] z-40 shadow-sm backdrop-blur-md bg-white/95">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              {Object.entries(TAB_TITLES).map(([key, title]) => {
                const Icon = key === 'history' ? Users : 
                            key === 'vision' ? Target : 
                            key === 'faith' ? BookOpen : Building;
                
                const isActive = activeTab === key;

                return (
                  <button
                    key={key}
                    onClick={() => handleTabChange(key)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 border ${
                      isActive 
                        ? 'bg-[#092C74] text-white border-[#092C74] ring-2 ring-offset-2 ring-[#092C74]' 
                        : 'bg-[#f8f9fa] hover:bg-[#F2ECF8] hover:text-[#092C74] border-gray-200 text-gray-700 hover:border-[#092C74]'
                    }`}
                  >
                    <Icon className={`size-5 ${isActive ? 'text-white' : 'text-[#E31D1A]'}`} />
                    {title}
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
