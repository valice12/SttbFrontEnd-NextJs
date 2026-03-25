'use client';

import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
const imgMapsintegration = "/assets/maps.png";
const imgBlueprintBackground = "/assets/background-reversed.webp";
const bgHeader = "/assets/sttb-3-BG.png";

export function Contact() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] text-white overflow-hidden border-b">
        <div className="absolute inset-0">
          <img src={bgHeader} alt="Kontak" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#003049]/80 mix-blend-multiply" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold mb-4">Hubungi Kami</h1>
            <p className="text-xl">Kami siap membantu Anda</p>
          </motion.div>
        </div>
      </section>

      {/* Bagian Kontak & Form dengan Background Blueprint */}
      <section
        className="py-20 relative"
        style={{
          backgroundImage: `url(${imgBlueprintBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          // backgroundAttachment: 'fixed' telah dihapus agar ikut ter-scroll
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-sm h-fit"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Informasi Kontak</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#1C64E8] rounded-lg">
                    <MapPin className="size-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Alamat</h3>
                    <p className="text-gray-600">
                      Jl. Teologia No. 123<br />
                      Jakarta Selatan 12345<br />
                      Indonesia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#E52325] rounded-lg">
                    <Phone className="size-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Telepon</h3>
                    <p className="text-gray-600">
                      +62 21 1234 5678<br />
                      WhatsApp: +62 812 3456 7890
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#9F195D] rounded-lg">
                    <Mail className="size-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <p className="text-gray-600">
                      info@stt-jakarta.ac.id<br />
                      admisi@stt-jakarta.ac.id
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#75B4F9] rounded-lg">
                    <Clock className="size-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Jam Operasional</h3>
                    <p className="text-gray-600">
                      Senin - Jumat: 08:00 - 17:00<br />
                      Sabtu: 08:00 - 12:00<br />
                      Minggu: Tutup
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-[#F5F3FB]/95 backdrop-blur-sm p-8 rounded-xl shadow-sm">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Kirim Pesan</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nama Lengkap</label>
                    <Input placeholder="Masukkan nama Anda" className="bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input type="email" placeholder="email@example.com" className="bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Nomor Telepon</label>
                    <Input type="tel" placeholder="+62 812 3456 7890" className="bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Pesan</label>
                    <Textarea
                      placeholder="Tulis pesan Anda di sini..."
                      className="min-h-[150px] bg-white"
                    />
                  </div>
                  <Button className="w-full bg-[#1C64E8] hover:bg-[#75B4F9] text-white py-6">
                    Kirim Pesan
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-20 bg-white">
        <div className="container mx-auto px-4 mt-10">
          <div className="bg-gray-200 h-[400px] rounded-xl overflow-hidden flex items-center justify-center shadow-md">
            <img
              src={imgMapsintegration}
              alt="Lokasi Peta STT Jakarta"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

