import { db } from '../services/storage/dexie.db.ts';

const STORAGE_LIMIT_MB = 500;
const STORAGE_LIMIT_BYTES = STORAGE_LIMIT_MB * 1024 * 1024;

export const lruCleanup = {
  /**
   * Checks if storage usage exceeds the limit and deletes oldest lessons if necessary.
   * Returns the amount of bytes freed.
   */
  async runCleanup(): Promise<number> {
    const downloadedLessons = await db.lessons
      .where('download_status')
      .equals('downloaded')
      .sortBy('last_accessed');

    let totalUsage = downloadedLessons.reduce((acc, lesson) => {
      const mediaSize = lesson.media.reduce((sum, item) => sum + (item.size || 0), 0);
      return acc + mediaSize;
    }, 0);

    let bytesFreed = 0;

    if (totalUsage > STORAGE_LIMIT_BYTES) {
      for (const lesson of downloadedLessons) {
        if (totalUsage <= STORAGE_LIMIT_BYTES) break;

        const lessonSize = lesson.media.reduce((sum, item) => sum + (item.size || 0), 0);
        
        // Update lesson status to 'not_downloaded'
        // In a real app, this would also involve clearing actual Cache API storage
        await db.lessons.update(lesson.id, { download_status: 'not_downloaded' });
        
        totalUsage -= lessonSize;
        bytesFreed += lessonSize;
      }
    }

    return bytesFreed;
  }
};
