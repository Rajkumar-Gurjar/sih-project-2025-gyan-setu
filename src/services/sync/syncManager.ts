import type { Progress, CompletionEvent } from '../../types';

export const syncManager = {
  /**
   * Implements Cumulative Merge logic for lesson progress.
   * Combines local and server completion events, taking the union of all events.
   */
  mergeProgress(local: Progress, server: Progress): Progress {
    const combinedEvents = this.mergeEvents(
      local.completionEvents || [],
      server.completionEvents || []
    );

    // If either is completed, the result is completed
    const status = (local.status === 'completed' || server.status === 'completed') 
      ? 'completed' 
      : (local.status === 'in_progress' || server.status === 'in_progress') 
        ? 'in_progress' 
        : 'not_started';

    return {
      ...server, // Keep server-side user/lesson IDs
      status,
      lastAccessed: Math.max(local.lastAccessed, server.lastAccessed),
      quizScore: Math.max(local.quizScore || 0, server.quizScore || 0),
      completionEvents: combinedEvents,
    };
  },

  /**
   * Helper to merge arrays of completion events by taking the union based on timestamp.
   * In a more complex scenario, this might need to handle duplicate events for the same lesson
   * if they happen at different times, but for now we take all unique timestamps.
   */
  mergeEvents(local: CompletionEvent[], server: CompletionEvent[]): CompletionEvent[] {
    const eventMap = new Map<number, CompletionEvent>();
    
    [...local, ...server].forEach(event => {
      eventMap.set(event.completedAt, event);
    });

    return Array.from(eventMap.values()).sort((a, b) => b.completedAt - a.completedAt);
  }
};
