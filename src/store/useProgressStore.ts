import { create } from 'zustand';
import { db } from '../services/storage/dexie.db';
import type { Progress, ProgressEvent } from '../types';

export interface ProgressState {
  progress: Record<string, Progress>; // Keyed by lessonId for the current user
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchProgress: (userId: string) => Promise<void>;
  updateLessonProgress: (userId: string, lessonId: string, updates: Partial<Progress>) => Promise<void>;
  addProgressEvent: (userId: string, lessonId: string, event: ProgressEvent) => Promise<void>;
  clearProgress: () => void;
}

export const useProgressStore = create<ProgressState>((set) => ({
  progress: {},
  isLoading: false,
  error: null,

  fetchProgress: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const allProgress = await db.progress.where('userId').equals(userId).toArray();
      const progressMap = allProgress.reduce((acc, item) => {
        acc[item.lessonId] = item;
        return acc;
      }, {} as Record<string, Progress>);
      set({ progress: progressMap, isLoading: false });
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
    }
  },

  updateLessonProgress: async (userId: string, lessonId: string, updates: Partial<Progress>) => {
    try {
      const existing = await db.progress.get([userId, lessonId]);
      const now = Date.now();
      
      const updatedProgress: Progress = existing
        ? { ...existing, ...updates, lastAccessed: now }
        : {
            userId,
            lessonId,
            status: 'not_started',
            score: 0,
            lastAccessed: now,
            completionEvents: [],
            ...updates,
          } as Progress;

      await db.progress.put(updatedProgress);

      set((state) => ({
        progress: {
          ...state.progress,
          [lessonId]: updatedProgress,
        },
      }));
    } catch (err) {
      set({ error: (err as Error).message });
    }
  },

  addProgressEvent: async (userId: string, lessonId: string, event: ProgressEvent) => {
    try {
      const existing = await db.progress.get([userId, lessonId]);
      const now = Date.now();

      let updatedProgress: Progress;
      if (existing) {
        updatedProgress = {
          ...existing,
          completionEvents: [...existing.completionEvents, event],
          lastAccessed: now,
          status: event.type === 'complete' ? 'completed' : existing.status,
        };
      } else {
        updatedProgress = {
          userId,
          lessonId,
          status: event.type === 'complete' ? 'completed' : 'in_progress',
          score: 0,
          lastAccessed: now,
          completionEvents: [event],
        };
      }

      await db.progress.put(updatedProgress);

      set((state) => ({
        progress: {
          ...state.progress,
          [lessonId]: updatedProgress,
        },
      }));
    } catch (err) {
      set({ error: (err as Error).message });
    }
  },

  clearProgress: () => set({ progress: {}, error: null, isLoading: false }),
}));
