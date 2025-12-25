import { describe, it, expect, beforeEach } from 'vitest';
import { useProgressStore } from './useProgressStore';
import { db } from '../services/storage/dexie.db';

describe('useProgressStore', () => {
  const userId = 'user-1';
  const lessonId = 'lesson-1';

  beforeEach(async () => {
    await db.progress.clear();
    useProgressStore.getState().clearProgress();
  });

  it('should fetch progress for a user', async () => {
    const progressData = {
      userId,
      lessonId,
      status: 'completed' as const,
      score: 100,
      lastAccessed: Date.now(),
      completionEvents: [],
    };
    await db.progress.add(progressData);

    await useProgressStore.getState().fetchProgress(userId);

    const state = useProgressStore.getState();
    expect(state.progress[lessonId]).toEqual(progressData);
    expect(state.isLoading).toBe(false);
  });

  it('should update lesson progress', async () => {
    await useProgressStore.getState().updateLessonProgress(userId, lessonId, {
      status: 'in_progress',
      score: 50,
    });

    const state = useProgressStore.getState();
    expect(state.progress[lessonId].status).toBe('in_progress');
    expect(state.progress[lessonId].score).toBe(50);

    const dbData = await db.progress.get([userId, lessonId]);
    expect(dbData?.status).toBe('in_progress');
  });

  it('should add progress events', async () => {
    const event = { type: 'complete' as const, timestamp: Date.now() };
    await useProgressStore.getState().addProgressEvent(userId, lessonId, event);

    const state = useProgressStore.getState();
    expect(state.progress[lessonId].status).toBe('completed');
    expect(state.progress[lessonId].completionEvents).toContainEqual(event);

    const dbData = await db.progress.get([userId, lessonId]);
    expect(dbData?.completionEvents).toContainEqual(event);
  });

  it('should create new progress record if it does not exist in updateLessonProgress', async () => {
    await useProgressStore.getState().updateLessonProgress(userId, 'new-lesson', {
      status: 'completed',
    });

    const state = useProgressStore.getState();
    expect(state.progress['new-lesson'].status).toBe('completed');
    expect(state.progress['new-lesson'].userId).toBe(userId);
  });
});
