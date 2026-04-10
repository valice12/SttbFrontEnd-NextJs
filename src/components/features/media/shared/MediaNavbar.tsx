'use client';

import React from 'react';
import Link from 'next/link';
import { Newspaper, FileText, Video, Layers, BookOpen } from 'lucide-react';

interface MediaNavbarProps {
  activeTab: string;
}

const navItems = [
  { href: "/berita", icon: Newspaper, label: "News update", key: "berita" },
  { href: "/media?tab=jurnal", icon: FileText, label: "Jurnal stulos", key: "jurnal" },
  { href: "/media?tab=video", icon: Video, label: "Video", key: "video" },
  { href: "/media?tab=artikel", icon: Newspaper, label: "Artikel", key: "artikel" },
  { href: "/media?tab=monograf", icon: Layers, label: "Monograf", key: "monograf" },
  { href: "/media?tab=buletin", icon: Newspaper, label: "Buletin", key: "buletin" },
  { href: "/media?tab=elibrary", icon: BookOpen, label: "Digital library", key: "elibrary" },
];

export function MediaNavbar({ activeTab }: MediaNavbarProps) {
  return (
    <section className="bg-white/80 border-b border-gray-100 py-10 sticky top-[132px] md:top-[132px] z-40 shadow-sm backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-3 md:gap-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;
            
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`flex flex-col md:flex-row items-center gap-2 md:gap-3 px-4 py-4 md:px-8 md:py-4 rounded-2xl transition-all duration-500 font-black tracking-wide shadow-sm hover:shadow-xl border-2 ${
                  isActive
                    ? 'bg-[#092C74] text-white border-[#092C74] shadow-blue-900/20 shadow-lg'
                    : 'bg-white hover:bg-[#F2ECF8] hover:text-[#092C74] border-gray-50 text-gray-500 hover:border-[#6A0DAD]'
                }`}
              >
                <Icon className={`size-5 ${isActive ? 'text-white' : 'text-[#E31D1A]'}`} />
                <span className="text-[9px] md:text-xs tracking-widest text-center md:text-left leading-tight">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
