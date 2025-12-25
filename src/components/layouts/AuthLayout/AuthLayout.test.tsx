import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthLayout } from './AuthLayout';
import { BrowserRouter } from 'react-router-dom';
import { useAuthStore } from '../../../store/useAuthStore';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('AuthLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children via Outlet', () => {
    render(
      <BrowserRouter>
        <AuthLayout />
      </BrowserRouter>
    );

    expect(screen.getByText(/Gyan Setu/i)).toBeInTheDocument();
    expect(screen.getByText(/Empowering Rural Learning/i)).toBeInTheDocument();
  });

  it('redirects to home if authenticated', () => {
    // Set authenticated state
    useAuthStore.setState({ isAuthenticated: true });

    render(
      <BrowserRouter>
        <AuthLayout />
      </BrowserRouter>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
    
    // Reset state
    useAuthStore.setState({ isAuthenticated: false });
  });

  it('does not redirect if not authenticated', () => {
    // Ensure not authenticated
    useAuthStore.setState({ isAuthenticated: false });

    render(
      <BrowserRouter>
        <AuthLayout />
      </BrowserRouter>
    );

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
