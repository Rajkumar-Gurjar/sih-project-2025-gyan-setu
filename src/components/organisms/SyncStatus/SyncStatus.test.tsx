import { render, screen, fireEvent } from '@testing-library/react';
import { SyncStatus } from './SyncStatus';
import { useOfflineSync } from '../../../hooks/useOfflineSync';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('../../../hooks/useOfflineSync', () => ({
  useOfflineSync: vi.fn(),
}));

type UseOfflineSyncReturn = {
  isOnline: boolean;
  isSyncing: boolean;
  lastSyncError: string | null;
  triggerSync: () => Promise<void>;
};

describe('SyncStatus', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders online status correctly', () => {
    vi.mocked(useOfflineSync).mockReturnValue({
      isOnline: true,
      isSyncing: false,
      lastSyncError: null,
      triggerSync: vi.fn(),
    } as UseOfflineSyncReturn);

    render(<SyncStatus />);
    expect(screen.getByText('sync.online')).toBeInTheDocument();
    expect(screen.getByText('sync.synced')).toBeInTheDocument();
  });

  it('renders offline status correctly', () => {
    vi.mocked(useOfflineSync).mockReturnValue({
      isOnline: false,
      isSyncing: false,
      lastSyncError: null,
      triggerSync: vi.fn(),
    } as UseOfflineSyncReturn);

    render(<SyncStatus />);
    expect(screen.getByText('sync.offline')).toBeInTheDocument();
  });

  it('renders syncing status', () => {
    vi.mocked(useOfflineSync).mockReturnValue({
      isOnline: true,
      isSyncing: true,
      lastSyncError: null,
      triggerSync: vi.fn(),
    } as UseOfflineSyncReturn);

    render(<SyncStatus />);
    expect(screen.getByText('sync.syncing')).toBeInTheDocument();
  });

  it('renders error status and allows retry', () => {
    const triggerSync = vi.fn();
    vi.mocked(useOfflineSync).mockReturnValue({
      isOnline: true,
      isSyncing: false,
      lastSyncError: 'Connection timeout',
      triggerSync,
    } as UseOfflineSyncReturn);

    render(<SyncStatus />);
    expect(screen.getByText('sync.retry')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('sync.retry'));
    expect(triggerSync).toHaveBeenCalled();
  });
});