import { describe, it, expect, beforeEach } from 'vitest';
import { syncManager } from './syncManager';
import { db } from '../storage/dexie.db';
import { server } from '../../test/server';
import { http, HttpResponse } from 'msw';
import type { Progress } from '../../types';

describe('syncManager', () => {
  beforeEach(async () => {
    await db.progress.clear();
    await db.users.clear();
  });

  describe('mergeProgress', () => {
    it('should merge status correctly (completed wins)', () => {
      const local: Progress = {
        userId: 'u1',
        lessonId: 'l1',
        status: 'in_progress',
        lastAccessed: 1000,
        score: 0,
        completionEvents: [],
      };
      const server: Progress = {
        userId: 'u1',
        lessonId: 'l1',
        status: 'completed',
        lastAccessed: 2000,
        score: 80,
        completionEvents: [{ type: 'complete', timestamp: 2000 }],
      };

      const result = syncManager.mergeProgress(local, server);
      expect(result.status).toBe('completed');
      expect(result.lastAccessed).toBe(2000);
      expect(result.score).toBe(80);
      expect(result.completionEvents).toHaveLength(1);
    });

    it('should combine completion events and remove duplicates', () => {
      const local: Progress = {
        userId: 'u1',
        lessonId: 'l1',
        status: 'completed',
        lastAccessed: 1500,
        score: 70,
        completionEvents: [{ type: 'complete', timestamp: 1000 }],
      };
      const server: Progress = {
        userId: 'u1',
        lessonId: 'l1',
        status: 'completed',
        lastAccessed: 2000,
        score: 90,
        completionEvents: [
          { type: 'complete', timestamp: 1000 },
          { type: 'complete', timestamp: 2000 }
        ],
      };

      const result = syncManager.mergeProgress(local, server);
      expect(result.completionEvents).toHaveLength(2);
      expect(result.completionEvents[0].timestamp).toBe(2000);
      expect(result.completionEvents[1].timestamp).toBe(1000);
      expect(result.score).toBe(90);
    });
  });

  describe('performSync', () => {
    it('should update local DB with server changes', async () => {
      const userId = 'user123';
      const token = 'valid-token';
      const lastSyncToken = 'token-old';

      // Setup MSW for this specific test
      server.use(
        http.post('/api/sync', () => {
          return HttpResponse.json({
            serverChanges: [
              {
                userId,
                lessonId: 'lessonA',
                status: 'completed',
                score: 100,
                lastAccessed: 5000,
                completionEvents: [{ type: 'complete', timestamp: 5000 }],
              }
            ],
            newSyncToken: 'token-new',
          });
        })
      );

      // Add local progress
      await db.progress.add({
        userId,
        lessonId: 'lessonA',
        status: 'in_progress',
        lastAccessed: 1000,
        score: 0,
        completionEvents: [],
      });

      const newToken = await syncManager.performSync(userId, token, lastSyncToken);

      expect(newToken).toBe('token-new');
      
      const updatedProgress = await db.progress.get([userId, 'lessonA']);
      expect(updatedProgress?.status).toBe('completed');
      expect(updatedProgress?.score).toBe(100);
      expect(updatedProgress?.lastAccessed).toBe(5000);
    });
  });
});