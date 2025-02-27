// src/common/utilities.ts

/**
 * Joins classNames together, filtering out falsy values
 */
export function classNames(...classes: any[]): string {
    return classes.filter(Boolean).join(' ');
  }
  
  /**
   * Checks if a value is empty (null, undefined, empty string, or empty array)
   */
  export function isEmpty(value: any): boolean {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') return value.trim() === '';
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
  }
  
  /**
   * Truncates text to a specified length
   */
  export function truncateText(text: string, maxLength: number): string {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  }
  
  /**
   * Format a date string to a human-readable format
   */
  export function formatDate(dateString: string): string {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  /**
   * Calculates reading time for content
   */
  export function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  }
  
  /**
   * Strips HTML tags from text
   */
  export function stripHtml(html: string): string {
    return html.replace(/<[^>]*>?/gm, '');
  }