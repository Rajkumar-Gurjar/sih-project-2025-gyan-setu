import { useState, useCallback } from 'react';
import { db } from '../services/storage/dexie.db';
import { cacheService } from '../services/storage/cache.service';
import { lruCleanup } from '../utils/lru-cleanup';
import type { Lesson } from '../types';

export const useContentDownload = (lesson: Lesson) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const downloadLesson = useCallback(async () => {
    if (lesson.downloadStatus === 'downloaded' || isDownloading) return;

    setIsDownloading(true);
    setProgress(0);

    try {
      // 1. Calculate incoming size and run LRU cleanup if needed
      const lessonSize = lesson.media.reduce((sum, item) => sum + (item.size || 0), 0);
      await lruCleanup.runCleanup(lessonSize);

      // 2. Update status to pending in DB
      await db.lessons.update(lesson.id, { downloadStatus: 'pending' });

      // 3. Use cacheService to download media
      await cacheService.cacheLessonMedia(lesson, (p) => setProgress(p));

      // 4. Update status to downloaded and set lastAccessed
      await db.lessons.update(lesson.id, { 
        downloadStatus: 'downloaded',
        lastAccessed: Date.now()
      });

    } catch (error) {
      console.error('Download failed:', error);
      // Reset status on failure
      await db.lessons.update(lesson.id, { downloadStatus: 'not_downloaded' });
      setProgress(0);
    } finally {
      setIsDownloading(false);
    }
  }, [lesson, isDownloading]);

  const removeDownload = useCallback(async () => {
    try {
      await cacheService.clearLessonCache(lesson);
      setProgress(0);
    } catch (error) {
      console.error('Remove download failed:', error);
    }
  }, [lesson]);

  return {
    isDownloading,
    progress,
    downloadLesson,
    removeDownload
  };
};