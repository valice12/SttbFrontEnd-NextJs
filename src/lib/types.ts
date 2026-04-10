// TypeScript interfaces for the University Portal

export interface NewsItem {
  id: number;
  slug: string;
  title: string;
  content: string;
  publicationDate: string;
  imagePath: string;
  category: string[];
}

export interface EventItem {
  eventTitle: string;
  slug: string;
  eventDate: string;
  endsAtDate: string;
  description: string;
  organizerName: string;
  category: string[];
  imagePath: string;
}

export interface EventDetail extends EventItem {
  eventName: string; // Detail calls it eventName sometimes
  location: string;
}

export interface MediaItem {
  id: string | number;
  slug: string;
  mediaTitle: string;
  authorName: string;
  authorPosition?: string;
  authorImagePath?: string;
  mediaDescription: string;
  theme: string;
  publicationDate: string;
  category: string[];
  thumbnailPath: string;
  type?: 'journal' | 'video' | 'article' | 'elibrary' | 'monograph';
}

export interface VideoDetail extends MediaItem {
  videoTitle: string;
  videoDescription: string;
  videoUrl: string;
}

export interface ArticleDetail extends MediaItem {
  articleTitle: string;
  articleDescription: string;
  articleContent: string;
}

export interface JournalDetail extends MediaItem {
  journalTitle: string;
  journalDescription: string;
  journalPath: string;
}

export interface ProgramItem {
  programId: number;
  slug: string;
  programName: string;
  degree: string;
  duration: number;
  totalCredit: number;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  year: string;
  message: string;
  image: string;
}

export interface NavLink {
  label: string;
  href: string;
  submenu?: NavLink[];
}

export interface CourseItem {
  courseName: string;
  credits: number;
  description: string;
}

export interface CurriculumCategory {
  categoryName: string;
  totalCredits: number;
  courses: CourseItem[];
}

export interface AcademicDto {
  programName: string;
  programDescription: string;
  programRequirements: string[];
  totalCredits: number;
  duration: string;
  notes: string[];
  lecturingSystem: string[];
  degree: string;
  motto: string;
  informedDescription: string;
  transformedDescription: string;
  transformativeDescription: string;
  slug?: string; // Added for routing
  programCategory?: CurriculumCategory[];
}
export interface DonationRequest {
  DonorMemberId: number;
  Amount: number;
  DonationArea: 'beasiswa' | 'perpustakaan_digital' | 'dukungan_sttb';
  DonationType: 'perbulan' | 'sekali_pembayaran';
  ProofOfDonation: File;
  Salutation?: string;
  FullName?: string;
  FirstName?: string;
  LastName?: string;
  Contact?: string;
  Email?: string;
  Address?: string;
  ProofOfSupport?: boolean;
  StudentName?: string;
  AcademicProgramId?: number;
  Message?: string;
}
