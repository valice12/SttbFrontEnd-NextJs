'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { FileText, DollarSign, Award, Heart } from 'lucide-react';

const navItems = [
  { href: "/admisi", icon: FileText, label: "Informasi Pendaftaran", key: "admisi" },
  { href: "/keuangan?tab=tuition", icon: DollarSign, label: "Biaya Studi", key: "tuition" },
  { href: "/keuangan?tab=scholarship", icon: Award, label: "Beasiswa STTB", key: "scholarship" },
  { href: "/dukungan", icon: Heart, label: "Dukungan", key: "support" },
];

export function FinanceNavbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab');

  const getIsActive = (item: typeof navItems[0]) => {
    if (item.key === 'admisi') return pathname === '/admisi';
    if (item.key === 'support') return pathname === '/dukungan';
    if (item.key === 'tuition') return pathname === '/keuangan' && activeTab === 'tuition';
    if (item.key === 'scholarship') return pathname === '/keuangan' && activeTab === 'scholarship';
    return false;
  };

  return (
    <section className="bg-white/80 border-b border-gray-100 py-8 sticky top-[132px] md:top-[132px] z-40 shadow-sm backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = getIsActive(item);
            
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl transition-all duration-500 font-black tracking-wide shadow-sm hover:shadow-xl hover:-translate-y-1 border-2 ${
                  isActive
                    ? 'bg-[#092C74] text-white border-[#092C74] shadow-blue-900/20 shadow-lg'
                    : 'bg-white hover:bg-[#F2ECF8] hover:text-[#092C74] border-gray-100 text-gray-500 hover:border-[#6A0DAD]'
                }`}
              >
                <Icon className={`size-5 ${isActive ? 'text-white' : 'text-[#E31D1A]'}`} />
                <span className="uppercase text-sm leading-none pt-0.5">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
