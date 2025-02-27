// src/lib/utils/text.ts

// Truncate text to a specific length with ellipsis
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  }
  
  // Generate a reading time estimate based on word count
  export function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200; // Average reading speed
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  }
  
  // Strip HTML tags from text
  export function stripHtml(html: string): string {
    return html.replace(/<[^>]*>?/gm, '');
  }