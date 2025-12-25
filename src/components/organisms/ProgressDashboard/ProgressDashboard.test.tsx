import { render, screen, waitFor } from '@testing-library/react';
import { ProgressDashboard } from './ProgressDashboard';
import { useProgressStore } from '../../../store/useProgressStore';
import { useAuthStore } from '../../../store/useAuthStore';
import { db } from '../../../services/storage/dexie.db';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../../store/useProgressStore', () => ({
  useProgressStore: vi.fn(),
}));

vi.mock('../../../store/useAuthStore', () => ({
  useAuthStore: vi.fn(),
}));

describe('ProgressDashboard', () => {
  const mockUser = { id: 'user-123', name: 'Test Student' };
  const mockProgress = {
    'lesson-1': {
      lessonId: 'lesson-1',
      status: 'completed',
      score: 90,
      lastAccessed: Date.now(),
    },
    'lesson-2': {
      lessonId: 'lesson-2',
      status: 'in_progress',
      score: 40,
      lastAccessed: Date.now() - 10000,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useAuthStore as any).mockReturnValue({ user: mockUser });
    (useProgressStore as any).mockReturnValue({
      progress: mockProgress,
      fetchProgress: vi.fn(),
      isLoading: false,
    });
  });

  it('renders summary statistics correctly', async () => {
    render(
      <MemoryRouter>
        <ProgressDashboard />
      </MemoryRouter>
    );

    expect(screen.getByText('90%')).toBeInTheDocument(); // Score
    // Average score calculation: (90 + 40) / 2 = 65
    expect(screen.getByText('65%')).toBeInTheDocument(); 
    expect(screen.getByText('1')).toBeInTheDocument(); // Completed count (lesson-1)
  });

  it('renders "no activity" message when progress is empty', () => {
    (useProgressStore as any).mockReturnValue({
      progress: {},
      fetchProgress: vi.fn(),
      isLoading: false,
    });

    render(
      <MemoryRouter>
        <ProgressDashboard />
      </MemoryRouter>
    );

    expect(screen.getByText(/No progress recorded yet/i)).toBeInTheDocument();
  });

  it('shows loading spinner when isLoading is true', () => {
    (useProgressStore as any).mockReturnValue({
      progress: {},
      fetchProgress: vi.fn(),
      isLoading: true,
    });

    render(
      <MemoryRouter>
        <ProgressDashboard />
      </MemoryRouter>
    );

    expect(document.querySelector('.loading-spinner')).toBeInTheDocument();
  });
});
