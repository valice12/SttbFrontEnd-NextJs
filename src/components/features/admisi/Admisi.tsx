'use client';

import { useState, useEffect } from 'react';
import { dataService } from '@/lib/data-service';
import { FinanceNavbar } from '@/components/features/keuangan/FinanceNavbar';

// Sub-components
import { AdmissionHero } from './components/AdmissionHero';
import { AdmissionSchedule } from './components/AdmissionSchedule';
import { AdmissionRequirements } from './components/AdmissionRequirements';
import { AdmissionFAQ } from './components/AdmissionFAQ';
import { AdmissionHelp } from './components/AdmissionHelp';

const bgHeader = "/assets/04-Beasiswa-Image-Header-scaled.jpg";

export function Admisi() {
  const [admissionSchedule, setAdmissionSchedule] = useState<any>(null);
  const [academicRequirements, setAcademicRequirements] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [schedule, requirements] = await Promise.all([
          dataService.getAdmissionSchedule(),
          dataService.getAcademicRequirements()
        ]);
        setAdmissionSchedule(schedule);
        setAcademicRequirements(requirements.items || []);
      } catch (error) {
        console.error('Error fetching admission data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    try {
      return new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const schedules = Array.isArray(admissionSchedule) ? admissionSchedule : [];
  const defaultTab = schedules.length > 0 ? `Gelombang ${schedules[0].batchOrder}` : "Gelombang I";

  return (
    <div className="relative bg-white">
      <AdmissionHero bgHeader={bgHeader} />
      
      <FinanceNavbar />

      <AdmissionSchedule 
        schedules={schedules} 
        defaultTab={defaultTab} 
        isLoading={isLoading} 
        formatDate={formatDate} 
      />

      <AdmissionRequirements academicRequirements={academicRequirements} />

      <AdmissionFAQ />

      <AdmissionHelp />
    </div>
  );
}
