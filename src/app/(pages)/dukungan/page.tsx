import { Dukungan } from "@/pages-src/Dukungan";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dukungan Pelayanan & Donasi - STTB",
  description: "Dukung pelayanan STTB melalui donasi beasiswa, pengembangan institusi, dan perpustakaan digital.",
};

export default function DukunganPage() {
  return <Dukungan />;
}
