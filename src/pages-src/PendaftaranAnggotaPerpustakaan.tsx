'use client';

import { motion } from 'motion/react';
import { BookOpen, Send, User, Calendar, Home, Phone, Mail, FileText, Camera, CheckCircle2 } from 'lucide-react';
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
      {/* Hero Section */}
      <section className="relative text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={bgHeader} alt="Pendaftaran Anggota Perpustakaan" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#092C74]/85 mix-blend-multiply" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <BookOpen className="size-16 text-yellow-500 mx-auto mb-6 drop-shadow-lg" />
            <h1 className="text-5xl md:text-6xl font-black mb-8 leading-tight text-white drop-shadow-md">
                Pendaftaran Anggota Perpustakaan
            </h1>
            <p className="text-xl md:text-2xl font-medium text-white/90 leading-relaxed">
              Bergabunglah sebagai anggota untuk mengakses koleksi literatur teologi terlengkap di STT Bandung.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl rounded-[3rem] p-8 md:p-16 shadow-2xl border border-white/20">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-black text-[#092C74] mb-4">Formulir Pendaftaran</h2>
              <div className="w-20 h-1.5 bg-[#E31D1A] mx-auto rounded-full mb-6" />
              <p className="text-gray-600 max-w-md mx-auto">Lengkapi data diri Anda di bawah ini dengan benar untuk pengajuan keanggotaan.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {status.type && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-6 rounded-2xl flex items-center gap-4 text-lg font-bold shadow-sm ${
                    status.type === 'success' 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {status.type === 'success' ? <CheckCircle2 className="size-6 shrink-0" /> : <Send className="size-6 shrink-0" />}
                  {status.message}
                </motion.div>
              )}

              <div className="grid md:grid-cols-2 gap-8">
                {/* Full Name */}
                <div className="space-y-3">
                  <label className="text-sm font-black text-gray-700 tracking-wider uppercase flex items-center gap-2">
                    <User className="size-4 text-[#092C74]" /> Nama Lengkap
                  </label>
                  <Input 
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={handleChange} 
                    placeholder="Contoh: Dr. John Doe" 
                    className="h-14 bg-gray-50/50 border-gray-200 focus:bg-white rounded-xl transition-all text-lg font-medium" 
                    required 
                  />
                </div>

                {/* DOB */}
                <div className="space-y-3">
                  <label className="text-sm font-black text-gray-700 tracking-wider uppercase flex items-center gap-2">
                    <Calendar className="size-4 text-[#092C74]" /> Tanggal Lahir
                  </label>
                  <Input 
                    name="dob" 
                    type="date"
                    value={formData.dob} 
                    onChange={handleChange} 
                    className="h-14 bg-gray-50/50 border-gray-200 focus:bg-white rounded-xl transition-all text-lg font-medium" 
                    required 
                  />
                </div>

                {/* Institution Name */}
                <div className="space-y-3">
                  <label className="text-sm font-black text-gray-700 tracking-wider uppercase flex items-center gap-2">
                    <Home className="size-4 text-[#092C74]" /> Nama Institusi
                  </label>
                  <Input 
                    name="institutionName" 
                    value={formData.institutionName} 
                    onChange={handleChange} 
                    placeholder="Gereja / Sekolah / Universitas" 
                    className="h-14 bg-gray-50/50 border-gray-200 focus:bg-white rounded-xl transition-all text-lg font-medium" 
                    required 
                  />
                </div>

                {/* Contact */}
                <div className="space-y-3">
                  <label className="text-sm font-black text-gray-700 tracking-wider uppercase flex items-center gap-2">
                    <Phone className="size-4 text-[#092C74]" /> Nomor Telepon / WA
                  </label>
                  <Input 
                    name="contact" 
                    value={formData.contact} 
                    onChange={handleChange} 
                    placeholder="0812xxxxxxxx" 
                    className="h-14 bg-gray-50/50 border-gray-200 focus:bg-white rounded-xl transition-all text-lg font-medium" 
                    required 
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-3">
                <label className="text-sm font-black text-gray-700 tracking-wider uppercase flex items-center gap-2">
                  <Mail className="size-4 text-[#092C74]" /> Alamat Email
                </label>
                <Input 
                  name="email" 
                  type="email"
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="name@example.com" 
                  className="h-14 bg-gray-50/50 border-gray-200 focus:bg-white rounded-xl transition-all text-lg font-medium" 
                  required 
                />
              </div>

              {/* Address */}
              <div className="space-y-3">
                <label className="text-sm font-black text-gray-700 tracking-wider uppercase flex items-center gap-2">
                  <FileText className="size-4 text-[#092C74]" /> Alamat Domisili
                </label>
                <Textarea 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange} 
                  placeholder="Jl. Nama Jalan No. XX, Kota, Provinsi" 
                  className="min-h-[120px] bg-gray-50/50 border-gray-200 focus:bg-white rounded-xl transition-all text-lg font-medium p-6" 
                  required 
                />
              </div>

              {/* File Uploads */}
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { name: 'passportImage', label: 'Foto Paspor (2x3/3x4)', icon: Camera },
                  { name: 'idImage', label: 'Scan KTP / Kartu Identitas', icon: Camera },
                  { name: 'proofOfDepositImage', label: 'Bukti Deposit (Opsional)', icon: Camera },
                ].map((field) => (
                  <div key={field.name} className="space-y-3">
                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest">{field.label}</label>
                    <div className="relative group">
                      <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50/50 hover:bg-white hover:border-[#092C74] transition-all group-hover:shadow-lg">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                          <field.icon className="size-8 text-gray-400 group-hover:text-[#092C74] mb-3 transition-colors" />
                          <p className="text-xs text-gray-500 font-bold px-4 leading-tight">
                            {(formData as any)[field.name] ? (formData as any)[field.name].name : 'Pilih File'}
                          </p>
                        </div>
                        <input name={field.name} type="file" className="hidden" onChange={handleChange} accept="image/*" />
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-20 bg-[#092C74] hover:bg-[#E31D1A] text-white font-black text-2xl rounded-2xl shadow-2xl transition-all hover:-translate-y-2 flex items-center justify-center gap-4 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    'Sedang Mengirim...'
                  ) : (
                    <>
                      Kirim Pendaftaran <Send className="size-6" />
                    </>
                  )}
                </Button>
                <p className="text-center text-gray-400 mt-6 text-sm font-medium italic">
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
