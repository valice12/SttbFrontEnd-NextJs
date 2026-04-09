# STT Bandung - Public Frontend V2

Website utama interaktif untuk STT Bandung, dibangun dengan **Next.js 14** dan **React 18**. Project ini menyajikan informasi akademik, biografi pengurus, pendaftaran mahasiswa baru, dan akses perpustakaan digital (Media).

---

## 🚀 Panduan Instalasi Lokal

### 1. Prasyarat
- **Node.js v18.17+**
- **npm v9+**
- **Backend Running**: Pastikan API Backend (.NET) sudah aktif di `http://localhost:5066`.

### 2. Langkah Instalasi
1.  **Instal Dependensi**:
    ```bash
    npm install
    ```
2.  **Konfigurasi Environment**:
    Buat file `.env.local` di folder utama project ini:
    ```env
    NEXT_PUBLIC_API_BASE_URL=http://localhost:5066/api/v1
    NEXT_PUBLIC_USE_MOCK_DATA=false
    ```
    - `true`: Menggunakan data JSON statis (untuk demo offline).
    - `false`: Menghubungkan langsung ke API Backend.
3.  **Menjalankan Mode Pengembangan**:
    ```bash
    npm run dev
    ```
    Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 📚 Fitur Unggulan Media
Website ini memiliki integrasi mendalam dengan sistem perpustakaan digital STTB:
- **Jurnal Stulos**: Preview PDF secara langsung di aplikasi untuk kenyamanan membaca.
- **Biaya Kuliah**: Kalkulator biaya dinamis yang mengambil data dari backend.
- **Pendaftaran**: Formulir pendaftaran mahasiswa baru (Admisi) yang terintegrasi dengan API.

---

## 🛠️ Catatan Teknis & Pemecahan Masalah
- **React 18**: Project ini dipatok pada React 18 untuk mendukung library animasi dan UI lama yang belum siap untuk React 19.
- **Performance**: Menggunakan **Motion (Framer Motion)** untuk animasi transisi halaman yang halus.
- **Next.js Config**: Konfigurasi `next.config.mjs` diatur untuk mengabaikan direktori build tertentu dan error linting saat deployment untuk mempercepat iterasi.

---
**STT Bandung Development &copy; 2026**
