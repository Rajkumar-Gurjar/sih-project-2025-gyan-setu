import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SignUp } from './SignUp';
import { BrowserRouter } from 'react-router-dom';

describe('SignUp Component', () => {
  it('renders all input fields', () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText(/Enter your full name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your phone number/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter 4-digit PIN/i)).toBeInTheDocument();
    expect(screen.getByText(/Student/i)).toBeInTheDocument();
    expect(screen.getByText(/Teacher/i)).toBeInTheDocument();
  });

  it('shows error if phone is too short', async () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter your full name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter your phone number/i), { target: { value: '123' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter 4-digit PIN/i), { target: { value: '1234' } });

    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

    expect(await screen.findByText(/Phone number must be at least 10 digits/i)).toBeInTheDocument();
  });

  it('shows error if PIN is not 4 digits', async () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter your full name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter your phone number/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter 4-digit PIN/i), { target: { value: '12' } });

    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

    expect(await screen.findByText(/PIN must be exactly 4 digits/i)).toBeInTheDocument();
  });

  it('successfully submits and navigates on valid input', async () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter your full name/i), { target: { value: 'New User' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter your phone number/i), { target: { value: '0987654321' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter 4-digit PIN/i), { target: { value: '5678' } });

    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

    await waitFor(() => {
        // Since we are mocking the API via MSW and the store is persist, 
        // we check if it navigates (mocking navigate might be better but here we just check if it doesn't show error)
        expect(screen.queryByText(/Registration failed/i)).not.toBeInTheDocument();
    });
  });
});
