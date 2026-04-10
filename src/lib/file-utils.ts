/**
 * Formats a file path to either use a direct external link (OJS) 
 * or fetch from the backend API with the format /uploads/files/{module}/{nama_file}.
 *
 * @param path The relative or absolute file path
 * @param module The module name (jurnal, buletin, monograf, etc.)
 * @returns The fully qualified file URL
 */
export function getFileUrl(path: string | null | undefined, module: string = 'general'): string {
  if (!path || path === '#') {
    return '';
  }

  // Handle full external URLs (like OJS links)
  if (path.startsWith('http')) {
    return path;
  }

  // Define backend base URL 
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5066/api/v1';
  const backendBaseUrl = apiUrl.replace(/\/api\/v1$/, ''); // Get the root domain

  // Normalize path
  let cleanPath = path.replace(/^\/+/, '');
  
  // If the path already contains Uploads or uploads, we just normalize it
  if (cleanPath.toLowerCase().startsWith('uploads/')) {
    return `${backendBaseUrl}/${cleanPath.toLowerCase()}`;
  }

  // Otherwise, assume it's a filename and prepend the standardized path for FILES
  // Based on the CMS pattern seen in backend controllers
  return `${backendBaseUrl}/uploads/files/${module.toLowerCase()}/${cleanPath}`;
}
