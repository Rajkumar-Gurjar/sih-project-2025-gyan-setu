import { db } from '../storage/dexie.db';
import { syncService } from '../api/sync.service';
import type { Progress, ProgressEvent } from '../../types';

export const syncManager = {
  /**
   * Orchestrates the sync process.
   */
  async performSync(userId: string, token: string, lastSyncToken: string) {
    try {
      const localProgress = await db.progress
        .where('userId')
        .equals(userId)
        .toArray();

      const response = await syncService.sync({
        lastSyncToken,
        localProgress,
      }, token);

      for (const serverItem of response.serverChanges) {
        const localItem = await db.progress.get([userId, serverItem.lessonId]);
        
        if (localItem) {
          const merged = this.mergeProgress(localItem, serverItem);
          await db.progress.put(merged);
        } else {
          await db.progress.put(serverItem);
        }
      }

      return response.newSyncToken;
    } catch (error) {
      console.error('Sync failed:', error);
      throw error;
    }
  },

  /**
   * Implements Cumulative Merge logic for lesson progress.
   */
  mergeProgress(local: Progress, server: Progress): Progress {
    const combinedEvents = this.mergeEvents(
      local.completionEvents || [],
      server.completionEvents || []
    );

    const status = (local.status === 'completed' || server.status === 'completed') 
      ? 'completed' 
      : (local.status === 'in_progress' || server.status === 'in_progress') 
        ? 'in_progress' 
        : 'not_started';

    return {
      ...server,
      userId: local.userId,
      status,
      lastAccessed: Math.max(local.lastAccessed, server.lastAccessed),
      score: Math.max(local.score || 0, server.score || 0),
      completionEvents: combinedEvents,
    };
  },

  /**
   * Helper to merge arrays of completion events by taking the union based on timestamp.
   */
  mergeEvents(local: ProgressEvent[], server: ProgressEvent[]): ProgressEvent[] {
    const eventMap = new Map<number, ProgressEvent>();
    
    [...local, ...server].forEach(event => {
      // If we have same timestamp but different types, we should probably keep both or prioritize 'complete'
      // For now, union by timestamp is fine as per requirements.
      eventMap.set(event.timestamp, event);
    });

    return Array.from(eventMap.values()).sort((a, b) => b.timestamp - a.timestamp);
  }
};
