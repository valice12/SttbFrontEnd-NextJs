import { MediaItem, ProgramItem, TestimonialItem, NewsItem, EventItem } from '@/lib/types';
import newsList from './json/news_list.json';
import eventsList from './json/events_list.json';

// Local images
const imgNews1 = "/assets/news-1.webp";
const imgNews2 = "/assets/news-2.webp";
const imgNews3 = "/assets/news-3.webp";
const imgSalib = "/assets/salib.webp";
const imgEvent2 = "/assets/event-2.webp";
const imgTesti1 = "/assets/testimonial-1.webp";
const imgTesti2 = "/assets/testimonial-2.webp";
const imgTesti3 = "/assets/testimonial-3.webp";
const imgTesti4 = "/assets/testimonial-4.webp";

// Map JSON data to expected interfaces for backward compatibility
export const newsData: NewsItem[] = newsList.items.map(item => ({
  ...item,
  category: Array.isArray(item.category) ? item.category : [item.category || 'General'],
  // UI fallback mapping is handled in dataService, but mockData should be correct for build
}));

export const eventsData: EventItem[] = eventsList.items.map((item: any) => {
  return {
    ...item,
    category: Array.isArray(item.category) ? item.category : [item.category || 'Seminar']
  };
});

export const mediaData: MediaItem[] = [
  {
    id: 1,
    slug: 'jurnal-transformatio-v22-n1',
    mediaTitle: 'Jurnal Teologi Transformatio: Volume 22, No. 1',
    authorName: 'Akademik STTB',
    mediaDescription: 'Diskusi tentang teologi biblika dan penerapannya di era modern.',
    theme: 'Teologi Biblika',
    publicationDate: '2026-03-01T00:00:00Z',
    category: ['Jurnal Stulos'],
    thumbnailPath: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1000',
    type: 'journal'
  },
  {
    id: 2,
    slug: 'menjaga-api-pelayanan',
    mediaTitle: 'Menjaga Api Pelayanan di Tengah Rutinitas Kampus',
    authorName: 'Staf Literatur',
    mediaDescription: 'Sebuah tulisan ringkas untuk memberikan insight baru dalam pelayanan.',
    theme: 'Pelayanan',
    publicationDate: '2026-03-10T00:00:00Z',
    category: ['Opini'],
    thumbnailPath: 'https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&q=80&w=1000',
    type: 'article'
  },
  {
    id: 3,
    slug: 'monograf-teologi-kebudayaan',
    mediaTitle: 'Monograf: Teologi dan Kebudayaan di Indonesia',
    authorName: 'Dr. Lukas Wijaya',
    mediaDescription: 'Sebuah studi mendalam mengenai interaksi antara iman Kristen dan kebhinekaan budaya di Indonesia.',
    theme: 'Budaya',
    publicationDate: '2026-01-01T00:00:00Z',
    category: ['Monograf'],
    thumbnailPath: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=1000',
    type: 'monograph'
  }
];

export const programsData: ProgramItem[] = [
  {
    programId: 1,
    slug: 's-th',
    programName: 'Sarjana Teologi',
    degree: 'S.Th.',
    duration: 8,
    totalCredit: 148
  },
  {
    programId: 2,
    slug: 's-pd-k',
    programName: 'Sarjana Pendidikan Kristen',
    degree: 'S.Pd.K.',
    duration: 8,
    totalCredit: 148
  },
  {
    programId: 3,
    slug: 'm-th-pastoral-urban',
    programName: 'Magister Teologi Pelayanan Pastoral Gereja Urban',
    degree: 'M.Th.',
    duration: 4,
    totalCredit: 48
  }
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: '1',
    name: 'Pdt. David Santoso, M.Th',
    role: 'Senior Pastor',
    year: 'Alumni 2018',
    message: 'STT tidak hanya memberikan pengetahuan teologi yang solid, tetapi juga membentuk karakter dan hati untuk melayani. Pendidikan di sini mengubah hidup saya sepenuhnya.',
    image: imgTesti1
  }
];