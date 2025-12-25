import { db } from './dexie.db';
import type { Lesson } from '../../types';

const CACHE_NAME = 'gyan-setu-content';

export const cacheService = {
  /**
   * Removes a lesson's media from the Cache API and updates its status in the DB.
   */
  async clearLessonCache(lesson: Lesson): Promise<void> {
    try {
      const cache = await caches.open(CACHE_NAME);
      const mediaUrls = lesson.media.map((m) => m.url);
      
      await Promise.all(mediaUrls.map(url => cache.delete(url)));
      
      await db.lessons.update(lesson.id, { 
        downloadStatus: 'not_downloaded' 
      });
    } catch (error) {
      console.error(`Failed to clear cache for lesson ${lesson.id}:`, error);
      throw error;
    }
  },

  /**
   * Adds a lesson's media to the Cache API.
   * This is a low-level method used by hooks or other services.
   */
  async cacheLessonMedia(lesson: Lesson, onProgress?: (progress: number) => void): Promise<void> {
    const cache = await caches.open(CACHE_NAME);
    const mediaUrls = lesson.media.map((m) => m.url);
    
    if (mediaUrls.length === 0) {
      onProgress?.(100);
      return;
    }

    let completed = 0;
    const total = mediaUrls.length;

    for (const url of mediaUrls) {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch ${url}`);
      
      await cache.put(url, response.clone());
      
      completed++;
      onProgress?.(Math.round((completed / total) * 100));
    }
  }
};
