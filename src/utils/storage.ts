/**
 * LocalStorage Utility for Widget Preferences
 */

const STORAGE_KEYS = {
  HAS_SEEN_WELCOME: 'whatsapp_calling_has_seen_welcome',
  LAST_PHONE_NUMBER: 'whatsapp_calling_last_phone',
} as const;

export const storage = {
  /**
   * Check if user has seen the welcome screen
   */
  hasSeenWelcome(): boolean {
    try {
      return localStorage.getItem(STORAGE_KEYS.HAS_SEEN_WELCOME) === 'true';
    } catch {
      return false;
    }
  },

  /**
   * Mark that user has seen the welcome screen
   */
  markWelcomeSeen(): void {
    try {
      localStorage.setItem(STORAGE_KEYS.HAS_SEEN_WELCOME, 'true');
    } catch (error) {
      console.error('Failed to save welcome state:', error);
    }
  },

  /**
   * Reset welcome screen state (for testing)
   */
  resetWelcome(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.HAS_SEEN_WELCOME);
    } catch (error) {
      console.error('Failed to reset welcome state:', error);
    }
  },

  /**
   * Save last dialed phone number
   */
  saveLastPhone(phoneNumber: string): void {
    try {
      localStorage.setItem(STORAGE_KEYS.LAST_PHONE_NUMBER, phoneNumber);
    } catch (error) {
      console.error('Failed to save phone number:', error);
    }
  },

  /**
   * Get last dialed phone number
   */
  getLastPhone(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEYS.LAST_PHONE_NUMBER);
    } catch {
      return null;
    }
  },
};
