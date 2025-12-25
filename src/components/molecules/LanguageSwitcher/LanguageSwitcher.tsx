import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import { useAuthStore } from '../../../store/useAuthStore';
import type { SupportedLanguage } from '../../../types';

/**
 * LanguageSwitcher molecule allows users to toggle between supported languages.
 * It updates both the i18next instance and the user's preference in the AuthStore.
 */
export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const { user, updateUser } = useAuthStore();

  const languages: { code: SupportedLanguage; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  ];

  const handleLanguageChange = (lang: SupportedLanguage) => {
    i18n.changeLanguage(lang);
    if (user) {
      updateUser({ languagePreference: lang });
    }
  };

  const currentLang = (i18n.language?.split('-')[0] || 'en') as SupportedLanguage;

  return (
    <div className="dropdown dropdown-end">
      <div 
        tabIndex={0} 
        role="button" 
        className="btn btn-ghost btn-sm gap-2 normal-case font-medium"
        aria-label="Select Language"
      >
        <Languages size={18} className="opacity-70" />
        <span className="hidden sm:inline">
          {languages.find((l) => l.code === currentLang)?.native || 'Language'}
        </span>
        <span className="sm:hidden uppercase">{currentLang}</span>
      </div>
      <ul 
        tabIndex={0} 
        className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52 mt-2 border border-base-200"
      >
        <li className="menu-title px-4 py-2 text-xs uppercase tracking-widest opacity-50">
          Choose Language
        </li>
        {languages.map((lang) => (
          <li key={lang.code}>
            <button
              className={`flex justify-between items-center ${
                currentLang === lang.code ? 'active' : ''
              }`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <div className="flex flex-col items-start">
                <span className="font-bold">{lang.native}</span>
                <span className="text-[10px] opacity-60 uppercase">{lang.label}</span>
              </div>
              {currentLang === lang.code && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
