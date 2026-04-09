'use client';

import { LibraryHero } from './components/LibraryHero';
import { LibraryForm } from './components/LibraryForm';

const bgHeader = "/assets/header-faq.png";
const bgPattern = "/assets/background.webp";

export function PendaftaranAnggotaPerpustakaan() {
  return (
    <div 
      className="min-h-screen bg-white bg-cover bg-center"
      style={{ backgroundImage: `url(${bgPattern})` }}
    >
      <LibraryHero bgHeader={bgHeader} />
      <LibraryForm />
    </div>
  );
}
