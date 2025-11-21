/**
 * Utility Functions - Formatting & Helpers
 */

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phoneNumber: string): string {
  // Remove non-digit characters
  const digits = phoneNumber.replace(/\D/g, '');

  // Format based on length
  if (digits.length === 10) {
    // US format: (XXX) XXX-XXXX
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  } else if (digits.length === 11 && digits[0] === '1') {
    // US with country code: +1 (XXX) XXX-XXXX
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  } else if (digits.length > 10) {
    // International: +XX XXX XXX XXXX
    return `+${digits.slice(0, digits.length - 10)} ${digits.slice(-10, -7)} ${digits.slice(-7, -4)} ${digits.slice(-4)}`;
  }

  return phoneNumber;
}

/**
 * Format duration in milliseconds to HH:MM:SS
 */
export function formatDuration(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Generate unique call ID
 */
export function generateCallId(): string {
  return `call_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Validate phone number
 */
export function validatePhoneNumber(phoneNumber: string): boolean {
  // Remove non-digit characters
  const digits = phoneNumber.replace(/\D/g, '');

  // Must be at least 10 digits
  return digits.length >= 10;
}

/**
 * Clean phone number for API calls
 */
export function cleanPhoneNumber(phoneNumber: string): string {
  // Keep only digits and leading +
  let cleaned = phoneNumber.replace(/[^0-9+]/g, '');

  // Ensure it starts with +
  if (!cleaned.startsWith('+')) {
    cleaned = '+' + cleaned;
  }

  return cleaned;
}

/**
 * Format timestamp to readable time
 */
export function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Delay/sleep function
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
