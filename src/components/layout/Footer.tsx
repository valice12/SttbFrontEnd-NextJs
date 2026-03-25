'use client';

import Link from 'next/link';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function Footer() {
  return (
    <footer className="bg-[#E31D1A] text-white">
      {/* Footer Main Section */}
      <div className="bg-[#E31D1A] border-b border-black">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            
            {/* Sumber Daya */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-[#F5F3FB]">Sumber Daya</h3>
              <ul className="space-y-2 text-sm">
                {['Perpustakaan', 'Perpustakaan Digital', 'Jurnal Transformatio', 'Podcast', 'Video', 'Buletin'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-white/90 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Link Bantuan */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-[#F5F3FB]">Link Bantuan</h3>
              <ul className="space-y-2 text-sm">
                {['Sistem Informasi Akademik', 'Sistem E-Learning', 'Sistem Perpustakaan', 'Sistem Kolaborasi Terpadu', 'Portal Alumni', 'Mail Server'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-white/90 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Program Studi */}
            <div className="lg:col-span-2">
              <h3 className="font-bold text-lg mb-4 text-[#F5F3FB]">Program Studi</h3>
              <ul className="space-y-2 text-sm grid sm:grid-cols-2 gap-x-4">
                {[
                  'Sarjana Teologi',
                  'Sarjana Pendidikan Kristen',
                  'Magister Teologi Pelayanan Pastoral Gereja Urban',
                  'Magister Teologi Transformasi Budaya & Masyarakat',
                  'Magister Pendidikan Kristen',
                  'Magister Ministri Pastoral',
                  'Magister Ministri Marketplace',
                  'Magister Ministri Kepemimpinan Pastoral',
                  'Magister Ministri Teologi & Pelayanan Gerejawi'
                ].map((item) => (
                  <li key={item}>
                    <Link href="/akademik" className="text-white/90 hover:text-white transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* No. Rekening & Newsletter */}
            <div className="space-y-8">
              {/* No. Rekening */}
              <div>
                <h3 className="font-bold text-lg mb-4 text-[#F5F3FB]">No. Rekening</h3>
                <div className="text-sm text-white/90 space-y-1">
                  <p className="font-semibold text-white">BCA cab. Surya Sumantri</p>
                  <p>Bandung</p>
                  <p className="font-mono text-lg font-bold">282.300.5555</p>
                  <p>a/n Yayasan STT Bandung</p>
                </div>
              </div>

              {/* Newsletter & Media Sosial */}
              <div>
                <h3 className="font-bold text-lg mb-4 text-[#F5F3FB]">Newsletter & Media Sosial</h3>
                <div className="space-y-3 mb-6">
                  <Input
                    type="text"
                    placeholder="Nama Lengkap *"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 text-sm h-10"
                  />
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="E-mail *"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60 text-sm h-10"
                    />
                    <Button className="bg-white text-[#E31D1A] hover:bg-gray-100 font-bold px-4 h-10">
                      Subscribe
                    </Button>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <a href="#" className="size-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Facebook className="size-5" />
                  </a>
                  <a href="#" className="size-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Instagram className="size-5" />
                  </a>
                  <a href="#" className="size-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Youtube className="size-5" />
                  </a>
                  <a href="https://wa.me/6281573360009" target="_blank" rel="noopener noreferrer" className="size-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                    <svg className="size-5 fill-current" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.126.549 4.194 1.597 6.015L.135 24l6.101-1.602c1.763.957 3.765 1.464 5.795 1.464 6.646 0 12.031-5.385 12.031-12.031S18.677 0 12.031 0zM12.031 22.012c-1.782 0-3.529-.481-5.06-1.391l-.362-.218-3.765.987.994-3.666-.239-.374C2.652 15.655 2.11 13.842 2.11 12.031c0-5.485 4.464-9.949 9.949-9.949 5.485 0 9.949 4.464 9.949 9.949 0 5.485-4.464 9.949-9.949 9.949zm5.405-7.443c-.296-.148-1.751-.861-2.023-.96-.272-.099-.472-.148-.671.148-.199.296-.763.96-.935 1.157-.172.198-.344.222-.64.074s-1.25-.461-2.384-1.472c-.88-.787-1.474-1.758-1.646-2.054-.172-.296-.018-.456.13-.603.133-.133.296-.345.445-.518.148-.173.197-.296.296-.493.099-.197.049-.37-.024-.518-.074-.148-.671-1.619-.92-2.215-.242-.582-.486-.503-.671-.512-.172-.008-.371-.01-.571-.01-.199 0-.523.074-.796.37s-1.042 1.018-1.042 2.483c0 1.464 1.066 2.88 1.214 3.078.148.197 2.096 3.196 5.078 4.48 2.502 1.08 3.003 1.006 3.524.96.657-.059 2.023-.826 2.31-1.624.286-.798.286-1.481.201-1.624-.085-.143-.311-.227-.607-.375z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="bg-[#061B46] border-b border-black">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-sm">
            
            {/* Address */}
            <div>
              <div className="flex items-start gap-4">
                <MapPin className="size-6 text-[#E31D1A] shrink-0 mt-1" />
                <div className="text-white/90 leading-relaxed">
                  <p className="font-bold text-white mb-2 uppercase tracking-wide">Alamat</p>
                  <p>Jl Dr. Djunjunan No. 105</p>
                  <p>Bandung 40173</p>
                  <p>Indonesia</p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="flex items-start gap-4">
                <Phone className="size-6 text-[#E31D1A] shrink-0 mt-1" />
                <div className="text-white/90 space-y-2">
                  <p className="font-bold text-white mb-2 uppercase tracking-wide">Kontak</p>
                  <p>Phone: (+62) 22 601-6454, 607-7920</p>
                  <p>Whatsapp: (+62) 815 7336 0009</p>
                  <p className="pl-20">(+62) 851-8302-6009</p>
                  <p className="flex items-center gap-2 mt-2">
                    <Mail className="size-4 text-[#E31D1A]" />
                    E-mail: official@sttb.ac.id
                  </p>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="lg:text-right flex flex-col justify-end text-white/60">
              <p>Copyright &copy; 2026</p>
              <p className="font-bold text-white my-1">Sekolah Tinggi Teologi Bandung</p>
              <p>All Rights Reserved.</p>
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
}
