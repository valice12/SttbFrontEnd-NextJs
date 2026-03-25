import type { Metadata } from 'next';
import './globals.css';
import { ClientLayout } from '@/components/layout/ClientLayout';

export const metadata: Metadata = {
  title: 'Sekolah Tinggi Teologi Bandung',
  description: 'Excellence in Theological Education',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
