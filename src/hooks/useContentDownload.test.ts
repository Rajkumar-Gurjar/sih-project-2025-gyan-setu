import { renderHook, act } from '@testing-library/react';
import { useContentDownload } from './useContentDownload';
import { db } from '../services/storage/dexie.db';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import type { Lesson } from '../types';

const mockLesson: Lesson = {
  id: 'lesson-1',
  title: { en: 'Test Lesson', hi: 'परीक्षण पाठ', pa: 'ਟੈਸਟ ਪਾਠ' },
  content: { en: 'Content', hi: 'सामग्री', pa: 'ਸਮੱਗਰੀ' },
  media: [
    { type: 'image', url: '/test-image.jpg', size: 1024 },
    { type: 'video', url: '/test-video.mp4', size: 5120 }
  ],
  subject: 'Math',
  grade: 1,
  downloadStatus: 'not_downloaded',
  lastAccessed: Date.now()
};

describe('useContentDownload', () => {
  let cacheMock: {
    put: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
    match: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    await db.lessons.clear();
    await db.lessons.add({ ...mockLesson });

    cacheMock = {
      put: vi.fn().mockResolvedValue(undefined),
      delete: vi.fn().mockResolvedValue(true),
      match: vi.fn().mockResolvedValue(undefined)
    };

    // Mock Cache API
    global.caches = {
      open: vi.fn().mockResolvedValue(cacheMock),
      delete: vi.fn().mockResolvedValue(true),
      has: vi.fn().mockResolvedValue(true),
      keys: vi.fn().mockResolvedValue([]),
      match: vi.fn().mockResolvedValue(undefined)
    } as unknown as CacheStorage;

    // Mock fetch
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      clone: () => ({}),
    });
  });

  it('should download a lesson and update status', async () => {
    const { result } = renderHook(() => useContentDownload(mockLesson));

    await act(async () => {
      await result.current.downloadLesson();
    });

    expect(result.current.progress).toBe(100);
    expect(result.current.isDownloading).toBe(false);

    const updatedLesson = await db.lessons.get(mockLesson.id);
    expect(updatedLesson?.downloadStatus).toBe('downloaded');
    expect(cacheMock.put).toHaveBeenCalledTimes(2);
  });

  it('should handle download failure', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false
    });

    const { result } = renderHook(() => useContentDownload(mockLesson));

    await act(async () => {
      await result.current.downloadLesson();
    });

    expect(result.current.isDownloading).toBe(false);
    const updatedLesson = await db.lessons.get(mockLesson.id);
    expect(updatedLesson?.downloadStatus).toBe('not_downloaded');
  });

  it('should remove downloaded content', async () => {
    await db.lessons.update(mockLesson.id, { downloadStatus: 'downloaded' });
    const downloadedLesson = { ...mockLesson, downloadStatus: 'downloaded' as const };

    const { result } = renderHook(() => useContentDownload(downloadedLesson));

    await act(async () => {
      await result.current.removeDownload();
    });

    expect(cacheMock.delete).toHaveBeenCalledTimes(2);
    const updatedLesson = await db.lessons.get(mockLesson.id);
    expect(updatedLesson?.downloadStatus).toBe('not_downloaded');
  });
});
