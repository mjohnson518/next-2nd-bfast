/**
 * Format a date string to a human-readable format
 * @param dateString - ISO date string to format
 * @returns Formatted date string
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
   * Get relative time (e.g., "2 days ago")
   * @param dateString - ISO date string
   * @returns Relative time string
   */
  export function getRelativeTime(dateString: string): string {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    // Convert milliseconds to seconds
    const seconds = Math.floor(diff / 1000);
    
    // Time intervals in seconds
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };
    
    if (seconds < 60) {
      return 'just now';
    }
    
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return interval === 1 
          ? `1 ${unit} ago` 
          : `${interval} ${unit}s ago`;
      }
    }
    
    return formatDate(dateString);
  }
  
  /**
   * Format a date as ISO 8601 string (YYYY-MM-DD)
   * @param date - Date to format
   * @returns Formatted date string
   */
  export function formatISODate(date: Date): string {
    return date.toISOString().split('T')[0];
  }