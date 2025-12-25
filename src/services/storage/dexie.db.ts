import Dexie, { type Table } from 'dexie';
import type { User, Lesson, Progress } from '../../types';

export interface OfflineQueueItem {
  id?: number;
  type: 'progress_sync' | 'profile_update';
  data: unknown;
  timestamp: number;
}

export class GyanSetuDatabase extends Dexie {
  users!: Table<User>;
  lessons!: Table<Lesson>;
  progress!: Table<Progress>;
  offline_queue!: Table<OfflineQueueItem>;

  constructor() {
    super('GyanSetuDB');
    this.version(1).stores({
      users: 'id, &phone',
      lessons: 'id, lastAccessed, subject, grade, downloadStatus',
      progress: '[userId+lessonId], userId, lessonId',
      offline_queue: '++id, timestamp'
    });
  }
}

export const db = new GyanSetuDatabase();