'use client';

import { motion } from 'motion/react';
import { 
  Heart, Award, BookOpen, Settings, Send, Phone, Mail, 
  MapPin, CheckCircle2, ShieldCheck, ChevronRight, QrCode, 
  Landmark, FileText, DollarSign 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { dataService } from '@/lib/data-service';
import Link from 'next/link';
import { FinanceNavbar } from '@/components/features/keuangan/FinanceNavbar';

const bgHeader = "/assets/bg-dukungan.png";
const bgPattern = "/assets/background.webp";

export function Dukungan() {
  const [formData, setFormData] = useState({
    salutation: 'Sdr.',
    fullName: '',
    phoneNumber: '',
    email: '',
    address: '',
    donationType: 'sekali_pembayaran',
    donationArea: 'beasiswa',
    donationAmount: '',
    studentName: '',
    academicProgramId: '',
    message: '',
    file: null as File | null
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file) {
      setStatus({ type: 'error', message: 'Silakan upload bukti transfer.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const nameParts = formData.fullName.trim().split(/\s+/);
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '-';

      const data = new FormData();
      data.append('DonorMemberId', '1'); 
      data.append('Salutation', formData.salutation);
      data.append('FullName', formData.fullName);
      data.append('FirstName', firstName);
      data.append('LastName', lastName);
      data.append('Contact', formData.phoneNumber);
      data.append('Email', formData.email);
      data.append('Address', formData.address);
      data.append('DonationType', formData.donationType);
      data.append('DonationArea', formData.donationArea);
      data.append('Amount', formData.donationAmount.toString());
      data.append('DonationAmount', formData.donationAmount.toString());
      
      if (formData.file) {
        data.append('ProofOfDonation', formData.file);
        data.append('ProofOfDonationImage', formData.file);
        data.append('ProofOfSupport', 'true');
      }
      
      if (formData.donationArea === 'beasiswa') {
        if (formData.studentName) data.append('StudentName', formData.studentName);
        if (formData.academicProgramId) data.append('AcademicProgramId', formData.academicProgramId);
      }

      if (formData.message) {
        data.append('Message', formData.message);
      }

      await dataService.addDonorMember(data);
      setStatus({ type: 'success', message: 'Terima kasih atas dukungan Anda! Data Anda telah berhasil dikirim.' });
      setFormData({
        salutation: 'Sdr.',
        fullName: '',
        phoneNumber: '',
        email: '',
        address: '',
        donationType: 'sekali_pembayaran',
        donationArea: 'beasiswa',
        donationAmount: '',
        studentName: '',
        academicProgramId: '',
        message: '',
        file: null as File | null
      });
    } catch (error: any) {
      setStatus({ type: 'error', message: error.message || 'Terjadi kesalahan saat mengirim data.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: fileInput.files ? fileInput.files[0] : null }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div 
      className="min-h-screen bg-white bg-cover bg-center"
      style={{ backgroundImage: `url(${bgPattern})` }}
    >
      {/* Premium Hero Section - Support */}
      <section className="relative h-[550px] md:h-[650px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={bgHeader} alt="Support Hero" className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#7F1D1D]/95 via-[#9A3412]/45 to-transparent z-10" />
          
          <div className="absolute top-1/2 -right-20 size-[500px] bg-[#E31D1A]/10 blur-[120px] rounded-full animate-pulse" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center z-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="backdrop-blur-md bg-white/5 border border-white/10 p-10 md:p-14 rounded-[40px] shadow-2xl relative overflow-hidden"
            >
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E31D1A] rounded-full text-white text-xs font-black uppercase tracking-widest mb-8 shadow-lg shadow-red-500/30"
                >
                   <Heart className="size-3" /> Partner in Ministry
                </motion.div>

                <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white mb-8 leading-[1.1] tracking-tight drop-shadow-2xl">
                  Dukungan <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6AACE6] via-[#A855F7] to-[#E31D1A]">Pelayanan</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl leading-relaxed">
                  Bermitra bersama STT Bandung dalam mempersiapkan pemimpin kristiani yang kompeten dan berdampak bagi transformasi peradaban.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Navigation Tabs - Centralized */}
      <FinanceNavbar />

      {/* Goal & Mission Section - PHI Layout */}
      <section className="py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto bg-white rounded-[4rem] shadow-[0_60px_120px_rgba(9,44,116,0.06)] border border-gray-100 flex flex-col lg:flex-row relative">
            <div className="absolute top-0 left-0 size-64 bg-[#E31D1A]/5 blur-[80px] rounded-full -ml-32 -mt-32" />
            
            <div className="lg:w-[61.8%] p-10 md:p-20 relative z-10">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-[#F2ECF8] rounded-full text-[#092C74] text-[10px] font-black uppercase tracking-widest mb-10 border border-blue-50 shadow-sm">
                <ShieldCheck className="size-3 text-[#E31D1A]" /> Misi Berkelanjutan
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-[#092C74] mb-12 tracking-tighter leading-tight">
                Tujuan Penggalangan <br /><span className="text-[#E31D1A]">Dana Pelayanan</span>
              </h2>
              <ul className="space-y-10">
                {[
                  "Subsidi Biaya Studi: Mendukung hamba Tuhan terpanggil dari berbagai penjuru tanah air.",
                  "Pengembangan Kapasitas: Meningkatkan kualitas riset dan referensi pustaka teologis.",
                  "Infrastruktur Modern: Menunjang sistem pembelajaran hybrid yang eksklusif."
                ].map((item, idx) => {
                  const [title, desc] = item.split(': ');
                  return (
                    <motion.li 
                      key={idx} 
                      whileHover={{ x: 10 }}
                      className="flex gap-8 group"
                    >
                      <div className="size-14 rounded-[1.25rem] bg-[#092C74]/5 text-[#092C74] flex items-center justify-center shrink-0 border border-[#092C74]/10 shadow-inner group-hover:bg-[#092C74] group-hover:text-white transition-all duration-500">
                        <CheckCircle2 className="size-6" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-black text-[#092C74] mb-2 tracking-tight">{title}</h4>
                        <p className="text-gray-500 font-medium leading-relaxed text-lg italic">{desc}</p>
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
            
            <div className="lg:w-[38.2%] bg-gradient-to-br from-[#061B46] to-[#4B0082] p-10 md:p-16 flex flex-col justify-center items-center text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
              <div className="absolute -bottom-24 -left-24 size-80 bg-white/5 blur-[80px] rounded-full" />
              
              <div className="relative z-10 space-y-10">
                <div className="size-24 bg-white/10 backdrop-blur-xl rounded-[2.5rem] flex items-center justify-center mx-auto border border-white/20 shadow-2xl group transition-transform duration-700 hover:rotate-6">
                   <Heart className="size-12 text-[#E31D1A] animate-pulse" />
                </div>
                <div>
                  <h3 className="text-4xl font-black mb-6 tracking-tight leading-tight">Investasi Abadi</h3>
                  <p className="text-white/60 font-medium leading-relaxed italic text-lg opacity-80">"Hendaklah masing-masing memberikan menurut kerelaan hatinya, jangan dengan sedih hati atau karena paksaan."</p>
                </div>
                <div className="pt-10 border-t border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6AACE6]">Laporan Transparansi Tahunan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section - 3D Glass Panels */}
      <section className="py-24 bg-gray-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black text-[#092C74] mb-8 tracking-tighter">Fokus Dukungan <span className="text-[#E31D1A]">Finansial</span></h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#092C74] via-[#6A0DAD] to-[#E31D1A] mx-auto rounded-full" />
          </div>
 
          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {[
              { title: "Program Beasiswa", icon: Award, desc: "Membiayai pendidikan mahasiwa pilihan.", color: "bg-red-50 text-[#E31D1A] border-red-100" },
              { title: "Digital Library", icon: BookOpen, desc: "Akses literatur teologi global.", color: "bg-blue-50 text-[#092C74] border-blue-100" },
              { title: "Institutional Dev", icon: Settings, desc: "Akselerasi fasilitas kampus.", color: "bg-indigo-50 text-[#4B0082] border-indigo-100" }
            ].map((pilar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="backdrop-blur-xl bg-white/40 border border-white p-12 rounded-[3.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.03)] flex flex-col h-full group transition-all duration-700 hover:shadow-2xl"
              >
                <div className={`size-20 ${pilar.color} rounded-[1.5rem] flex items-center justify-center mb-10 border shadow-inner group-hover:rotate-6 transition-transform duration-500`}>
                  <pilar.icon className="size-10" />
                </div>
                <h3 className="text-3xl font-black text-[#092C74] mb-6 tracking-tight">{pilar.title}</h3>
                <p className="text-lg text-gray-400 font-bold mb-10 leading-relaxed italic border-l-4 border-current pl-6">{pilar.desc}</p>
                <div className="mt-auto flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-[#6A0DAD]">
                   <CheckCircle2 className="size-4" /> Comprehensive Oversight
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Flow & Form - Modern Glass Style */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-start max-w-7xl mx-auto">
            {/* Left: Account Info - Premium Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-[#092C74] mb-10 tracking-tighter">Prosedur <span className="text-[#E31D1A]">Donasi</span></h2>
              <p className="text-xl text-gray-500 font-medium mb-12 leading-relaxed">
                Salurkan dukungan Anda melalui rekening resmi Yayasan Pendidikan Teologi Bandung untuk akuntabilitas yang terjamin.
              </p>

              <div className="bg-gradient-to-br from-[#092C74] to-[#061B46] rounded-[4rem] p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden mb-16 group border border-white/10 group">
                <div className="absolute top-0 right-0 size-96 bg-white/5 blur-[100px] rounded-full -mr-32 -mt-32" />
                
                <div className="relative z-10 space-y-16">
                  <div className="flex justify-between items-center">
                    <div className="text-5xl font-black italic text-[#6AACE6] flex items-center gap-4">
                      BCA <span className="text-xs not-italic font-black uppercase tracking-[0.4em] text-white/30 ml-4">Official</span>
                    </div>
                    <Landmark className="size-10 text-white/20" />
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-black">Account Number</p>
                    <div className="text-5xl md:text-6xl font-black tracking-widest text-white drop-shadow-2xl">282 300 5555</div>
                  </div>
                  
                  <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-black mb-4">Account Holder</p>
                    <p className="text-2xl font-black tracking-tight text-[#6AACE6]">Yayasan Pendidikan Teologi Bandung</p>
                  </div>
                  
                  <div className="backdrop-blur-xl bg-white p-10 rounded-[3rem] shadow-2xl flex flex-col items-center group-hover:rotate-1 transition-transform duration-700">
                    <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 mb-6 w-full max-w-[280px]">
                      <img 
                        src="/assets/QR-Code-Rek-STTB.jpeg" 
                        alt="QR Code Rekening STTB" 
                        className="w-full aspect-square object-cover rounded-xl transition-all duration-700"
                      />
                    </div>
                    <p className="text-[#092C74] text-[10px] font-black uppercase tracking-[0.3em]">Quick Scan Donation</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#F2ECF8] p-10 rounded-[2.5rem] border-2 border-dashed border-[#092C74]/20">
                <div className="flex items-center gap-4 mb-4">
                  <CheckCircle2 className="size-6 text-[#E31D1A]" />
                  <span className="text-xl font-black text-[#092C74]">Konfirmasi Otomatis</span>
                </div>
                <p className="text-gray-500 font-medium leading-relaxed">
                  Setelah melakukan transfer, silakan lampirkan bukti pembayaran melalui formulir di samping untuk pendataan administrasi yang rapi.
                </p>
              </div>
            </motion.div>

            {/* Right: Modern Support Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="backdrop-blur-xl bg-white/40 border-2 border-white p-10 md:p-16 rounded-[4rem] shadow-[0_60px_120px_rgba(0,0,0,0.06)] h-full"
            >
              <div className="flex items-center gap-6 mb-16">
                <div className="size-16 rounded-[1.5rem] bg-[#092C74] flex items-center justify-center shadow-xl text-white">
                  <Send className="size-8" />
                </div>
                <div>
                   <h3 className="text-4xl font-black text-[#092C74] tracking-tighter">Formulir Dukungan</h3>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">Digital Partnership Portal</p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                {status.type && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-6 rounded-2xl text-sm font-black uppercase tracking-widest ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}
                  >
                    {status.message}
                  </motion.div>
                )}
                
                <div className="grid sm:grid-cols-4 gap-6">
                  <select 
                    name="salutation" 
                    value={formData.salutation} 
                    onChange={handleChange}
                    className="col-span-1 h-16 bg-white border border-gray-100 rounded-2xl px-6 text-sm font-black text-[#092C74] focus:ring-2 focus:ring-[#092C74]/10 outline-none shadow-sm"
                  >
                    <option value="Sdr.">SDR.</option>
                    <option value="Bpk.">BPK.</option>
                    <option value="Ibu">IBU</option>
                    <option value="Pdt.">PDT.</option>
                  </select>
                  <Input 
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={handleChange} 
                    placeholder="NAMA LENGKAP DONATUR" 
                    className="col-span-3 h-16 bg-white border-gray-100 rounded-2xl px-8 font-black text-[#092C74] placeholder:text-gray-300 focus:bg-white transition-all uppercase text-[11px] tracking-widest" 
                    required 
                  />
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <Input 
                    name="phoneNumber" 
                    value={formData.phoneNumber} 
                    onChange={handleChange} 
                    placeholder="WHATSAPP / TELEPON" 
                    className="h-16 bg-white border-gray-100 rounded-2xl px-8 font-black text-[#092C74] placeholder:text-gray-300 focus:bg-white transition-all uppercase text-[11px] tracking-widest" 
                    required 
                  />
                  <Input 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="ALAMAT EMAIL RESMI" 
                    className="h-16 bg-white border-gray-100 rounded-2xl px-8 font-black text-[#092C74] placeholder:text-gray-300 focus:bg-white transition-all uppercase text-[11px] tracking-widest" 
                    required 
                  />
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <select 
                    name="donationType" 
                    value={formData.donationType} 
                    onChange={handleChange}
                    className="h-16 bg-white border border-gray-100 rounded-2xl px-8 text-[11px] font-black text-[#092C74] focus:ring-2 focus:ring-[#092C74]/10 outline-none shadow-sm uppercase tracking-widest"
                  >
                    <option value="sekali_pembayaran">SEKALI PEMBAYARAN</option>
                    <option value="perbulan">H.T COMMITMENT (BULANAN)</option>
                  </select>
                  <select 
                    name="donationArea" 
                    value={formData.donationArea} 
                    onChange={handleChange}
                    className="h-16 bg-white border border-gray-100 rounded-2xl px-8 text-[11px] font-black text-[#092C74] focus:ring-2 focus:ring-[#092C74]/10 outline-none shadow-sm uppercase tracking-widest"
                  >
                    <option value="beasiswa">PROGRAM BEASISWA</option>
                    <option value="perpustakaan_digital">LIBRARY DIGITAL</option>
                    <option value="dukungan_sttb">OPERASIONAL STTB</option>
                  </select>
                </div>
                
                <Input 
                  name="donationAmount" 
                  type="number"
                  value={formData.donationAmount} 
                  onChange={handleChange} 
                  placeholder="JUMLAH DONASI (CONTOH: 1000000)" 
                  className="h-16 bg-white border-gray-100 rounded-2xl px-8 font-black text-[#092C74] placeholder:text-gray-300 focus:bg-white transition-all uppercase text-[11px] tracking-widest" 
                  required 
                />
                
                <Textarea 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  placeholder="TULIS PESAN ATAU KERINDUAN PELAYANAN ANDA..." 
                  className="bg-white border-gray-100 min-h-[120px] rounded-3xl p-8 font-black text-[#092C74] placeholder:text-gray-300 uppercase text-[11px] tracking-widest" 
                />
                
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Bukti Transfer (Format Gambar/PDF)</label>
                  <label className="flex flex-col items-center justify-center w-full h-40 border-4 border-gray-100 border-dashed rounded-[2.5rem] cursor-pointer bg-white/50 hover:bg-white transition-all group/upload">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <QrCode className="size-10 mb-4 text-gray-300 group-hover/upload:text-[#E31D1A] transition-colors" />
                      <p className="mb-2 text-xs text-gray-500 font-black uppercase tracking-widest">{formData.file ? formData.file.name : 'PILIH BUKTI TRANSFER'}</p>
                    </div>
                    <input name="file" type="file" className="hidden" onChange={handleChange} accept="image/*,.pdf" />
                  </label>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-20 bg-[#092C74] hover:bg-[#E31D1A] text-white font-black text-xl rounded-[2rem] shadow-2xl transition-all duration-500 hover:-translate-y-2 disabled:opacity-50 uppercase tracking-[0.2em]"
                >
                  {isSubmitting ? 'MEMPROSES...' : 'Kirim Dukungan'}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modern Contacts Section */}
      <section className="py-32 bg-[#061B46] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">Hubungi Kami</h2>
            <div className="w-20 h-1 bg-[#E31D1A] mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {[
              { icon: Mail, title: "Official Email", list: ["beasiswa@sttb.ac.id", "keuangan@sttb.ac.id"], color: "text-[#6AACE6]" },
              { icon: Phone, title: "Direct Contact", list: ["(+62) 22 601-6454", "WA: +62 815 7336 0009"], color: "text-green-400" },
              { icon: MapPin, title: "Campus Location", list: ["Jl. Dr. Djunjunan No. 105", "Bandung 40173, Indonesia"], color: "text-red-400" }
            ].map((box, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="backdrop-blur-xl bg-white/5 border border-white/10 p-12 rounded-[3.5rem] group"
              >
                <box.icon className={`size-12 ${box.color} mb-10 group-hover:scale-110 transition-transform`} />
                <h3 className="text-2xl font-black mb-8 pb-4 border-b border-white/5">{box.title}</h3>
                <div className="space-y-4">
                   {box.list.map((l, li) => (
                     <p key={li} className="text-lg font-bold text-white/60 group-hover:text-white transition-colors">{l}</p>
                   ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
