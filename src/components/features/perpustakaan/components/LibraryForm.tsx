'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, Layers, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { dataService } from '@/lib/data-service';

export function LibraryForm() {
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
      data.append('FullName', formData.fullName);
      data.append('DOB', formData.dob);
      data.append('InstitutionName', formData.institutionName);
      data.append('Contact', formData.contact);
      data.append('Address', formData.address);
      data.append('Email', formData.email);
      
      if (formData.passportImage) data.append('PassportImage', formData.passportImage);
      if (formData.idImage) data.append('IdImage', formData.idImage);
      if (formData.proofOfDepositImage) data.append('ProofOfDepositImage', formData.proofOfDepositImage);

      await dataService.addLibraryMember(data);
      setStatus({ 
        type: 'success', 
        message: 'Pendaftaran berhasil! Silakan hubungi petugas perpustakaan.' 
      });
      setFormData({
        fullName: '', dob: '', institutionName: '', contact: '', address: '', email: '',
        passportImage: null, idImage: null, proofOfDepositImage: null,
      });
    } catch (error: any) {
      const errorMessage = error.errors 
        ? Object.values(error.errors).flat().join(', ') 
        : (error.message || 'Terjadi kesalahan. Silakan coba lagi.');
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
    <section className="py-16 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-3xl rounded-[3rem] md:rounded-[4rem] p-6 md:p-24 shadow-[0_50px_100px_rgba(9,44,116,0.1)] border border-white/20 relative">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none hidden md:block">
            <Layers className="size-96" />
          </div>

          <div className="mb-12 md:mb-20 text-center relative z-10">
            <span className="text-[#E31D1A] font-black tracking-widest text-xs md:text-sm uppercase mb-4 block">Application Form</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#092C74] mb-6 tracking-tight">Formulir Pendaftaran</h2>
            <div className="w-24 h-2 bg-gradient-to-r from-[#092C74] via-[#6AACE6] to-[#E31D1A] mx-auto rounded-full mb-10" />
            <p className="text-lg md:text-xl text-gray-500 font-medium max-w-md mx-auto leading-relaxed italic">Lengkapi data diri Anda di bawah ini dengan benar.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10 md:space-y-12 relative z-10">
            {status.type && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-6 md:p-8 rounded-3xl flex items-center gap-4 md:gap-6 text-lg md:text-xl font-bold shadow-2xl ${
                  status.type === 'success' ? 'bg-green-50 text-green-700 border-2 border-green-200' : 'bg-red-50 text-red-700 border-2 border-red-200'
                }`}
              >
                {status.type === 'success' ? <CheckCircle2 className="size-8 md:size-10 shrink-0" /> : <Send className="size-8 md:size-10 shrink-0" />}
                {status.message}
              </motion.div>
            )}

            <div className="grid md:grid-cols-2 gap-8 md:gap-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-[#092C74] tracking-[0.2em] uppercase flex items-center gap-2">
                  <div className="size-2 bg-[#E31D1A] rounded-full" /> Nama Lengkap
                </label>
                <Input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Dr. John Doe" className="h-14 md:h-16 bg-gray-50/50 rounded-2xl transition-all text-base md:text-lg font-bold px-6" required />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-[#092C74] tracking-[0.2em] uppercase flex items-center gap-2">
                  <div className="size-2 bg-[#E31D1A] rounded-full" /> Tanggal Lahir
                </label>
                <Input name="dob" type="date" value={formData.dob} onChange={handleChange} className="h-14 md:h-16 bg-gray-50/50 rounded-2xl transition-all text-base md:text-lg font-bold px-6" required />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-[#092C74] tracking-[0.2em] uppercase flex items-center gap-2">
                  <div className="size-2 bg-[#E31D1A] rounded-full" /> Institusi
                </label>
                <Input name="institutionName" value={formData.institutionName} onChange={handleChange} placeholder="Gereja / Sekolah" className="h-14 md:h-16 bg-gray-50/50 rounded-2xl transition-all text-base md:text-lg font-bold px-6" required />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-[#092C74] tracking-[0.2em] uppercase flex items-center gap-2">
                  <div className="size-2 bg-[#E31D1A] rounded-full" /> Kontak / WA
                </label>
                <Input name="contact" value={formData.contact} onChange={handleChange} placeholder="0812xxxxxxxx" className="h-14 md:h-16 bg-gray-50/50 rounded-2xl transition-all text-base md:text-lg font-bold px-6" required />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-[#092C74] tracking-[0.2em] uppercase flex items-center gap-2">
                <div className="size-2 bg-[#E31D1A] rounded-full" /> Email
              </label>
              <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" className="h-14 md:h-16 bg-gray-50/50 rounded-2xl transition-all text-base md:text-lg font-bold px-6" required />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-[#092C74] tracking-[0.2em] uppercase flex items-center gap-2">
                <div className="size-2 bg-[#E31D1A] rounded-full" /> Domisili
              </label>
              <Textarea name="address" value={formData.address} onChange={handleChange} placeholder="Jl. Nama Jalan No. XX..." className="min-h-[140px] bg-gray-50/50 rounded-[2rem] transition-all text-base md:text-lg font-bold p-6" required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 pt-6">
              {[
                { name: 'passportImage', label: 'Foto Paspor (2x3/3x4)', icon: Camera },
                { name: 'idImage', label: 'Scan KTP', icon: Camera },
                { name: 'proofOfDepositImage', label: 'Bukti Deposit (Ops)', icon: Camera },
              ].map((field) => (
                <div key={field.name} className="space-y-3">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{field.label}</label>
                  <label className="flex flex-col items-center justify-center w-full h-36 md:h-48 border-2 border-dashed border-gray-200 rounded-[2rem] cursor-pointer bg-gray-50/50 hover:bg-white hover:border-[#092C74] transition-all group">
                    <div className="flex flex-col items-center justify-center text-center p-4">
                      <field.icon className="size-6 md:size-8 text-gray-400 group-hover:text-[#092C74] mb-2 transition-colors" />
                      <p className="text-[9px] text-gray-500 font-black uppercase leading-tight tracking-widest truncate max-w-full">
                        {(formData as any)[field.name] ? (formData as any)[field.name].name : 'Pilih File'}
                      </p>
                    </div>
                    <input name={field.name} type="file" className="hidden" onChange={handleChange} accept="image/*" />
                  </label>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <Button type="submit" disabled={isSubmitting} className="w-full h-20 md:h-24 bg-[#092C74] hover:bg-[#E31D1A] text-white font-black text-xl md:text-2xl rounded-[2rem] shadow-2xl transition-all duration-500 hover:-translate-y-2 flex items-center justify-center gap-4 disabled:opacity-50 uppercase tracking-widest">
                {isSubmitting ? 'Mengirim...' : <>Kirim Pendaftaran <Send className="size-6 md:size-8" /></>}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
