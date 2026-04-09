'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, ChevronRight, Home, Info, GraduationCap, ClipboardList, Users, Layers, Mail, Phone, MapPin } from 'lucide-react';

const navigationLinks = [
  { label: 'Beranda', href: '/', icon: Home },
  {
    label: 'Profil',
    href: '/tentang-kami',
    icon: Info,
    submenu: [
      { label: 'Sejarah & Pendiri', href: '/tentang-kami?tab=history' },
      { label: 'Visi, Misi & Identitas', href: '/tentang-kami?tab=vision' },
      { label: 'Pengakuan Iman', href: '/tentang-kami?tab=faith' },
      { label: 'Struktur Organisasi', href: '/tentang-kami?tab=organization' }
    ]
  },
  {
    label: 'Akademik',
    href: '/akademik',
    icon: GraduationCap,
    submenu: [
      { label: 'Program Studi', href: '/akademik' },
      { label: 'LEAD', href: '/lead' }
    ]
  },
  {
    label: 'Admisi & Keuangan',
    href: '/admisi',
    icon: ClipboardList,
    submenu: [
      { label: 'Informasi Pendaftaran', href: '/admisi' },
      { label: 'Biaya Kuliah', href: '/keuangan?tab=tuition' },
      { label: 'Beasiswa', href: '/keuangan?tab=scholarship' },
      { label: 'Dukungan', href: '/dukungan' }
    ]
  },
  {
    label: 'Kemahasiswaan',
    href: '/kehidupan-kampus',
    icon: Users,
    submenu: [
      { label: 'Kehidupan Kampus', href: '/kehidupan-kampus' },
      { label: 'Kegiatan', href: '/kegiatan' }
    ]
  },
  {
    label: 'Media & Berita',
    href: '/berita',
    icon: Layers,
    submenu: [
      { label: 'Berita Terkini', href: '/berita' },
      { label: 'Jurnal Stulos', href: '/media?tab=jurnal' },
      { label: 'Video Pembelajaran', href: '/media?tab=video' },
      { label: 'Artikel', href: '/media?tab=artikel' },
      { label: 'Monograf', href: '/media/monograf' },
      { label: 'Buletin Kampus', href: '/media/buletin' }
    ]
  }
];

interface HamburgerOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HamburgerOverlay({ isOpen, onClose }: HamburgerOverlayProps) {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-white lg:hidden overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 px-6 h-16 flex items-center justify-between z-50">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-[#092C74] rounded-xl flex items-center justify-center">
                 <div className="size-6 border-2 border-white rounded-md" />
              </div>
              <div>
                <h2 className="text-sm font-black text-[#092C74] uppercase tracking-widest">STT Bandung</h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Menu Navigation</p>
              </div>
            </div>
            
            <button 
              onClick={onClose}
              className="size-12 rounded-2xl bg-gray-50 flex items-center justify-center text-[#092C74] hover:bg-[#E31D1A] hover:text-white transition-all shadow-sm"
            >
              <X className="size-6" />
            </button>
          </div>

          <div className="p-6 space-y-10">
            {/* Primary Links */}
            <div className="grid gap-3">
              {navigationLinks.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="overflow-hidden"
                >
                  <div 
                    onClick={() => {
                      if (link.submenu) {
                        toggleSubmenu(link.label);
                      }
                    }}
                    className="relative flex items-center justify-between p-5 rounded-3xl bg-gray-50/50 border border-gray-100 group hover:bg-[#092C74] transition-all cursor-pointer"
                  >
                    {!link.submenu && (
                      <Link href={link.href} onClick={onClose} className="absolute inset-0 z-20" />
                    )}
                    <div className="flex items-center gap-4 relative z-10 pointer-events-none">
                      <div className="size-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#E31D1A] group-hover:bg-[#E31D1A] group-hover:text-white transition-all">
                        <link.icon className="size-6" />
                      </div>
                      <span className="text-lg font-black text-[#092C74] group-hover:text-white uppercase tracking-tight transition-all">
                        {link.label}
                      </span>
                    </div>
                    {link.submenu && (
                      <ChevronRight className={`size-5 text-gray-300 group-hover:text-white transition-all duration-300 relative z-10 ${openSubmenu === link.label ? 'rotate-90' : ''}`} />
                    )}
                  </div>

                  <AnimatePresence>
                    {link.submenu && openSubmenu === link.label && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 gap-2 mt-2 px-2"
                      >
                        {/* Parent Link as first option in accordion if it has content */}
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className="flex items-center gap-3 p-3 text-xs font-black text-[#1C64E8] hover:text-[#092C74] transition-all uppercase tracking-widest bg-blue-50/50 rounded-xl"
                        >
                          <div className="size-1.5 bg-[#1C64E8] rounded-full" />
                          Lihat Halaman {link.label}
                        </Link>
                        {link.submenu.map((sublink) => (
                          <Link
                            key={sublink.href}
                            href={sublink.href}
                            onClick={onClose}
                            className="flex items-center gap-3 p-3 text-xs font-bold text-gray-500 hover:text-[#092C74] transition-all uppercase tracking-widest"
                          >
                            <div className="size-1.5 bg-gray-200 rounded-full" />
                            {sublink.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Quick Contact Info */}
            <div className="bg-[#092C74] rounded-[2.5rem] p-8 text-white space-y-6">
               <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#6AACE6]">Connect With Us</h3>
               <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <Mail className="size-5 text-[#6AACE6]" />
                    </div>
                    <span className="text-sm font-medium">info@sttb.ac.id</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <Phone className="size-5 text-[#6AACE6]" />
                    </div>
                    <span className="text-sm font-medium font-mono">+62 (22) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <MapPin className="size-5 text-[#6AACE6]" />
                    </div>
                    <span className="text-sm font-medium leading-tight">Jl. Terusan Babakan Jeruk I No.100, Bandung</span>
                  </div>
               </div>
            </div>
            
            {/* Footer space to prevent bottom navbar collision */}
            <div className="h-32" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
