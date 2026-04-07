'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import imgLogoNavbar from '../../../public/assets/logo.png';
import type { NavLink } from '@/types';

const navigationLinks: NavLink[] = [
  {
    label: 'Beranda',
    href: '/'
  },
  {
    label: 'Profil',
    href: '/tentang-kami',
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
    submenu: [
      { label: 'Program Studi', href: '/akademik' },
      { label: 'LEAD', href: '/lead' }
    ]
  },
  {
    label: 'Admisi & Keuangan',
    href: '/admisi',
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
    submenu: [
      { label: 'Kehidupan Kampus', href: '/kehidupan-kampus' },
      { label: 'Kegiatan', href: '/kegiatan' }
    ]
  },
  {
    label: 'Media & Berita',
    href: '/berita',
    submenu: [
      { label: 'Berita Terkini', href: '/berita' },
      { label: 'Jurnal Stulos', href: '/media?tab=jurnal' },
      { label: 'Video Pembelajaran', href: '/media?tab=video' },
      { label: 'Artikel', href: '/media?tab=artikel' },
      { label: 'Monograf', href: '/media/monograf' },
      { label: 'Buletin Kampus', href: '/media/buletin' },
      { label: 'E-Library', href: '/media?tab=elibrary' },
      { label: 'Keanggotaan Umum', href: '/media?tab=keanggotaan' }
    ]
  }
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/' && pathname !== '/') {
      return false;
    }
    return pathname.startsWith(path);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsTopBarVisible(false);
      } else {
        setIsTopBarVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      {/* Top Bar - Hides on scroll down */}
      <div
        className={`bg-[#092C74] text-white transition-all duration-300 ${isTopBarVisible ? 'h-12' : 'h-0 overflow-hidden'
          }`}
      >
        <div className="container mx-auto px-4 h-12 flex items-center justify-end">
          <Link href="/kontak" className="text-sm font-medium hover:text-[#6AACE6] transition-colors">
            Kontak Kami
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={typeof imgLogoNavbar === 'string' ? imgLogoNavbar : imgLogoNavbar.src} alt="STT Logo" className="h-12 w-auto" />
              <div className="hidden md:block">
                <div className="font-bold text-lg text-[#003049]">Sekolah Tinggi Teologi Bandung</div>
                <div className="text-xs text-[#1C64E8]">Excellence in Theological Education</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigationLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.submenu && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`px-4 py-2 text-sm font-medium transition-colors flex items-center gap-1 ${link.label === 'Beranda' ? 'pr-8' : ''} ${isActive(link.href)
                      ? 'text-[#1C64E8] border-b-2 border-[#1C64E8]'
                      : 'text-gray-700 hover:text-[#1C64E8]'
                      }`}
                  >
                    {link.label}
                    {link.submenu && <ChevronDown className="size-4" />}
                  </Link>

                  {/* Dropdown Menu */}
                  {link.submenu && activeDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-0 bg-white shadow-lg rounded-md py-2 w-48 z-50">
                      {link.submenu.map((sublink) => (
                        <Link
                          key={sublink.href}
                          href={sublink.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#F5F3FB] hover:text-[#1C64E8] transition-colors"
                        >
                          {sublink.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t">
              {navigationLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className={`block px-4 py-3 transition-colors ${isActive(link.href)
                      ? 'bg-[#F5F3FB] text-[#1C64E8] font-semibold border-l-4 border-[#1C64E8]'
                      : 'text-gray-700 hover:bg-[#F5F3FB] hover:text-[#1C64E8]'
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {link.submenu && (
                    <div className="pl-8 bg-gray-50">
                      {link.submenu.map((sublink) => (
                        <Link
                          key={sublink.href}
                          href={sublink.href}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-[#1C64E8] transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {sublink.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
