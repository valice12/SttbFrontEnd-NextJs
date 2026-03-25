// src/lib/image-utils.ts

/**
 * Formats an image path to either use the local /assets directory (if hardcoded)
 * or fetch from the backend API with the format /uploads/images/{nama_file}.
 *
 * @param path The relative or absolute image path
 * @returns The fully qualified image URL format
 */
export function getImageUrl(path: string | null | undefined, module: string = 'general'): string {
  if (!path) return '/assets/Placeholder.png';

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
  let backendBaseUrl = apiUrl.split('/api/')[0];
  if (!backendBaseUrl) {
    backendBaseUrl = 'http://localhost:5066';
  }

  // Normalize path and ensure lowercase "uploads"
  let cleanPath = path.replace(/^\/+/, '');
  if (cleanPath.toLowerCase().startsWith('uploads/')) {
    // If it already starts with uploads, just ensure it's lowercase
    return `${backendBaseUrl}/uploads/${cleanPath.substring(8).toLowerCase()}`;
  }

  // Extract just the filename
  const parts = path.split(/[\/\\]/);
  const filename = parts[parts.length - 1];

  return `http://localhost:5066/wwwroot/Uploads/images/${filename}`;
}
