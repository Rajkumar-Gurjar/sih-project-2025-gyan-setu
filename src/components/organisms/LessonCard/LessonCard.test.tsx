import { render, screen, fireEvent } from '@testing-library/react';
import { LessonCard } from './LessonCard';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import type { Lesson } from '../../../types';
import * as downloadHook from '../../../hooks/useContentDownload';

const mockLesson: Lesson = {
  id: 'lesson-1',
  title: { en: 'Test Lesson', hi: 'परीक्षण पाठ', pa: 'ਟੈਸਟ ਪਾਠ' },
  content: { en: '', hi: '', pa: '' },
  media: [{ type: 'image', url: '/test.jpg', size: 1024 }],
  subject: 'Math',
  grade: 1,
  downloadStatus: 'not_downloaded',
  lastAccessed: Date.now()
};

describe('LessonCard', () => {
  const mockDownloadLesson = vi.fn();
  const mockRemoveDownload = vi.fn();

  beforeEach(() => {
    vi.spyOn(downloadHook, 'useContentDownload').mockReturnValue({
      isDownloading: false,
      progress: 0,
      downloadLesson: mockDownloadLesson,
      removeDownload: mockRemoveDownload
    });
  });

  it('renders lesson information', () => {
    render(<LessonCard lesson={mockLesson} />);
    expect(screen.getByText('Test Lesson')).toBeInTheDocument();
    expect(screen.getByText(/Math • Grade 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Online Only/i)).toBeInTheDocument();
  });

  it('shows downloaded status when applicable', () => {
    const downloadedLesson = { ...mockLesson, downloadStatus: 'downloaded' as const };
    render(<LessonCard lesson={downloadedLesson} />);
    expect(screen.getByText(/Offline Ready/i)).toBeInTheDocument();
  });

  it('calls downloadLesson when download button clicked', () => {
    render(<LessonCard lesson={mockLesson} />);
    const downloadBtn = screen.getByTitle(/Download for Offline/i);
    fireEvent.click(downloadBtn);
    expect(mockDownloadLesson).toHaveBeenCalled();
  });

  it('calls removeDownload when trash button clicked', () => {
    const downloadedLesson = { ...mockLesson, downloadStatus: 'downloaded' as const };
    render(<LessonCard lesson={downloadedLesson} />);
    const trashBtn = screen.getByTitle(/Remove Offline Content/i);
    fireEvent.click(trashBtn);
    expect(mockRemoveDownload).toHaveBeenCalled();
  });
});
