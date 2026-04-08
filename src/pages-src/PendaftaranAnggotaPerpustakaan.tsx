'use client';

import { motion } from 'motion/react';
import { BookOpen, Send, User, Calendar, Home, Phone, Mail, FileText, Camera, CheckCircle2, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { dataService } from '@/lib/data-service';

const bgHeader = "/assets/header-faq.png";
const bgPattern = "/assets/background.webp";

export function PendaftaranAnggotaPerpustakaan() {
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    institutionName: '',
    contact: '',
    address: '',
    email: '',
    passportImage: null as File | null,
    idImage: null as File | null,
    proofOfDepositImage: null as File | null,
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const data = new FormData();
      
      // Strict mapping to backend contract
      data.append('FullName', formData.fullName);
      data.append('DOB', formData.dob); // HTML date input is YYYY-MM-DD
      data.append('InstitutionName', formData.institutionName);
      data.append('Contact', formData.contact);
      data.append('Address', formData.address);
      data.append('Email', formData.email);
      
      if (formData.passportImage) data.append('PassportImage', formData.passportImage);
      if (formData.idImage) data.append('IdImage', formData.idImage);
      if (formData.proofOfDepositImage) data.append('ProofOfDepositImage', formData.proofOfDepositImage);

      // Log the payload for debugging before sending
      console.log('--- Library Submission Payload ---');
      for (let pair of (data as any).entries()) {
        console.log(pair[0] + ': ' + (pair[1] instanceof File ? `File: ${pair[1].name}` : pair[1]));
      }

      await dataService.addLibraryMember(data);
      setStatus({ 
        type: 'success', 
        message: 'Pendaftaran berhasil! Silakan hubungi petugas perpustakaan untuk langkah selanjutnya.' 
      });
      setFormData({
        fullName: '',
        dob: '',
        institutionName: '',
        contact: '',
        address: '',
        email: '',
        passportImage: null as File | null,
        idImage: null as File | null,
        proofOfDepositImage: null as File | null,
      });
    } catch (error: any) {
      const errorMessage = error.errors 
        ? Object.values(error.errors).flat().join(', ') 
        : (error.message || 'Terjadi kesalahan saat mengirim pendaftaran. Silakan coba lagi.');
      setStatus({ type: 'error', message: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      {/* Premium Hero Section - Registration */}
      <section className="relative h-[550px] md:h-[650px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={bgHeader} alt="Pendaftaran Anggota Perpustakaan" className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#082F49]/95 via-[#075985]/45 to-transparent z-10" />
          
          <div className="absolute bottom-1/4 -right-20 size-[500px] bg-[#6AACE6]/10 blur-[120px] rounded-full animate-pulse" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center z-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="backdrop-blur-md bg-white/5 border border-white/10 p-10 md:p-20 rounded-[40px] shadow-2xl relative overflow-hidden group"
            >
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E31D1A] rounded-full text-white text-xs font-black uppercase tracking-widest mb-8 shadow-lg shadow-red-500/30"
                >
                   <BookOpen className="size-3" /> Library Access
                </motion.div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 drop-shadow-2xl tracking-tighter leading-[0.95]">
                  Registrasi <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6AACE6] via-[#A855F7] to-[#E31D1A]">Anggota Perpus</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl leading-relaxed">
                  Bergabunglah sebagai anggota untuk mengakses koleksi literatur teologi terlengkap dan layanan riset akademik di STT Bandung.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Form Section with Modern PhI Spacing */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-3xl rounded-[4rem] p-8 md:p-24 shadow-[0_50px_100px_rgba(9,44,116,0.1)] border border-white/20 relative">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
              <Layers className="size-96" />
            </div>

            <div className="mb-20 text-center relative z-10">
              <span className="text-[#E31D1A] font-black tracking-widest text-sm uppercase mb-4 block">Application Form</span>
              <h2 className="text-4xl md:text-5xl font-black text-[#092C74] mb-6 tracking-tight">Formulir Pendaftaran</h2>
              <div className="w-24 h-2 bg-gradient-to-r from-[#092C74] via-[#6AACE6] to-[#E31D1A] mx-auto rounded-full mb-10" />
              <p className="text-xl text-gray-500 font-medium max-w-md mx-auto leading-relaxed italic">Lengkapi data diri Anda di bawah ini dengan benar untuk pengajuan keanggotaan.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
              {status.type && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-8 rounded-3xl flex items-center gap-6 text-xl font-bold shadow-2xl ${
                    status.type === 'success' 
                      ? 'bg-green-50 text-green-700 border-2 border-green-200' 
                      : 'bg-red-50 text-red-700 border-2 border-red-200'
                  }`}
                >
                  {status.type === 'success' ? <CheckCircle2 className="size-10 shrink-0" /> : <Send className="size-10 shrink-0" />}
                  {status.message}
                </motion.div>
              )}

              <div className="grid md:grid-cols-2 gap-10">
                {/* Full Name */}
                <div className="space-y-4">
                  <label className="text-xs font-black text-[#092C74] tracking-[0.2em] uppercase flex items-center gap-3">
                    <div className="size-2 bg-[#E31D1A] rounded-full" /> Nama Lengkap
                  </label>
                  <Input 
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={handleChange} 
                    placeholder="Contoh: Dr. John Doe" 
                    className="h-16 bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-4 focus:ring-[#092C74]/5 rounded-[1.5rem] transition-all text-lg font-bold px-8" 
                    required 
                  />
                </div>

                {/* DOB */}
                <div className="space-y-4">
                  <label className="text-xs font-black text-[#092C74] tracking-[0.2em] uppercase flex items-center gap-3">
                    <div className="size-2 bg-[#E31D1A] rounded-full" /> Tanggal Lahir
                  </label>
                  <Input 
                    name="dob" 
                    type="date"
                    value={formData.dob} 
                    onChange={handleChange} 
                    className="h-16 bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-4 focus:ring-[#092C74]/5 rounded-[1.5rem] transition-all text-lg font-bold px-8" 
                    required 
                  />
                </div>

                {/* Institution Name */}
                <div className="space-y-4">
                  <label className="text-xs font-black text-[#092C74] tracking-[0.2em] uppercase flex items-center gap-3">
                    <div className="size-2 bg-[#E31D1A] rounded-full" /> Nama Institusi
                  </label>
                  <Input 
                    name="institutionName" 
                    value={formData.institutionName} 
                    onChange={handleChange} 
                    placeholder="Gereja / Sekolah / Universitas" 
                    className="h-16 bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-4 focus:ring-[#092C74]/5 rounded-[1.5rem] transition-all text-lg font-bold px-8" 
                    required 
                  />
                </div>

                {/* Contact */}
                <div className="space-y-4">
                  <label className="text-xs font-black text-[#092C74] tracking-[0.2em] uppercase flex items-center gap-3">
                    <div className="size-2 bg-[#E31D1A] rounded-full" /> Nomor Telepon / WA
                  </label>
                  <Input 
                    name="contact" 
                    value={formData.contact} 
                    onChange={handleChange} 
                    placeholder="0812xxxxxxxx" 
                    className="h-16 bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-4 focus:ring-[#092C74]/5 rounded-[1.5rem] transition-all text-lg font-bold px-8" 
                    required 
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-4">
                <label className="text-xs font-black text-[#092C74] tracking-[0.2em] uppercase flex items-center gap-3">
                  <div className="size-2 bg-[#E31D1A] rounded-full" /> Alamat Email
                </label>
                <Input 
                  name="email" 
                  type="email"
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="name@example.com" 
                  className="h-16 bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-4 focus:ring-[#092C74]/5 rounded-[1.5rem] transition-all text-lg font-bold px-8" 
                  required 
                />
              </div>

              {/* Address */}
              <div className="space-y-4">
                <label className="text-xs font-black text-[#092C74] tracking-[0.2em] uppercase flex items-center gap-3">
                  <div className="size-2 bg-[#E31D1A] rounded-full" /> Alamat Domisili
                </label>
                <Textarea 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange} 
                  placeholder="Jl. Nama Jalan No. XX, Kota, Provinsi" 
                  className="min-h-[160px] bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-4 focus:ring-[#092C74]/5 rounded-[2rem] transition-all text-lg font-bold p-8" 
                  required 
                />
              </div>

              {/* File Uploads - Grid with PhI Balance */}
              <div className="grid md:grid-cols-3 gap-8 pt-6">
                {[
                  { name: 'passportImage', label: 'Foto Paspor (2x3/3x4)', icon: Camera },
                  { name: 'idImage', label: 'Scan KTP / Kartu Identitas', icon: Camera },
                  { name: 'proofOfDepositImage', label: 'Bukti Deposit (Opsional)', icon: Camera },
                ].map((field) => (
                  <div key={field.name} className="space-y-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">{field.label}</label>
                    <div className="relative group">
                      <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-200 rounded-[2rem] cursor-pointer bg-gray-50/50 hover:bg-white hover:border-[#092C74] transition-all duration-500 group-hover:shadow-2xl">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                          <div className="size-14 bg-[#F5F3FB] group-hover:bg-[#092C74] rounded-2xl flex items-center justify-center mb-4 transition-colors duration-500 shadow-inner">
                            <field.icon className="size-6 text-gray-400 group-hover:text-white transition-colors" />
                          </div>
                          <p className="text-[10px] text-gray-500 font-black uppercase px-6 leading-tight tracking-widest">
                            {(formData as any)[field.name] ? (formData as any)[field.name].name : 'Pilih File'}
                          </p>
                        </div>
                        <input name={field.name} type="file" className="hidden" onChange={handleChange} accept="image/*" />
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-12">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-24 bg-[#092C74] hover:bg-[#E31D1A] text-white font-black text-2xl rounded-[2rem] shadow-2xl transition-all duration-500 hover:-translate-y-2 flex items-center justify-center gap-6 disabled:opacity-50 uppercase tracking-widest"
                >
                  {isSubmitting ? (
                    'Sedang Mengirim...'
                  ) : (
                    <>
                      Kirim Pendaftaran <Send className="size-8" />
                    </>
                  )}
                </Button>
                <p className="text-center text-gray-400 mt-10 text-sm font-medium italic opacity-80">
                  *Dengan menekan tombol di atas, Anda menyetujui syarat & ketentuan keanggotaan Perpustakaan STT Bandung.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
