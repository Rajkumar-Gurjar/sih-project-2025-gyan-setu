import { db } from '../services/storage/dexie.db';
import { cacheService } from '../services/storage/cache.service';
import type { Lesson, MediaItem } from '../types';

const STORAGE_LIMIT_MB = 500;
const STORAGE_LIMIT_BYTES = STORAGE_LIMIT_MB * 1024 * 1024;

export const lruCleanup = {
  /**
   * Checks if storage usage exceeds the limit and deletes oldest lessons if necessary.
   * Returns the amount of bytes freed.
   */
  async runCleanup(incomingSize: number = 0): Promise<number> {
    const downloadedLessons = await db.lessons
      .where('downloadStatus')
      .equals('downloaded')
      .sortBy('lastAccessed');

    let currentUsage = downloadedLessons.reduce((acc: number, lesson: Lesson) => {
      const mediaSize = lesson.media.reduce((sum: number, item: MediaItem) => sum + (item.size || 0), 0);
      return acc + mediaSize;
    }, 0);

    let bytesFreed = 0;

    // Check if current usage + new item size exceeds the limit
    if (currentUsage + incomingSize > STORAGE_LIMIT_BYTES) {
      for (const lesson of downloadedLessons) {
        if (currentUsage + incomingSize <= STORAGE_LIMIT_BYTES) break;

        const lessonSize = lesson.media.reduce((sum: number, item: MediaItem) => sum + (item.size || 0), 0);
        
        // Use cacheService to clear actual media and update DB status
        await cacheService.clearLessonCache(lesson);
        
        currentUsage -= lessonSize;
        bytesFreed += lessonSize;
      }
    }

    return bytesFreed;
  },

  /**
   * Helper to calculate current storage usage in bytes.
   */
  async calculateUsage(): Promise<number> {
    const downloadedLessons = await db.lessons
      .where('downloadStatus')
      .equals('downloaded')
      .toArray();

    return downloadedLessons.reduce((acc: number, lesson: Lesson) => {
      return acc + lesson.media.reduce((sum: number, item: MediaItem) => sum + (item.size || 0), 0);
    }, 0);
  }
};