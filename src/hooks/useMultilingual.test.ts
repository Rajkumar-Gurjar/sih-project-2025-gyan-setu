import { renderHook, act } from '@testing-library/react';
import { useMultilingual } from './useMultilingual';
import { describe, it, expect, beforeEach } from 'vitest';
import i18n from '../i18n/config';
import type { SupportedLanguage } from '../types';

describe('useMultilingual', () => {
    beforeEach(async () => {
        await i18n.changeLanguage('en');
    });

    it('returns the current language', () => {
        const { result } = renderHook(() => useMultilingual());
        expect(result.current.currentLanguage).toBe('en');
    });

    it('gets localized content correctly with fallbacks', async () => {
        const { result } = renderHook(() => useMultilingual());

        const record: Record<SupportedLanguage, string> = {
            en: 'English',
            hi: 'Hindi',
            pa: 'Punjabi'
        };

        // Current is English
        expect(result.current.getLocalized(record)).toBe('English');

        // Change to Hindi
        await act(async () => {
            await result.current.changeLanguage('hi');
        });
        expect(result.current.currentLanguage).toBe('hi');
        expect(result.current.getLocalized(record)).toBe('Hindi');

        // Test fallback (missing Punjabi, should get English)
        const recordPartial: Partial<Record<SupportedLanguage, string>> = {
            en: 'English Fallback',
            hi: 'Hindi'
        };
        
        await act(async () => {
            await result.current.changeLanguage('pa');
        });
        expect(result.current.getLocalized(recordPartial as Record<SupportedLanguage, string>)).toBe('English Fallback');
    });

    it('handles null/undefined records', () => {
        const { result } = renderHook(() => useMultilingual());
        expect(result.current.getLocalized(undefined)).toBeNull();
    });
});
