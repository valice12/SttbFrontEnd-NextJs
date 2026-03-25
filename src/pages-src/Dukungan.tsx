'use client';

import { motion } from 'motion/react';
import { Heart, Award, BookOpen, Settings, Send, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { dataService } from '@/lib/data-service';

const bgHeader = "/assets/header-faq.png";
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
      
      // Send both old and new naming conventions
      data.append('Amount', formData.donationAmount.toString());
      data.append('DonationAmount', formData.donationAmount.toString());
      
      if (formData.file) {
        data.append('ProofOfDonation', formData.file);
        data.append('ProofOfDonationImage', formData.file);
        data.append('ProofOfSupport', 'true');
      } else {
        data.append('ProofOfSupport', 'false');
      }
      
      if (formData.donationArea === 'beasiswa') {
        if (formData.studentName) data.append('StudentName', formData.studentName);
        if (formData.academicProgramId) data.append('AcademicProgramId', formData.academicProgramId);
      }

      if (formData.message) {
        data.append('Message', formData.message);
        data.append('message', formData.message); // Some APIs use lowercase
      }

      console.log('Sending robust donation data:', Object.fromEntries((data as any).entries()));
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
      const errorMessage = error.errors 
        ? Object.values(error.errors).flat().join(', ') 
        : (error.message || 'Terjadi kesalahan saat mengirim data. Silakan coba lagi.');
      setStatus({ type: 'error', message: errorMessage });
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
      {/* Hero Section */}
      <section className="relative text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={bgHeader} alt="Dukungan STTB" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#092C74]/85 mix-blend-multiply" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <Heart className="size-16 text-[#E31D1A] mx-auto mb-6 drop-shadow-lg" />
            <h1 className="text-5xl md:text-6xl font-black mb-8 leading-tight">Dukungan Pelayanan & Donasi</h1>
            <p className="text-xl md:text-2xl font-medium text-white/90 leading-relaxed">
              Bergabunglah bersama kami dalam mempersiapkan pelayan Tuhan yang berdampak bagi masyarakat dan kemuliaan Nama-Nya.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Goal Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col md:flex-row shadow-blue-900/10">
            <div className="md:w-2/3 p-10 lg:p-16">
              <h2 className="text-3xl font-black text-[#092C74] mb-8 flex items-center gap-3">
                <span className="w-2 h-10 bg-[#E31D1A] rounded-full inline-block"></span>
                Tujuan Penggalangan Dana
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Kontribusi donatur digunakan untuk menolong STTB melanjutkan amanat Kristus dalam mempersiapkan dan mendidik pelayan-pelayan Tuhan agar berdampak bagi masyarakat. Bantuan dana ditujukan untuk:
              </p>
              <ul className="space-y-6">
                {[
                  "Membantu biaya studi mahasiswa S1 dan S2 yang memiliki kendala finansial.",
                  "Meningkatkan sumber daya dan kualitas pendidik/pendidikan.",
                  "Menunjang dan mengembangkan fasilitas teknologi pembelajaran."
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="size-8 rounded-full bg-blue-50 text-[#092C74] flex items-center justify-center shrink-0 mt-1">
                      <CheckCircle2 className="size-5" />
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/3 bg-[#092C74] p-10 flex flex-col justify-center items-center text-center text-white relative">
              <div className="absolute inset-0 opacity-10 bg-[url('/assets/background.webp')] bg-repeat" />
              <div className="relative z-10">
                <Heart className="size-20 mb-6 text-red-500 animate-pulse" />
                <h3 className="text-2xl font-bold mb-4">Setiap Kontribusi Sangat Berarti</h3>
                <p className="text-white/70 italic text-sm">"Hendaklah masing-masing memberikan menurut kerelaan hatinya..."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#092C74] mb-4">Prioritas Penggunaan Donasi</h2>
            <div className="w-24 h-1.5 bg-[#E31D1A] mx-auto rounded-full" />
            <p className="mt-6 text-gray-600 max-w-2xl mx-auto">STTB mengalokasikan dukungan dana ke dalam tiga pilar utama untuk keberlanjutan misi pendidikan teologi.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* A. Beasiswa */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100 flex flex-col h-full hover:shadow-2xl transition-all duration-300"
            >
              <div className="size-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 border border-red-100 shadow-sm">
                <Award className="size-8 text-[#E31D1A]" />
              </div>
              <h3 className="text-2xl font-black text-[#092C74] mb-4">A. Program Beasiswa</h3>
              <p className="text-sm text-gray-500 mb-6 font-medium italic">STTB memiliki 5 jenis beasiswa bagi mahasiswa S1 maupun S2.</p>
              
              <div className="space-y-6 flex-grow">
                <div>
                  <h4 className="font-bold text-[#092C74] mb-2 uppercase text-xs tracking-widest border-l-4 border-[#E31D1A] pl-3">Syarat Penerima</h4>
                  <p className="text-sm text-gray-600 leading-relaxed pl-4">Diberikan kepada mahasiswa yang sudah menjalani proses belajar hingga semester ke-2 dengan IPK minimal 3,0, serta telah lulus seleksi dan wawancara.</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#092C74] mb-2 uppercase text-xs tracking-widest border-l-4 border-[#E31D1A] pl-3">Cakupan Biaya</h4>
                  <p className="text-sm text-gray-600 leading-relaxed pl-4">Membiayai kebutuhan bulanan, administrasi, buku, serta biaya skripsi dan wisuda.</p>
                </div>
              </div>
              <div className="mt-8 p-4 bg-green-50 rounded-xl border border-green-100 flex items-center gap-3">
                <CheckCircle2 className="size-5 text-green-600 shrink-0" />
                <p className="text-xs font-bold text-green-700">Transparansi: Laporan tahunan diberikan kepada sponsor.</p>
              </div>
            </motion.div>

            {/* B. Perpustakaan Digital */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100 flex flex-col h-full hover:shadow-2xl transition-all duration-300"
            >
              <div className="size-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 border border-blue-100 shadow-sm">
                <BookOpen className="size-8 text-[#092C74]" />
              </div>
              <h3 className="text-2xl font-black text-[#092C74] mb-4">B. Perpustakaan Digital</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Dana digunakan untuk menambah dan memperkaya koleksi buku serta e-book setiap tahun guna menjaga kualitas pendidikan teologi yang baik.
              </p>
              <ul className="space-y-4 text-sm text-gray-700 mb-6">
                <li className="flex items-start gap-2">
                  <div className="size-1.5 bg-[#092C74] rounded-full mt-1.5 shrink-0" />
                  <span>Koleksi sekitar <strong>50.000 buku fisik</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="size-1.5 bg-[#092C74] rounded-full mt-1.5 shrink-0" />
                  <span>Akses layanan <strong>Ebscohost</strong> (E-book)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="size-1.5 bg-[#092C74] rounded-full mt-1.5 shrink-0" />
                  <span>Langganan <strong>ATLA</strong> (E-journal)</span>
                </li>
              </ul>
            </motion.div>

            {/* C. Dukungan Lainnya */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100 flex flex-col h-full hover:shadow-2xl transition-all duration-300"
            >
              <div className="size-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 border border-purple-100 shadow-sm">
                <Settings className="size-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-black text-[#092C74] mb-4">C. Pengembangan Institusi</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6 italic">STTB berinovasi untuk menjawab kebutuhan zaman.</p>
              <ul className="grid grid-cols-1 gap-3">
                {[
                  "Pembangunan infrastruktur.",
                  "Digital ministry & studio rekaman.",
                  "Pembinaan Hamba Tuhan di daerah.",
                  "Seminar & perkuliahan eksternal."
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-purple-50/50 rounded-lg text-sm font-medium text-purple-900 border border-purple-100/50">
                    <CheckCircle2 className="size-4 shrink-0" />
                    {item}
                  </div>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Donation Info & Form */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: Account Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black text-[#092C74] mb-8">Cara Berdonasi</h2>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                Untuk menjadi donatur atau sponsor, silakan isi formulir di samping dan lakukan transfer ke rekening resmi STTB berikut.
              </p>

              <div className="bg-[#092C74] rounded-3xl p-8 md:p-10 text-white shadow-2xl relative overflow-hidden mb-12 group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-110" />
                <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div className="text-3xl font-black tracking-widest italic opacity-60">BCA</div>
                      <CheckCircle2 className="size-8 text-[#6AACE6]" />
                    </div>
                    <div className="mb-8">
                      <p className="text-sm text-white/60 mb-1 uppercase tracking-widest font-bold">Nomor Rekening</p>
                      <div className="text-2xl md:text-3xl font-black letter-spacing-[0.1em]">282 300 5555</div>
                    </div>
                    <div>
                      <p className="text-sm text-white/60 mb-1 uppercase tracking-widest font-bold">Atas Nama</p>
                      <p className="text-lg font-bold">Yayasan STT Bandung</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow-xl flex flex-col items-center">
                    <img 
                      src="/assets/QR-Code-Rek-STTB.jpeg" 
                      alt="QR Code Rekening STTB" 
                      className="w-full max-w-[180px] h-auto rounded-lg"
                    />
                    <p className="text-[#092C74] text-xs font-black mt-3 uppercase tracking-widest">Scan QR untuk Donasi</p>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4 relative z-10">
                  <MapPin className="size-5 text-red-400" />
                  <span className="text-sm text-white/70">Cabang Surya Sumantri, Bandung</span>
                </div>
              </div>

              <div className="bg-red-50 p-6 rounded-2xl border-2 border-dashed border-red-200">
                <p className="text-red-900 font-bold flex items-center gap-2 mb-2">
                  <CheckCircle2 className="size-5" /> Catatan Penting
                </p>
                <p className="text-red-800/80 text-sm leading-relaxed">
                  Setelah mengirimkan formulir, Unit Beasiswa/Keuangan STTB akan menghubungi Anda untuk proses tindak lanjut.
                </p>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <Send className="size-6 text-[#1C64E8]" /> Formulir Dukungan
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                {status.type && (
                  <div className={`p-4 rounded-xl text-sm font-medium ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    {status.message}
                  </div>
                )}
                <div className="grid sm:grid-cols-4 gap-6">
                  <div className="space-y-2 col-span-1">
                    <label className="text-sm font-bold text-gray-700 ml-1">Sapaan</label>
                    <select 
                      name="salutation" 
                      value={formData.salutation} 
                      onChange={handleChange}
                      className="w-full h-12 bg-gray-50/50 border border-gray-200 rounded-md px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#1C64E8] focus:bg-white transition-all"
                    >
                      <option value="Sdr.">Sdr.</option>
                      <option value="Bpk.">Bpk.</option>
                      <option value="Ibu">Ibu</option>
                      <option value="Pdt.">Pdt.</option>
                    </select>
                  </div>
                  <div className="space-y-2 col-span-3">
                    <label className="text-sm font-bold text-gray-700 ml-1">Nama Lengkap</label>
                    <Input 
                      name="fullName" 
                      value={formData.fullName} 
                      onChange={handleChange} 
                      placeholder="Contoh: Budi Santoso" 
                      className="bg-gray-50/50 border-gray-200 h-12 focus:bg-white transition-all" 
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">WhatsApp / Telepon</label>
                  <Input 
                    name="phoneNumber" 
                    value={formData.phoneNumber} 
                    onChange={handleChange} 
                    placeholder="0812xxxx" 
                    className="bg-gray-50/50 border-gray-200 h-12 focus:bg-white transition-all" 
                    required 
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
                    <Input 
                      name="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      placeholder="nama@domain.com" 
                      className="bg-gray-50/50 border-gray-200 h-12 focus:bg-white transition-all" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Alamat</label>
                    <Input 
                      name="address" 
                      value={formData.address} 
                      onChange={handleChange} 
                      placeholder="Jl. Raya No. 123" 
                      className="bg-gray-50/50 border-gray-200 h-12 focus:bg-white transition-all" 
                      required 
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Jenis Dukungan</label>
                    <select 
                      name="donationType" 
                      value={formData.donationType} 
                      onChange={handleChange}
                      className="w-full h-12 bg-gray-50/50 border border-gray-200 rounded-md px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#1C64E8] focus:bg-white transition-all"
                    >
                      <option value="sekali_pembayaran">Sekali Pembayaran</option>
                      <option value="perbulan">Hamba Tuhan Commitment (Bulanan)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Area Donasi</label>
                    <select 
                      name="donationArea" 
                      value={formData.donationArea} 
                      onChange={handleChange}
                      className="w-full h-12 bg-gray-50/50 border border-gray-200 rounded-md px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#1C64E8] focus:bg-white transition-all"
                    >
                      <option value="beasiswa">Program Beasiswa</option>
                      <option value="perpustakaan_digital">Perpustakaan Digital</option>
                      <option value="dukungan_sttb">Dukungan Operasional STTB</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Jumlah Donasi (Rupiah)</label>
                  <Input 
                    name="donationAmount" 
                    type="number"
                    value={formData.donationAmount} 
                    onChange={handleChange} 
                    placeholder="Contoh: 1000000" 
                    className="bg-gray-50/50 border-gray-200 h-12 focus:bg-white transition-all" 
                    required 
                    min="1"
                  />
                </div>
                {formData.donationArea === 'beasiswa' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="grid sm:grid-cols-2 gap-6 pt-2"
                  >
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">Nama Mahasiswa (Opsional)</label>
                      <Input 
                        name="studentName" 
                        value={formData.studentName} 
                        onChange={handleChange} 
                        placeholder="Nama mahasiswa penerima" 
                        className="bg-gray-50/50 border-gray-200 h-12 focus:bg-white transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">Program Studi ID (Opsional)</label>
                      <Input 
                        name="academicProgramId" 
                        type="number"
                        value={formData.academicProgramId} 
                        onChange={handleChange} 
                        placeholder="ID Program" 
                        className="bg-gray-50/50 border-gray-200 h-12 focus:bg-white transition-all" 
                      />
                    </div>
                  </motion.div>
                )}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Pesan (Opsional)</label>
                  <Textarea 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    placeholder="Tuliskan pesan atau pertanyaan Anda di sini..." 
                    className="bg-gray-50/50 border-gray-200 min-h-[100px] focus:bg-white transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Upload Bukti Transfer / Dukungan</label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 font-semibold">{formData.file ? formData.file.name : 'Klik untuk upload bukti'}</p>
                        <p className="text-xs text-gray-400">PNG, JPG atau PDF (Maks. 5MB)</p>
                      </div>
                      <input name="file" type="file" className="hidden" onChange={handleChange} accept="image/*,.pdf" />
                    </label>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-14 bg-[#1C64E8] hover:bg-[#092C74] text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Mengirim...' : 'Kirim Formulir Dukungan'}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section className="py-24 bg-[#092C74] text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Informasi Kontak & Pusat Bantuan</h2>
            <p className="text-white/60 text-lg">Ada pertanyaan? Kami siap membantu mengarahkan dukungan Anda.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Email Box */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl">
              <Mail className="size-10 text-[#6AACE6] mb-6" />
              <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">Hubungi via Email</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-white/50 w-24 shrink-0 uppercase tracking-widest">Beasiswa</span>
                  <a href="mailto:beasiswa@sttb.ac.id" className="text-sm font-bold hover:text-[#6AACE6] transition-colors">beasiswa@sttb.ac.id</a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-white/50 w-24 shrink-0 uppercase tracking-widest">Keuangan</span>
                  <a href="mailto:keuangan@sttb.ac.id" className="text-sm font-bold hover:text-[#6AACE6] transition-colors">keuangan@sttb.ac.id</a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-white/50 w-24 shrink-0 uppercase tracking-widest">Official</span>
                  <a href="mailto:official@sttb.ac.id" className="text-sm font-bold hover:text-[#6AACE6] transition-colors">official@sttb.ac.id</a>
                </div>
              </div>
            </div>

            {/* Phone/WA Box */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl">
              <Phone className="size-10 text-green-400 mb-6" />
              <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">Telepon & WhatsApp</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-white/50 w-24 shrink-0 uppercase tracking-widest">Telepon</span>
                  <p className="text-sm font-bold italic">(+62) 22 601-6454</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-white/50 w-24 shrink-0 uppercase tracking-widest">Marketing</span>
                  <a href="https://wa.me/6281573360009" className="text-sm font-bold hover:text-green-400 transition-colors">+62 815 7336 0009</a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-white/50 w-24 shrink-0 uppercase tracking-widest">Finance</span>
                  <a href="https://wa.me/6285183026009" className="text-sm font-bold hover:text-green-400 transition-colors">+62 851-8302-6009</a>
                </div>
              </div>
            </div>

            {/* Address Box */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl lg:col-span-1 md:col-span-2">
              <MapPin className="size-10 text-red-400 mb-6" />
              <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">Lokasi Kampus</h3>
              <p className="text-base text-white/80 leading-relaxed font-medium">
                Jl. Dr. Djunjunan No. 105,<br />
                Bandung 40173,<br />
                Jawa Barat, Indonesia.
              </p>
              <Button className="mt-6 bg-white/10 hover:bg-white/20 border-none px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
                Buka di Google Maps
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
