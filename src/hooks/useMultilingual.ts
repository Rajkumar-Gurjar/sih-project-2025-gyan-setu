import { useTranslation } from 'react-i18next';
import { useCallback, useMemo } from 'react';
import type { SupportedLanguage } from '../types';
import { useAuthStore } from '../store/useAuthStore';

/**
 * useMultilingual hook provides utilities for handling localized content
 * and language switching throughout the application.
 */
export const useMultilingual = () => {
  const { i18n } = useTranslation();
  const { user, updateUser } = useAuthStore();

  // Current language code (e.g., 'en', 'hi', 'pa')
  const currentLanguage = useMemo(() => 
    (i18n.language?.split('-')[0] || 'en') as SupportedLanguage,
    [i18n.language]
  );

  /**
   * Helper to get localized content from a multi-language record.
   * Fallback order: current -> english -> first available -> null
   */
  const getLocalized = useCallback(<T>(record: Record<SupportedLanguage, T> | undefined): T | null => {
    if (!record) return null;
    
    // 1. Try current language
    if (record[currentLanguage] !== undefined && record[currentLanguage] !== null) {
      return record[currentLanguage];
    }
    
    // 2. Try English fallback
    if (record['en'] !== undefined && record['en'] !== null) {
      return record['en'];
    }
    
    // 3. Try any available language
    const firstAvailable = Object.values(record).find(val => val !== undefined && val !== null);
    return firstAvailable || null;
  }, [currentLanguage]);

  /**
   * Change the application language and persist it to user profile.
   */
  const changeLanguage = useCallback(async (lang: SupportedLanguage) => {
    await i18n.changeLanguage(lang);
    if (user) {
      updateUser({ languagePreference: lang });
    }
  }, [i18n, user, updateUser]);

  return {
    currentLanguage,
    getLocalized,
    changeLanguage,
    isRTL: currentLanguage === 'pa', // Example for RTL support if needed later
  };
};
