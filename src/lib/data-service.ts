/**
 * Centralized Data Service
 * Utility for fetching data from either local JSON files or a remote API.
 */
import { getFileUrl } from './file-utils';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

const ACADEMIC_SLUG_MAP: Record<string, string> = {
  'sarjana-teologi': 's-th',
  'sarjana-pendidikan-kristen': 's-pd-k',
  'magister-teologi-pelayanan-pastoral-gereja-urban': 'm-th-pastoral-urban',
  'magister-teologi-transformasi-budaya-masyarakat': 'm-th-transformasi-budaya',
  'magister-pendidikan-kristen': 'm-pd',
  'magister-ministri-marketplace': 'm-min-marketplace',
  'magister-ministri-kepemimpinan-pastoral': 'm-min-kepemimpinan-pastoral',
  'magister-ministri-teologi-pelayanan-gerejawi': 'm-min-pelayanan-gerejawi'
};

const MEDIA_FORMAT_MAP: Record<string, string> = {
  'jurnal': 'journal',
  'artikel': 'article',
  'video': 'video',
  'monograf': 'monograf',
  'buletin': 'buletin',
  'elibrary': 'elibrary'
};

export const dataService = {
  /**
   * Generic fetch method that handles both API and local JSON
   */
  async fetchData<T>(endpoint: string, localJson: string): Promise<T> {
    if (!USE_MOCK_DATA && API_BASE_URL) {
      try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`);
        if (!response.ok) throw new Error(`API error: ${response.statusText}`);
        const result = await response.json();
        return result;
      } catch (error) {
        console.warn(`Failed to fetch from API [${endpoint}], falling back to mock data:`, error);
        return this.getLocalData<T>(localJson);
      }
    }
    return this.getLocalData<T>(localJson);
  },

  /**
   * Fetch data from a local JSON file path.
   */
  async getLocalData<T>(fileName: string): Promise<T> {
    try {
      const data = await import(`@/app/data/json/${fileName}`);
      return data.default;
    } catch (error) {
      console.error(`Error loading local data [${fileName}]:`, error);
      throw error;
    }
  },

  /**
   * Specialized methods for all data entities
   */
  async getNews(params: { page?: number, pageSize?: number, search?: string, category?: string, orderBy?: string, orderState?: string } = {}): Promise<any> {
    const { page = 1, pageSize = 10, search, category, orderBy, orderState } = params;
    
    const query = new URLSearchParams({
      PageNumber: page.toString(),
      PageSize: pageSize.toString(),
    });

    if (search) {
      query.append('NewsTitle', search);
    }
    if (category && category !== 'all') {
      query.append('CategoryName', category);
    }
    // Backend requires OrderState when OrderBy is provided
    if (orderBy) {
      query.append('OrderBy', orderBy);
      query.append('OrderState', orderState || 'desc');
    }

    const data = await this.fetchData<any>(`news/get-available-news?${query.toString()}`, 'news_list.json');
    const items = Array.isArray(data) ? data : (data?.items || []);
    
    return {
      items: items.map((item: any) => ({
        ...item,
        image: item.imagePath || item.image,
        date: item.publicationDate || item.date
      })),
      totalItems: data?.totalNews || data?.TotalNews || data?.totalItems || items.length,
      totalPages: data?.totalPages || data?.TotalPages || 1,
      currentPage: data?.pageNumber || data?.PageNumber || page
    };
  },

  async getNewsDetail(slug: string): Promise<any> {
    const data = await this.fetchData<any>(`news/get-news/${slug}`, 'news_detail.json');
    return {
      ...data,
      image: data.imagePath || data.image,
      date: data.publicationDate || data.date
    };
  },

  async getNewsCategories() {
    const data = await this.fetchData<any>('news/get-all-categories', 'categories_list.json');
    return Array.isArray(data) ? data : (data?.items || []);
  },

  async getEvents(params: { page?: number, pageSize?: number, search?: string, category?: string, date?: Date, orderBy?: string, orderState?: string } = {}): Promise<any> {
    const { page = 1, pageSize = 10, search, category, date, orderBy, orderState } = params;
    
    const query = new URLSearchParams({
      PageNumber: page.toString(),
      PageSize: pageSize.toString(),
    });
    
    if (search) {
      query.append('EventTitle', search);
    }
    if (category && category !== 'all') {
      query.append('CategoryName', category);
    }
    // Backend requires OrderState when OrderBy is provided
    if (orderBy) {
      query.append('OrderBy', orderBy);
      query.append('OrderState', orderState || 'desc');
    }
    if (date) {
      query.append('EventDate', date.toISOString());
    }

    const data = await this.fetchData<any>(`events/get-available-events?${query.toString()}`, 'events_list.json');
    const items = Array.isArray(data) ? data : (data?.items || []);

    return {
      items: items.map((item: any) => ({
        ...item,
        title: item.eventTitle || item.EventTitle || item.title,
        image: item.imagePath || item.ImagePath || item.image,
        date: item.startsAtDate || item.StartsAtDate || item.eventDate || item.date,
        time: (item.startsAtDate || item.StartsAtDate) ? new Date(item.startsAtDate || item.StartsAtDate).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : item.time
      })),
      totalItems: data?.totalEvents || data?.TotalEvents || data?.totalItems || items.length,
      totalPages: data?.totalPages || data?.TotalPages || 1,
      currentPage: data?.pageNumber || data?.PageNumber || page
    };
  },

  async getEventDetail(slug: string): Promise<any> {
    const data = await this.fetchData<any>(`events/get-event/${slug}`, 'event_detail.json');
    return {
      ...data,
      title: data.eventName || data.eventTitle || data.title,
      image: data.imagePath || data.image,
      date: data.eventDate || data.startAtDate || data.date,
      time: (data.eventDate || data.startAtDate) ? new Date(data.eventDate || data.startAtDate).toLocaleTimeString() : data.time
    };
  },

  async getEventOrganizers() {
    const data = await this.fetchData<any>('events/get-all-organizers', 'organizers_list.json');
    return Array.isArray(data) ? data : (data?.items || []);
  },

  async getEventCategories() {
    const data = await this.fetchData<any>('events/get-all-categories', 'categories_list.json');
    return Array.isArray(data) ? data : (data?.items || []);
  },

  async getAcademicPrograms(): Promise<any[]> {
    const data = await this.fetchData<any>('academics/get-available-programs', 'academic_programs_list.json');
    const items = Array.isArray(data) ? data : (data?.items || []);
    return items.map((program: any) => ({
      ...program,
      title: program.programName || program.title,
      slug: ACADEMIC_SLUG_MAP[program.slug] || program.slug
    }));
  },

  async getAcademicRequirements() {
    return this.fetchData<any>('academics/get-academic-requirements', 'academic_requirements.json');
  },

  async getAcademicProgram(lookupSlug: string): Promise<any> {
    const slug = ACADEMIC_SLUG_MAP[lookupSlug] || lookupSlug;
    if (!USE_MOCK_DATA && API_BASE_URL) {
      try {
        const response = await fetch(`${API_BASE_URL}/academics/get-program/${slug}`);
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        return {
          ...data,
          title: data.programName || data.title,
          description: data.programDescription || data.description,
          totalCredits: data.totalCredit || data.totalCredits
        };
      } catch (error) {
        console.error(`Failed to fetch academic program [${slug}]:`, error);
        throw error;
      }
    }

    if (USE_MOCK_DATA) {
      try {
        const config = await this.getLocalData<any>('academic_programs_config.json');
        return config[slug] || null;
      } catch {
        return null;
      }
    }

    return null;
  },

  async getAcademicCurriculum(slug: string) {
    try {
      const program = await this.getAcademicProgram(slug);
      return program?.programCategory || [];
    } catch {
      return [];
    }
  },

  async getAdmissionSchedule() {
    const data = await this.fetchData<any>('admissions/get-admission-schedule', 'admission_schedule.json');
    // Backend returns { items: [...] }
    return data?.items || data || [];
  },

  async getAdmissionCosts() {
    const data = await this.fetchData<any>('admissions/get-all-admission-costs', 'admission_costs.json');
    // Backend returns { items: [...] }
    return data?.items || data || [];
  },

  async getMediaItems(mediaFormat?: string, params: { page?: number, pageSize?: number, search?: string, category?: string, date?: Date, orderBy?: string, orderState?: string } = {}): Promise<any> {
    const { page = 1, pageSize = 10, search, category, date, orderBy, orderState } = params;
    const formats = mediaFormat
      ? [mediaFormat]
      : ['jurnal', 'artikel', 'video', 'monograf', 'buletin', 'elibrary'];

    const allItems: any[] = [];
    let totalItems = 0;
    let totalPages = 0;

    for (const fmt of formats) {
      try {
        const apiFormat = MEDIA_FORMAT_MAP[fmt] || fmt;
        // Backend uses route param: /get-available-media/{media_format}
        const query = new URLSearchParams({
          PageNumber: page.toString(),
          PageSize: pageSize.toString(),
        });
        
        if (search) {
          query.append('MediaTitle', search);
        }
        if (category && category !== 'all') {
          query.append('CategoryName', category);
        }
        // Backend requires OrderState when OrderBy is provided
        if (orderBy) {
          query.append('OrderBy', orderBy);
          query.append('OrderState', orderState || 'desc');
        }
        if (date) {
          query.append('PublicationDate', date.toISOString());
        }

        // Correct URL: route param, not query param
        const endpoint = `media/get-available-media/${apiFormat}?${query.toString()}`;
        const data = await this.fetchData<any>(endpoint, 'media_list.json');
        
        const items = Array.isArray(data) ? data : (data?.Items || data?.items || []);

        const mapped = items.map((item: any) => ({
          ...item,
          type: fmt,
          slug: item.Slug || item.slug || item.id?.toString() || '',
          title: item.MediaTitle || item.mediaTitle || item.title,
          author: (item.Authors && item.Authors.length > 0)
            ? item.Authors.map((a: any) => a.AuthorName || a.authorName).join(', ')
            : (item.authors && item.authors.length > 0)
              ? item.authors.map((a: any) => a.authorName || a.AuthorName).join(', ')
              : (item.authorName || item.author || ''),
          description: item.MediaDescription || item.mediaDescription || item.description || '',
          image: item.ThumbnailPath || item.thumbnailPath || item.image || '',
          date: item.PublicationDate || item.publicationDate || item.date || item.createdAt || item.updatedAt,
          category: Array.isArray(item.Category)
            ? item.Category[0]
            : (Array.isArray(item.category) ? item.category[0] : (item.category || fmt))
        }));
        allItems.push(...mapped);
        totalItems = data?.TotalMedia || data?.totalMedia || data?.totalItems || items.length;
        totalPages = data?.TotalPages || data?.totalPages || 1;
      } catch (e) {
        console.warn(`Failed to fetch media format [${fmt}]:`, e);
      }
    }

    return {
      items: allItems,
      totalItems,
      totalPages,
      currentPage: page
    };
  },

  async getMediaCategories() {
    const data = await this.fetchData<any>('media/get-media-categories', 'media_categories.json');
    return Array.isArray(data) ? data : (data?.items || []);
  },

  async getMediaDetail(mediaType: string, slug: string): Promise<any> {
    const typeToEndpointMap: Record<string, string> = {
      'jurnal': 'journal',
      'artikel': 'article',
      'video': 'video',
      'monograf': 'monograf',
      'buletin': 'buletin'
    };
    const endpointType = typeToEndpointMap[mediaType] || mediaType;
    try {
      const data = await this.fetchData<any>(`media/get-${endpointType}/${slug}`, `${mediaType}_detail.json`);
      if (!data) {
        return null;
      }
      return {
        ...data,
        type: mediaType,
        title: data.mediaTitle || data.journalTitle || data.articleTitle || data.videoTitle || data.title,
        author: (data.authors && data.authors.length > 0) ? data.authors.map((a: any) => a.authorName).join(', ') : (data.authorName || data.author),
        description: data.mediaDescription || data.journalDescription || data.articleDescription || data.videoDescription || data.description,
        image: data.thumbnailPath || data.image,
        date: data.publicationDate || data.date,
        category: Array.isArray(data.category) ? data.category[0] : (data.category || mediaType)
      };
    } catch {
      return null;
    }
  },

  async getJournalDetail(slug: string): Promise<any> {
    try {
      const data = await this.fetchData<any>(`media/get-journal/${slug}`, 'journal_detail.json');
      return {
        ...data,
        title: data.journalTitle || data.title,
        description: data.journalDescription || data.description,
        link: getFileUrl(data.journalPath || data.link || data.mediaPath, 'jurnal')
      };
    } catch {
      // Fallback: search in media_list.json if journal_detail.json is missing
      const allMedia = await this.getMediaItems('jurnal');
      const item = allMedia.find((m: any) => m.slug === slug) || null;
      if (item && item.link) {
        item.link = getFileUrl(item.link, 'jurnal');
      }
      return item;
    }
  },

  async getArticleDetail(slug: string): Promise<any> {
    try {
      const data = await this.fetchData<any>(`media/get-article/${slug}`, 'article_detail.json');
      return {
        ...data,
        title: data.articleTitle || data.title,
        description: data.articleDescription || data.description,
        content: data.articleContent || data.content,
        image: data.thumbnailPath || data.image,
        link: getFileUrl(data.articlePath || data.link || data.mediaPath, 'artikel')
      };
    } catch {
      const allMedia = await this.getMediaItems('artikel');
      const item = allMedia.find((m: any) => m.slug === slug) || null;
      if (item && item.link) {
        item.link = getFileUrl(item.link, 'artikel');
      }
      return item;
    }
  },

  async getVideoDetail(slug: string): Promise<any> {
    try {
      const data = await this.fetchData<any>(`media/get-video/${slug}`, 'video_detail.json');
      return {
        ...data,
        title: data.videoTitle || data.title,
        description: data.videoDescription || data.description,
        link: data.videoUrl || data.link
      };
    } catch {
      const allMedia = await this.getMediaItems('video');
      return allMedia.find((m: any) => m.slug === slug) || null;
    }
  },

  async getMonografDetail(slug: string): Promise<any> {
    try {
      const data = await this.fetchData<any>(`media/get-monograf/${slug}`, 'monograf_detail.json');
      return {
        ...data,
        title: data.monografTitle || data.title,
        description: data.synopsis || data.monografDescription || data.description,
        synopsis: data.synopsis,
        price: data.price,
        isbn: data.isbn,
        contact: data.contact,
        image: data.thumbnailPath || data.image,
        link: getFileUrl(data.monografPath || data.link || data.mediaPath, 'monograf')
      };
    } catch {
      const allMedia = await this.getMediaItems('monograf');
      const item = allMedia.find((m: any) => m.slug === slug) || null;
      if (item && item.link) {
        item.link = getFileUrl(item.link, 'monograf');
      }
      return item;
    }
  },

  async getBuletinDetail(slug: string): Promise<any> {
    try {
      const data = await this.fetchData<any>(`media/get-buletin/${slug}`, 'buletin_detail.json');
      return {
        ...data,
        title: data.buletinTitle || data.title,
        description: data.buletinDescription || data.description,
        link: getFileUrl(data.buletinPath || data.link || data.mediaPath, 'buletin')
      };
    } catch {
      const allMedia = await this.getMediaItems('buletin');
      const item = allMedia.find((m: any) => m.slug === slug) || null;
      if (item && item.link) {
        item.link = getFileUrl(item.link, 'buletin');
      }
      return item;
    }
  },


  async getTestimonials() {
    const data = await this.fetchData<any>('testimonials', 'testimonials_list.json');
    return Array.isArray(data) ? data : (data?.items || []);
  },

  async getUsers() {
    const data = await this.getLocalData<any>('users.json');
    return Array.isArray(data) ? data : (data?.items || []);
  },

  async getGallery() {
    const data = await this.getLocalData<any>('gallery.json');
    return Array.isArray(data) ? data : (data?.items || []);
  },

  async getAchievements() {
    const data = await this.getLocalData<any>('achievements.json');
    return Array.isArray(data) ? data : (data?.items || []);
  },

  /**
   * Returns the full { items: [] } response object for foundation members.
   * The TentangKami template accesses foundation?.items?.filter(...),
   * so we keep the full response shape here.
   */
  async getFoundationMembers(page = 1, pageSize = 10): Promise<any> {
    if (!USE_MOCK_DATA && API_BASE_URL) {
      try {
        const response = await fetch(`${API_BASE_URL}/profiles/get-all-administrators?PageNumber=${page}&PageSize=${pageSize}`);
        if (!response.ok) throw new Error(`API error: ${response.statusText}`);
        const data = await response.json();
        return {
          items: data.items || [],
          totalItems: data.totalItems || 0,
          totalPages: data.totalPages || 0
        };
      } catch (error) {
        console.warn('Failed to fetch administrators, falling back to mock data:', error);
        return this.getLocalData<any>('foundation_list.json');
      }
    }
    return this.getLocalData<any>('foundation_list.json');
  },

  async getLecturers(page = 1, pageSize = 10): Promise<any> {
    if (!USE_MOCK_DATA && API_BASE_URL) {
      try {
        const response = await fetch(`${API_BASE_URL}/profiles/get-all-lecturers?PageNumber=${page}&PageSize=${pageSize}`);
        if (!response.ok) throw new Error(`API error: ${response.statusText}`);
        const data = await response.json();
        return {
          items: data.items || [],
          totalItems: data.totalItems || 0,
          totalPages: data.totalPages || 0
        };
      } catch (error) {
        console.warn('Failed to fetch lecturers, falling back to mock data:', error);
        const fallback = await this.getLocalData<any>('lecturers_list.json');
        return { 
          items: Array.isArray(fallback) ? fallback : (fallback?.items || []),
          totalItems: fallback?.totalItems || 0,
          totalPages: fallback?.totalPages || 0
        };
      }
    }
    const fallback = await this.getLocalData<any>('lecturers_list.json');
    return { 
      items: Array.isArray(fallback) ? fallback : (fallback?.items || []),
      totalItems: fallback?.totalItems || 0,
      totalPages: fallback?.totalPages || 0
    };
  },
  async addDonorMember(donation: FormData): Promise<any> {
    if (!USE_MOCK_DATA && API_BASE_URL) {
      try {
        const response = await fetch(`${API_BASE_URL}/donations/add-donor-member`, {
          method: 'POST',
          body: donation,
        });
        if (!response.ok) {
          const errorText = await response.text();
          let errorData;
          try {
            errorData = errorText ? JSON.parse(errorText) : null;
          } catch (e) {
            throw new Error(`API error (${response.status}): ${errorText || response.statusText}`);
          }
          throw errorData || new Error(`API error (${response.status}): ${response.statusText}`);
        }
        
        const responseText = await response.text();
        return responseText ? JSON.parse(responseText) : { success: true };
      } catch (error: any) {
        console.error("Donation submission failed detail:", {
          status: error.status,
          message: error.message || "No message",
          errors: error.errors,
          fullError: error
        });
        throw error;
      }
    }
    
    console.log("Mocking donation submission:", Object.fromEntries(donation.entries()));
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, message: "Donation submitted successfully (mock)" }), 1000));
  },

  async addLibraryMember(member: FormData): Promise<any> {
    if (!USE_MOCK_DATA && API_BASE_URL) {
      try {
        const response = await fetch(`${API_BASE_URL}/libraries/add-library-member`, {
          method: 'POST',
          body: member,
        });
        if (!response.ok) {
          const errorText = await response.text();
          let errorData;
          try {
            errorData = errorText ? JSON.parse(errorText) : null;
          } catch (e) {
            // If not JSON, throw the raw text
            console.error("Library API Error (Non-JSON):", errorText);
            throw new Error(`API error (${response.status}): ${errorText || response.statusText}`);
          }
          console.error("Library API Error (JSON):", errorData);
          throw errorData || new Error(`API error (${response.status}): ${response.statusText}`);
        }
        
        const responseText = await response.text();
        return responseText ? JSON.parse(responseText) : { success: true };
      } catch (error: any) {
        console.error("Library membership submission failed!");
        console.error("Status:", error?.status);
        console.error("Message:", error?.message || error?.title || error?.toString());
        if (error?.errors) {
          console.error("Validation Errors:", error.errors);
        }
        console.group("Full Error Details");
        console.log(error);
        console.groupEnd();
        throw error;
      }
    }
    
    console.log("Mocking library membership submission:", Object.fromEntries(member.entries()));
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, message: "Library membership submitted successfully (mock)" }), 1000));
  },
};
