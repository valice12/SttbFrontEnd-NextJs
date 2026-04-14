'use client';

import { Suspense } from 'react';
import { useHomeData } from '@/hooks/useHomeData';
import { HeroSection } from './components/HeroSection';
import { VisionMissionSection } from './components/VisionMissionSection';
import { AcademicSection } from './components/AcademicSection';
import { NewsSection } from './components/NewsSection';
import { EventsSection } from './components/EventsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { VideoSection } from './components/VideoSection';
import { CTASection } from './components/CTASection';

const imgHeroImage = "/assets/gedung1.png";

export function Home() {
  const { 
    programs, 
    latestNews, 
    upcomingEvents, 
    testimonials, 
    loading 
  } = useHomeData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#092C74]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <HeroSection imgHeroImage={imgHeroImage} />
      
      <VisionMissionSection />

      <VideoSection />

      <AcademicSection programs={programs} />

      <NewsSection latestNews={latestNews} />

      <EventsSection upcomingEvents={upcomingEvents} />

      <TestimonialsSection testimonials={testimonials} />

      <CTASection />
    </div>
  );
}
