import { useEffect, useState, useCallback, useRef } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { syncManager } from '../services/sync/syncManager';

/**
 * useOfflineSync hook manages background synchronization when the device
 * reconnects to the internet. It leverages the syncManager for merging logic.
 */
export const useOfflineSync = () => {
  const { user, token, isAuthenticated, updateUser } = useAuthStore();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncError, setLastSyncError] = useState<string | null>(null);
  
  // Use a ref to prevent concurrent sync attempts
  const syncInProgress = useRef(false);

  const triggerSync = useCallback(async () => {
    const { user: currentUser, token: currentToken, isAuthenticated: currentAuth } = useAuthStore.getState();

    if (!currentAuth || !currentUser || !currentToken || syncInProgress.current || !navigator.onLine) {
      return;
    }

    syncInProgress.current = true;
    setIsSyncing(true);
    setLastSyncError(null);

    try {
      const newSyncToken = await syncManager.performSync(
        currentUser.id,
        currentToken,
        currentUser.syncToken || ''
      );
      
      if (newSyncToken) {
        updateUser({ syncToken: newSyncToken });
      }
    } catch (error) {
      console.error('Background sync failed:', error);
      setLastSyncError((error as Error).message);
    } finally {
      syncInProgress.current = false;
      setIsSyncing(false);
    }
  }, [updateUser]);

  // Handle network status changes
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      triggerSync();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [triggerSync]);

  // Trigger sync on mount or when becoming online/authenticated
  useEffect(() => {
    if (isOnline && isAuthenticated) {
      triggerSync();
    }
  }, [isOnline, isAuthenticated, triggerSync]);

  return {
    isOnline,
    isSyncing,
    lastSyncError,
    triggerSync,
  };
};
