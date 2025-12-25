import { render, screen, waitFor } from '@testing-library/react';
import { DownloadManager } from './DownloadManager';
import { db } from '../../../services/storage/dexie.db';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import type { Lesson } from '../../../types';

const mockLessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: { en: 'Test Lesson 1', hi: 'परीक्षण पाठ 1', pa: 'ਟੈਸਟ ਪਾਠ 1' },
    content: { en: '', hi: '', pa: '' },
    media: [{ type: 'image', url: '/test1.jpg', size: 1024 * 1024 }],
    subject: 'Math',
    grade: 1,
    downloadStatus: 'downloaded',
    lastAccessed: Date.now()
  }
];

describe('DownloadManager', () => {
  beforeEach(async () => {
    await db.lessons.clear();
    
    // Mock Cache API
    global.caches = {
      open: vi.fn().mockResolvedValue({
        put: vi.fn().mockResolvedValue(undefined),
        delete: vi.fn().mockResolvedValue(true)
      }),
    } as unknown as CacheStorage;
  });

  it('renders loading state initially', () => {
    render(<DownloadManager />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('renders empty state when no downloads', async () => {
    render(<DownloadManager />);
    await waitFor(() => {
      expect(screen.getByText(/No downloads yet/i)).toBeInTheDocument();
    });
  });

  it('renders list of downloaded lessons', async () => {
    await db.lessons.bulkAdd(mockLessons);
    render(<DownloadManager />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Lesson 1')).toBeInTheDocument();
      expect(screen.getByText(/1.0 MB \/ 500 MB/i)).toBeInTheDocument();
    });
  });
});
