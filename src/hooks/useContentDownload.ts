import { useState, useCallback } from 'react';
import { db } from '../services/storage/dexie.db';
import type { Lesson } from '../types';

const CACHE_NAME = 'gyan-setu-content';

export const useContentDownload = (lesson: Lesson) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const downloadLesson = useCallback(async () => {
    if (lesson.downloadStatus === 'downloaded' || isDownloading) return;

    setIsDownloading(true);
    setProgress(0);

    try {
      // 1. Update status to pending in DB
      await db.lessons.update(lesson.id, { downloadStatus: 'pending' });

      const cache = await caches.open(CACHE_NAME);
      const mediaUrls = lesson.media.map((m) => m.url);
      
      if (mediaUrls.length === 0) {
        setProgress(100);
      } else {
        let completed = 0;
        const total = mediaUrls.length;

        // Download media items and add to cache
        for (const url of mediaUrls) {
          try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to fetch ${url}`);
            
            // Clone the response because it can only be consumed once
            await cache.put(url, response.clone());
            
            completed++;
            setProgress(Math.round((completed / total) * 100));
          } catch (err) {
            console.error(`Failed to download media: ${url}`, err);
            throw err;
          }
        }
      }

      // 2. Update status to downloaded and set lastAccessed
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
  }, [lesson.id, lesson.downloadStatus, lesson.media, isDownloading]);

  const removeDownload = useCallback(async () => {
    try {
      const cache = await caches.open(CACHE_NAME);
      const mediaUrls = lesson.media.map((m) => m.url);
      
      await Promise.all(mediaUrls.map(url => cache.delete(url)));
      
      await db.lessons.update(lesson.id, { 
        downloadStatus: 'not_downloaded' 
      });
      setProgress(0);
    } catch (error) {
      console.error('Remove download failed:', error);
    }
  }, [lesson.id, lesson.media]);

  return {
    isDownloading,
    progress,
    downloadLesson,
    removeDownload
  };
};
