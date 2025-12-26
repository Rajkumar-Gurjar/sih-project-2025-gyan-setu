import { renderHook, act } from '@testing-library/react';
import { useOfflineSync } from './useOfflineSync';
import { useAuthStore } from '../store/useAuthStore';
import { syncManager } from '../services/sync/syncManager';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import type { User } from '../types';

vi.mock('../services/sync/syncManager', () => ({
  syncManager: {
    performSync: vi.fn(),
  },
}));

describe('useOfflineSync', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuthStore.getState().logout();
    
    // Reset navigator.onLine mock if needed, but usually it's true in jsdom
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      value: true,
      writable: true,
    });
  });

  it('should reflect initial online status', () => {
    const { result } = renderHook(() => useOfflineSync());
    expect(result.current.isOnline).toBe(true);
  });

  it('should trigger sync when going online if authenticated', async () => {
    const mockUser: User = { 
      id: 'u1', 
      syncToken: 't1',
      name: 'Test',
      phone: '1234567890',
      role: 'student',
      languagePreference: 'en'
    };
    useAuthStore.getState().login(mockUser, 'token');
    
    vi.mocked(syncManager.performSync).mockResolvedValue('t2');

    renderHook(() => useOfflineSync());

    // Initially it triggers on mount if online
    expect(syncManager.performSync).toHaveBeenCalledWith('u1', 'token', 't1');

    // Reset mock to test event
    vi.mocked(syncManager.performSync).mockClear();
    
    // Simulate going offline then online
    await act(async () => {
      window.dispatchEvent(new Event('offline'));
    });
    
    await act(async () => {
      window.dispatchEvent(new Event('online'));
    });

    expect(syncManager.performSync).toHaveBeenCalledWith('u1', 'token', 't2');
  });

  it('should not trigger sync if not authenticated', async () => {
    vi.mocked(syncManager.performSync).mockResolvedValue('t2');
    
    renderHook(() => useOfflineSync());

    await act(async () => {
      window.dispatchEvent(new Event('online'));
    });

    expect(syncManager.performSync).not.toHaveBeenCalled();
  });

  it('should update sync token in store on success', async () => {
    const mockUser: User = { 
      id: 'u1', 
      syncToken: 't1',
      name: 'Test',
      phone: '1234567890',
      role: 'student',
      languagePreference: 'en'
    };
    useAuthStore.getState().login(mockUser, 'token');
    
    vi.mocked(syncManager.performSync).mockResolvedValue('new-token');

    const { result } = renderHook(() => useOfflineSync());

    await act(async () => {
      await result.current.triggerSync();
    });

    expect(useAuthStore.getState().user?.syncToken).toBe('new-token');
  });

  it('should handle sync errors', async () => {
    const mockUser: User = { 
      id: 'u1', 
      syncToken: 't1',
      name: 'Test',
      phone: '1234567890',
      role: 'student',
      languagePreference: 'en'
    };
    useAuthStore.getState().login(mockUser, 'token');
    
    vi.mocked(syncManager.performSync).mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useOfflineSync());

    await act(async () => {
      await result.current.triggerSync();
    });

    expect(result.current.lastSyncError).toBe('Network error');
    expect(result.current.isSyncing).toBe(false);
  });
});