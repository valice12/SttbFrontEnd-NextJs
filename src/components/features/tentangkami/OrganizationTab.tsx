'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Building, Users, ShieldCheck, GraduationCap, ChevronRight, Search } from 'lucide-react';
import { useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { dataService } from '@/lib/data-service';

export function OrganizationTab() {
  const [foundation, setFoundation] = useState<any>(null);
  const [lecturers, setLecturers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [foundationData, lecturersData] = await Promise.all([
          dataService.getFoundationMembers(),
          dataService.getLecturers()
        ]);
        setFoundation(foundationData);
        setLecturers(lecturersData?.items || (Array.isArray(lecturersData) ? lecturersData : []));
      } catch (error) {
        console.error("Failed to fetch organization data:", error);
        setLecturers([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchTerm(searchQuery);
    }
  };

  const safeLecturers = Array.isArray(lecturers) ? lecturers : [];

  const filteredFoundation = useMemo(() => {
    if (!searchTerm || !foundation?.items) return foundation;
    const lowerSearch = searchTerm.toLowerCase();
    return {
      ...foundation,
      items: foundation.items.filter((m: any) => 
        m.name.toLowerCase().includes(lowerSearch) || 
        (m.role && m.role.toLowerCase().includes(lowerSearch)) ||
        (m.division && m.division.toLowerCase().includes(lowerSearch))
      )
    };
  }, [foundation, searchTerm]);

  const filteredLecturers = useMemo(() => {
    if (!searchTerm) return safeLecturers;
    const lowerSearch = searchTerm.toLowerCase();
    return safeLecturers.filter(l => 
      l.lecturerName.toLowerCase().includes(lowerSearch) || 
      l.roles?.some((r: string) => r.toLowerCase().includes(lowerSearch)) ||
      l.degrees?.some((d: string) => d.toLowerCase().includes(lowerSearch))
    );
  }, [safeLecturers, searchTerm]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#092C74]"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-32 mb-20"
    >
      {/* Search Bar Standardized */}
      <div className="flex justify-center -mb-20 relative z-50">
        <div className="relative w-full max-w-2xl group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-hover:text-[#092C74] transition-colors" />
          <Input
            type="text"
            placeholder="Cari Pengurus atau Dosen (Tekan Enter)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="pl-14 h-16 rounded-3xl border-2 border-white/50 bg-white/50 backdrop-blur-xl focus:bg-white focus:ring-4 focus:ring-[#092C74]/5 text-sm font-black tracking-widest transition-all shadow-xl"
          />
        </div>
      </div>
      {/* Foundation Section - Premium Management */}
      <section className="relative">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#092C74] rounded-full text-white text-[10px] font-black uppercase tracking-widest mb-6">
             <ShieldCheck className="size-3" /> Governance
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#092C74] tracking-tighter mb-6">
            Yayasan Pendidikan <span className="text-[#E31D1A]">Teologi Bandung</span>
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-[#092C74] to-[#E31D1A] rounded-full" />
        </div>

        {/* Dewan Pembina - Glass Grid */}
        <div className="mb-24">
          <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-10 flex items-center gap-4 justify-center">
            <div className="h-px w-12 bg-gray-200" />
            Dewan Pembina
            <div className="h-px w-12 bg-gray-200" />
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {(filteredFoundation?.items?.filter((m: any) => m.division === "Dewan Pembina") || []).map((member: any, i: number) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -5 }}
                className="backdrop-blur-md bg-white/40 border border-white/60 p-8 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex items-center gap-6 hover:shadow-xl transition-all duration-500"
              >
                <div className="size-14 bg-gradient-to-br from-[#092C74] to-[#4B0082] rounded-2xl flex items-center justify-center shrink-0 shadow-lg text-white">
                  <Users className="size-6" />
                </div>
                <span className="font-black text-[#092C74] text-lg tracking-tight">{member.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dewan Pengurus - Elite Cards */}
        <div>
          <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-10 flex items-center gap-4 justify-center">
            <div className="h-px w-12 bg-gray-200" />
            Dewan Pengurus
            <div className="h-px w-12 bg-gray-200" />
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 max-w-7xl mx-auto">
            {(filteredFoundation?.items?.filter((m: any) => m.division === "Dewan Pengurus" && m.role) || []).map((item: any, i: number) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.02 }}
                className="bg-[#092C74] p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group border border-white/5 h-full"
              >
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-700">
                  <Building className="size-20 text-white" />
                </div>
                <span className="text-[10px] block text-[#6AACE6] font-black uppercase tracking-widest mb-4 relative z-10">{item.role}</span>
                <h5 className="font-black text-white text-xl leading-tight relative z-10 tracking-tight">{item.name}</h5>
              </motion.div>
            ))}
          </div>

          {/* Extended Members - Clean List */}
          <div className="backdrop-blur-xl bg-gray-50/50 p-10 md:p-14 rounded-[3rem] border border-gray-100 max-w-7xl mx-auto">
            <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-12 text-center">Anggota Pengurus & Pengawas</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
              {(filteredFoundation?.items?.filter((m: any) => (m.division === "Anggota" || m.division === "Dewan Pengawas") || (!m.role && m.division === "Dewan Pengurus")) || []).map((member: any, i: number) => (
                <div key={i} className="flex items-start gap-4 p-4 hover:bg-white rounded-2xl transition-colors group">
                  <div className="size-2 bg-[#E31D1A] rounded-full mt-2 group-hover:scale-150 transition-transform" />
                  <div className="flex flex-col">
                    <span className="text-base font-black text-[#092C74] tracking-tight">{member.name}</span>
                    <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest mt-1">{member.role || member.division}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Section - Modern Organization Chart */}
      <section className="space-y-20 relative px-4">
        <div className="flex flex-col items-center text-center">
          <div className="size-16 bg-[#F2ECF8] rounded-[1.5rem] flex items-center justify-center mb-8 border border-blue-100 shadow-inner">
             <GraduationCap className="size-10 text-[#092C74]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#092C74] tracking-tighter mb-6">Dewan <span className="text-[#E31D1A]">Pengajar</span></h2>
          <p className="text-gray-400 text-sm font-black uppercase tracking-[0.3em]">Bagan Struktur Organisasi Akademik</p>
        </div>

        <div className="flex flex-col items-center space-y-20 max-w-full overflow-hidden">
          {/* Level 1: Ketua - Premium Elite Card */}
          {(() => {
            const ketua = filteredLecturers.find(l => l.roles?.includes('Ketua STT') || l.roles?.includes('Ketua'));
            return (
              <div className="flex flex-col items-center w-full">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-[#092C74] via-[#4B0082] to-[#092C74] text-white p-12 rounded-[2.50rem] shadow-[0_50px_100px_rgba(9,44,116,0.2)] w-full max-w-[450px] text-center relative z-10 overflow-hidden border border-white/10"
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                  <span className="text-[10px] block bg-white text-[#092C74] px-5 py-1.5 rounded-full font-black uppercase tracking-widest mb-6 w-fit mx-auto shadow-xl">Ketua STTB</span>
                  <h4 className="font-black text-3xl md:text-4xl leading-tight mb-4 tracking-tighter">{ketua?.lecturerName || 'Pdt. Dr. Senior'}</h4>
                  <p className="text-[#6AACE6] text-xs font-black uppercase tracking-[0.2em]">{ketua?.degrees?.join(', ') || 'Th.M., Ph.D.'}</p>
                </motion.div>
                <div className="h-20 w-[2px] bg-gradient-to-b from-[#092C74] to-transparent" />
              </div>
            );
          })()}

          {/* Level 2: Wakil Ketua - Glass Grid */}
          {(() => {
            const wakilKetua = filteredLecturers.filter(l =>
              l.roles?.some((r: string) => r.toLowerCase().startsWith('wakil ketua'))
            );
            if (wakilKetua.length === 0) {
              return null;
            }
            return (
              <div className="flex flex-col items-center w-full relative">
                <div className="hidden lg:block absolute top-0 left-[20%] right-[20%] h-[2px] bg-gray-100 -z-10" />
                <div className="flex flex-wrap justify-center gap-12 w-full">
                  {wakilKetua.map((item: any, i: number) => {
                    const roleLabel = item.roles?.find((r: string) => r.toLowerCase().startsWith('wakil ketua')) || 'Wakil Ketua';
                    return (
                      <div key={i} className="flex flex-col items-center">
                        <div className="hidden lg:block h-10 w-[2px] bg-gray-100" />
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          className="backdrop-blur-xl bg-white/70 border-2 border-gray-50 text-[#092C74] p-8 rounded-[2rem] shadow-xl w-[320px] text-center"
                        >
                          <span className="text-[10px] block text-[#E31D1A] font-black uppercase mb-4 tracking-widest">{roleLabel}</span>
                          <h5 className="font-black text-xl mb-4 tracking-tight">{item.lecturerName}</h5>
                          <div className="h-1 w-10 bg-gray-100 mx-auto rounded-full" />
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
                <div className="h-20 w-[2px] bg-gray-100" />
              </div>
            );
          })()}

          {/* Level 3: Kaprodi - Minimalist Glass */}
          {(() => {
            const kaprodi = filteredLecturers.filter(l =>
              l.roles?.some((r: string) => r.toLowerCase().startsWith('kaprodi'))
            );
            if (kaprodi.length === 0) {
              return null;
            }
            return (
              <div className="flex flex-col items-center w-full">
                <div className="flex flex-wrap justify-center gap-6 relative px-4 z-10">
                  {kaprodi.map((item: any, i: number) => {
                    const roleLabel = item.roles?.find((r: string) => r.toLowerCase().startsWith('kaprodi')) || 'Kaprodi';
                    return (
                      <motion.div 
                        key={i} 
                        whileHover={{ y: -5 }}
                        className="bg-white/80 border border-gray-100 p-6 rounded-3xl shadow-md w-52 text-center flex flex-col items-center justify-center hover:shadow-xl transition-all duration-500"
                      >
                        <span className="text-[9px] block text-[#092C74] font-black uppercase mb-3 tracking-widest">{roleLabel}</span>
                        <h5 className="font-bold text-sm text-gray-800 leading-tight">{item.lecturerName}</h5>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* Level 4: Full Faculty Grid */}
          <div className="w-full max-w-7xl pt-20">
            <div className="backdrop-blur-md bg-gray-50/30 p-12 md:p-16 rounded-[4rem] border border-white/50">
              <div className="text-center mb-16">
                <span className="px-5 py-2 bg-[#092C74] text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">Jajaran Dosen</span>
                <h4 className="font-black text-3xl text-[#092C74] mt-6 tracking-tight">Dosen Tetap & Luar Biasa</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredLecturers.map((lecturer, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.02 }}
                    className="bg-white p-7 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-700 border border-white flex flex-col items-center text-center group"
                  >
                    <div className="size-16 bg-[#F2ECF8] rounded-2xl flex items-center justify-center text-[#092C74] mb-6 group-hover:bg-[#E31D1A] group-hover:text-white transition-colors duration-500">
                       <GraduationCap className="size-8" />
                    </div>
                    <h5 className="font-black text-lg text-[#092C74] tracking-tight mb-3 px-2 leading-tight">{lecturer.lecturerName}</h5>
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      {lecturer.roles?.map((role: string, ri: number) => (
                        <span key={ri} className="text-[8px] bg-gray-50 text-gray-400 px-3 py-1 rounded-full uppercase font-black tracking-widest">{role}</span>
                      ))}
                    </div>
                    <div className="mt-auto pt-4 border-t border-gray-50 w-full">
                       <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{lecturer.degrees?.join(', ')}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-gradient-to-r from-[#092C74] to-[#4B0082] p-12 md:p-20 rounded-[4rem] text-center text-white relative overflow-hidden shadow-2xl mx-4">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
         <h3 className="text-3xl md:text-4xl font-black mb-6 relative z-10 leading-tight">Berkomitmen Mencetak <br /> Pemimpin Masa Depan</h3>
         <p className="text-white/60 text-lg font-medium max-w-2xl mx-auto mb-10 relative z-10">Seluruh jajaran pengajar STTB merupakan ahli dalam bidang teologi dengan pengalaman akademis dan pelayanan yang mendalam.</p>
         <button className="h-16 px-12 bg-[#E31D1A] hover:bg-white hover:text-[#092C74] text-white font-black text-sm rounded-2xl shadow-2xl transition-all duration-500 uppercase tracking-widest relative z-10">
            Jadwal Kuliah Umum <ChevronRight className="inline-block ml-2 size-5" />
         </button>
      </div>
    </motion.div>
  );
}
