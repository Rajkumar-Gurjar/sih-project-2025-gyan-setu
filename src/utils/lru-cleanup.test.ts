import { describe, it, expect, beforeEach } from 'vitest';
import { lruCleanup } from './lru-cleanup';
import { db } from '../services/storage/dexie.db';
import type { Lesson } from '../types';

describe('lruCleanup', () => {
  beforeEach(async () => {
    await db.lessons.clear();
  });

  const createMockLesson = (id: string, lastAccessed: number, sizeMB: number): Lesson => ({
    id,
    title: { en: `Lesson ${id}`, pa: `Lesson ${id}`, hi: `Lesson ${id}` },
    content: { en: 'Content', pa: 'Content', hi: 'Content' },
    media: [{ type: 'video', url: 'url', size: sizeMB * 1024 * 1024 }],
    subject: 'Math',
    grade: 8,
    downloadStatus: 'downloaded',
    lastAccessed,
  });

  it('should not delete anything if usage is below limit', async () => {
    await db.lessons.add(createMockLesson('1', 1000, 100));
    await db.lessons.add(createMockLesson('2', 2000, 200));

    const bytesFreed = await lruCleanup.runCleanup();
    expect(bytesFreed).toBe(0);

    const remaining = await db.lessons.where('downloadStatus').equals('downloaded').toArray();
    expect(remaining).toHaveLength(2);
  });

  it('should delete the oldest lessons when limit is exceeded', async () => {
    // Total 600MB, limit is 500MB
    await db.lessons.add(createMockLesson('1', 1000, 200)); // Oldest
    await db.lessons.add(createMockLesson('2', 2000, 200));
    await db.lessons.add(createMockLesson('3', 3000, 200)); // Newest

    const bytesFreed = await lruCleanup.runCleanup();
    // Should delete lesson '1' (200MB) to bring usage to 400MB
    expect(bytesFreed).toBe(200 * 1024 * 1024);

    const lesson1 = await db.lessons.get('1');
    expect(lesson1?.downloadStatus).toBe('not_downloaded');

    const downloaded = await db.lessons.where('downloadStatus').equals('downloaded').toArray();
    expect(downloaded).toHaveLength(2);
    expect(downloaded.map(l => l.id)).toContain('2');
    expect(downloaded.map(l => l.id)).toContain('3');
  });

  it('should delete multiple lessons if necessary', async () => {
    // Total 700MB, limit 500MB
    await db.lessons.add(createMockLesson('1', 1000, 300)); // Oldest
    await db.lessons.add(createMockLesson('2', 2000, 300));
    await db.lessons.add(createMockLesson('3', 3000, 100)); // Newest

    const bytesFreed = await lruCleanup.runCleanup();
    // Deleting '1' (300MB) leaves 400MB, which is under 500MB.
    expect(bytesFreed).toBe(300 * 1024 * 1024);

    const downloaded = await db.lessons.where('downloadStatus').equals('downloaded').toArray();
    expect(downloaded).toHaveLength(2);
  });
});