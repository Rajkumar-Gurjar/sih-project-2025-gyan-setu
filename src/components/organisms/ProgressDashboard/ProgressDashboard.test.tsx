import { render, screen } from '@testing-library/react';
import { ProgressDashboard } from './ProgressDashboard';
import { useProgressStore, type ProgressState } from '../../../store/useProgressStore';
import { useAuthStore } from '../../../store/useAuthStore';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import type { AuthState, User } from '../../../types';

vi.mock('../../../store/useProgressStore', () => ({
  useProgressStore: vi.fn(),
}));

vi.mock('../../../store/useAuthStore', () => ({
  useAuthStore: vi.fn(),
}));

describe('ProgressDashboard', () => {
  const mockUser: User = { 
    id: 'user-123', 
    name: 'Test Student',
    phone: '1234567890',
    role: 'student',
    languagePreference: 'en'
  };

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
    vi.mocked(useAuthStore).mockReturnValue({ user: mockUser } as unknown as AuthState);
    vi.mocked(useProgressStore).mockReturnValue({
      progress: mockProgress,
      fetchProgress: vi.fn(),
      isLoading: false,
    } as unknown as ProgressState);
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
    vi.mocked(useProgressStore).mockReturnValue({
      progress: {},
      fetchProgress: vi.fn(),
      isLoading: false,
    } as unknown as ProgressState);

    render(
      <MemoryRouter>
        <ProgressDashboard />
      </MemoryRouter>
    );

    expect(screen.getByText(/No progress recorded yet/i)).toBeInTheDocument();
  });

  it('shows loading spinner when isLoading is true', () => {
    vi.mocked(useProgressStore).mockReturnValue({
      progress: {},
      fetchProgress: vi.fn(),
      isLoading: true,
    } as unknown as ProgressState);

    render(
      <MemoryRouter>
        <ProgressDashboard />
      </MemoryRouter>
    );

    expect(document.querySelector('.loading-spinner')).toBeInTheDocument();
  });
});