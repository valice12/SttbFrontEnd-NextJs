'use client';

import { useState, useEffect } from 'react';
import { dataService } from '@/lib/data-service';

export function useHomeData() {
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

  return {
    news,
    events,
    programs,
    testimonials,
    loading,
    latestNews: news.slice(0, 3),
    upcomingEvents: events.slice(0, 3)
  };
}
