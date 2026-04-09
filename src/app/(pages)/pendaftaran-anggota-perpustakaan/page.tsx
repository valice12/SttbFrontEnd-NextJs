import { PendaftaranAnggotaPerpustakaan } from '@/components/features/perpustakaan/PendaftaranAnggotaPerpustakaan';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pendaftaran Anggota Perpustakaan | STT Bandung",
  description: "Formulir pendaftaran anggota perpustakaan Sekolah Tinggi Teologi Bandung.",
};

export default function PendaftaranAnggotaPerpustakaanPage() {
  return <PendaftaranAnggotaPerpustakaan />;
}
