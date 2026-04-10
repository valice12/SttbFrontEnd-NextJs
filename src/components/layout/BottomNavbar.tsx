'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Info, Layers, ClipboardList } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Profil', href: '/tentang-kami', icon: Info },
  { label: 'Media', href: '/media', icon: Layers },
  { label: 'Admisi', href: '/admisi', icon: ClipboardList },
];

export function BottomNavbar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/' && pathname !== '/') {
      return false;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-sm z-[70]">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white/80 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] px-4 py-3 flex items-center justify-between"
      >
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href} className="relative py-2 px-4 group">
              <div className="flex flex-col items-center gap-1">
                <Icon className={`size-5 transition-all duration-500 ${active ? 'text-[#E31D1A] scale-110' : 'text-gray-400 group-hover:text-[#092C74]'}`} />
                <span className={`text-[8px] font-black uppercase tracking-widest transition-all duration-500 ${active ? 'text-[#092C74] opacity-100' : 'text-gray-400 opacity-100'}`}>
                  {item.label}
                </span>
                
                {active && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute -bottom-1.5 size-1 bg-[#E31D1A] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </div>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}
