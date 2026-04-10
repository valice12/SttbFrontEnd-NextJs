/**
 * File Service Template
 * Utility for handling file-related operations, uploads, and processing.
 */

export const fileService = {
  /**
   * Simulate a file upload to an API
   */
  async uploadFile(file: File, endpoint: string = '/upload'): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header, the browser will set it with the boundary
      });

      if (!response.ok) {
        throw new Error(`Upload Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('File Upload failed:', error);
      throw error;
    }
  },

  /**
   * Helper to format file size
   */
  formatBytes(bytes: number, decimals: number = 2): string {
    if (bytes === 0) {
      return '0 Bytes';
    }

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  },

  /**
   * Helper to get file extension
   */
  getFileExtension(filename: string): string {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
  }
};
