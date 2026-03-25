'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Building, Users } from 'lucide-react';
import { dataService } from '@/lib/data-service';

export function OrganizationTab() {
  const [foundation, setFoundation] = useState<any>(null);
  const [lecturers, setLecturers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [foundationData, lecturersData] = await Promise.all([
          dataService.getFoundationMembers(),
          dataService.getLecturers()
        ]);
        setFoundation(foundationData);
        setLecturers(lecturersData);
      } catch (error) {
        console.error("Failed to fetch organization data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#092C74]"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-16"
    >
      {/* Foundation Section */}
      <div className="pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Building className="size-8 text-[#E31D1A]" />
              <h3 className="text-3xl font-bold text-[#092C74] uppercase tracking-tighter">Yayasan STTB</h3>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl">
              Sekolah Tinggi Teologi Bandung dikelola oleh <span className="font-bold text-[#092C74]">Yayasan Pendidikan Teologi Bandung</span>.
            </p>
          </div>
        </div>

        {/* Dewan Pembina */}
        <div className="mb-20">
          <h4 className="text-xl font-black text-[#092C74] mb-8 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-[#E31D1A]"></span>
            DEWAN PEMBINA
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(foundation?.items?.filter((m: any) => m.division === "Dewan Pembina") || []).map((member: any, i: number) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
                <div className="size-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                  <Users className="size-6 text-[#092C74]" />
                </div>
                <span className="font-bold text-gray-800">{member.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dewan Pengurus */}
        <div>
          <h4 className="text-xl font-black text-[#092C74] mb-8 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-[#E31D1A]"></span>
            DEWAN PENGURUS
          </h4>
          
          {/* Core Executives */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {(foundation?.items?.filter((m: any) => m.division === "Dewan Pengurus" && m.role) || []).map((item: any, i: number) => (
              <div key={i} className="bg-[#092C74] p-8 rounded-xl shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                  <Building className="size-16 text-white" />
                </div>
                <span className="text-[10px] block text-blue-300 font-bold uppercase tracking-widest mb-2 relative z-10">{item.role}</span>
                <h5 className="font-bold text-white text-lg relative z-10">{item.name}</h5>
              </div>
            ))}
          </div>

          {/* Members */}
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <h5 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-8">Anggota Pengurus & Anggota</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
              {(foundation?.items?.filter((m: any) => (m.division === "Anggota" || m.division === "Dewan Pengawas") || (!m.role && m.division === "Dewan Pengurus")) || []).map((member: any, i: number) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-200/50">
                  <div className="size-2 bg-[#E31D1A] rounded-full shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-700">{member.name}</span>
                    {member.role && <span className="text-[10px] text-gray-400 font-bold uppercase">{member.division} - {member.role}</span>}
                    {!member.role && <span className="text-[10px] text-gray-400 font-bold uppercase">{member.division}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Faculty Section - Hierarchy Bagan */}
      <div className="space-y-12">
        <div className="flex items-center gap-4 mb-6">
          <Users className="size-8 text-[#092C74]" />
          <h3 className="text-3xl font-bold text-[#092C74] uppercase tracking-tighter">Dewan Pengajar</h3>
        </div>

        <div className="flex flex-col items-center space-y-14">
          {/* Level 1: Ketua */}
          {(() => {
            const ketua = lecturers.find(l => l.roles?.includes('Ketua STT') || l.roles?.includes('Ketua'));
            return (
              <div className="flex flex-col items-center">
                <div className="bg-[#E31D1A] text-white p-8 rounded-sm shadow-xl border-b-4 border-red-900 w-80 text-center relative z-10">
                  <span className="text-[10px] absolute -top-3 left-1/2 -translate-x-1/2 bg-[#092C74] px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[#F8F9FA] shadow-md">Ketua</span>
                  <h4 className="font-bold text-xl leading-tight">{ketua?.lecturerName || 'Ketua STT'}</h4>
                  <div className="mt-4 w-full h-[1px] bg-white/20" />
                </div>
                <div className="h-16 w-[2px] bg-gray-300" />
              </div>
            );
          })()}

          {/* Level 2: Wakil Ketua */}
          {(() => {
            const wakilKetua = lecturers.filter(l =>
              l.roles?.some((r: string) => r.toLowerCase().startsWith('wakil ketua'))
            );
            if (wakilKetua.length === 0) return null;
            const cols = wakilKetua.length === 1 ? 'grid-cols-1' : wakilKetua.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3';
            return (
              <div className="flex flex-col items-center w-full max-w-4xl">
                <div className={`grid grid-cols-1 ${cols} gap-8 relative w-full`}>
                  {wakilKetua.length > 1 && <div className="hidden md:block absolute top-0 left-[16.6%] right-[16.6%] h-[2px] bg-gray-300 z-0" />}
                  {wakilKetua.map((item: any, i: number) => {
                    const roleLabel = item.roles?.find((r: string) => r.toLowerCase().startsWith('wakil ketua')) || 'Wakil Ketua';
                    return (
                      <div key={i} className="flex flex-col items-center relative z-10">
                        <div className="hidden md:block h-8 w-[2px] bg-gray-300" />
                        <div className="bg-[#092C74] text-white p-6 rounded-sm shadow-lg w-64 text-center">
                          <span className="text-[10px] block text-blue-300 font-bold uppercase mb-3 tracking-wider">{roleLabel}</span>
                          <h5 className="font-bold text-base">{item.lecturerName}</h5>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="h-16 w-[2px] bg-gray-300" />
              </div>
            );
          })()}

          {/* Level 3: Kaprodi */}
          {(() => {
            const kaprodi = lecturers.filter(l =>
              l.roles?.some((r: string) => r.toLowerCase().startsWith('kaprodi'))
            );
            if (kaprodi.length === 0) return null;
            return (
              <div className="flex flex-col items-center w-full overflow-x-auto pb-4">
                <div className="flex justify-center min-w-max gap-6 relative px-4 z-10 items-stretch">
                  {kaprodi.length > 1 && <div className="absolute top-0 left-12 right-12 h-[2px] bg-gray-300 z-0" />}
                  {kaprodi.map((item: any, i: number) => {
                    const roleLabel = item.roles?.find((r: string) => r.toLowerCase().startsWith('kaprodi')) || 'Kaprodi';
                    return (
                      <div key={i} className="flex flex-col items-center relative z-10">
                        <div className="h-8 w-[2px] bg-gray-300 shrink-0" />
                        <div className="bg-white border-2 border-[#092C74] p-5 rounded-sm shadow-md w-44 text-center flex flex-col hover:-translate-y-1 transition-transform duration-300 h-full">
                          <span className="text-[10px] block text-[#092C74] font-bold uppercase mb-2 shrink-0 tracking-widest">{roleLabel}</span>
                          <h5 className="font-bold text-xs text-gray-800 leading-relaxed my-auto mx-auto">{item.lecturerName}</h5>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="h-16 w-[2px] bg-gray-300 shrink-0" />
              </div>
            );
          })()}

          {/* Level 4: Jajaran Dosen */}
          <div className="w-full max-w-5xl">
            <div className="bg-gray-50 p-8 rounded-sm border border-dashed border-gray-300">
              <div className="text-center mb-10">
                <span className="text-xs bg-[#092C74] text-white px-4 py-1.5 rounded-full font-bold uppercase tracking-widest shadow-sm">Jajaran Dosen</span>
                <h4 className="font-bold text-xl text-[#092C74] mt-4">Dosen Tetap & Luar Biasa</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {lecturers.map((lecturer, i) => (
                  <div key={i} className="bg-white p-5 rounded shadow hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col items-center text-center">
                    <h5 className="font-bold text-base text-gray-800">{lecturer.lecturerName}</h5>
                    <div className="flex flex-wrap justify-center gap-1 mt-1">
                      {lecturer.roles?.map((role: string, ri: number) => (
                        <span key={ri} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded uppercase font-bold">{role}</span>
                      ))}
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase font-medium">{lecturer.degrees?.join(', ')}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
