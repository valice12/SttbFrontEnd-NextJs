// src/lib/image-utils.ts

/**
 * Formats an image path to either use the local /assets directory (if hardcoded)
 * or fetch from the backend API with the format /uploads/images/{nama_file}.
 *
 * @param path The relative or absolute image path
 * @returns The fully qualified image URL format
 */
export function getImageUrl(path: string | null | undefined, module: string = 'general'): string {
  if (!path) {
    return '/assets/logo.png'; // Fallback to an existing local asset if null
  }

  // For hardcoded local images taking priority
  if (path.startsWith('/assets/')) {
    return path;
  }

  // Handle full external URLs
  if (path.startsWith('http')) {
    return path;
  }

  // Define backend base URL 
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5066/api/v1';
  const backendBaseUrl = apiUrl.split('/api/')[0] || 'http://localhost:5066';

  // Normalize path
  let cleanPath = path.replace(/^\/+/, '');
  
  // If the path already contains Uploads or uploads, we just normalize it
  if (cleanPath.toLowerCase().startsWith('uploads/')) {
    return `${backendBaseUrl}/${cleanPath.toLowerCase()}`;
  }

  // Otherwise, we assume it's a filename and prepend the full standardized path
  // based on the module provided (following the CMS pattern)
  return `${backendBaseUrl}/uploads/images/${module.toLowerCase()}/${cleanPath}`;
}
