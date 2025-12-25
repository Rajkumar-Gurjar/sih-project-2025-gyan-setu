import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PinInput } from './PinInput';

describe('PinInput Component', () => {
  it('renders with label and placeholder', () => {
    render(<PinInput value="" onChange={() => {}} label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter 4-digit PIN')).toBeInTheDocument();
  });

  it('calls onChange with only numeric characters', () => {
    const onChange = vi.fn();
    render(<PinInput value="" onChange={onChange} />);
    const input = screen.getByPlaceholderText('Enter 4-digit PIN');

    fireEvent.change(input, { target: { value: '12ab' } });
    expect(onChange).toHaveBeenCalledWith('12');
  });

  it('constrains input to 4 characters', () => {
    const onChange = vi.fn();
    render(<PinInput value="" onChange={onChange} />);
    const input = screen.getByPlaceholderText('Enter 4-digit PIN');

    fireEvent.change(input, { target: { value: '12345' } });
    expect(onChange).toHaveBeenCalledWith('1234');
  });

  it('shows error message when provided', () => {
    render(<PinInput value="" onChange={() => {}} error="Required field" />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter 4-digit PIN')).toHaveClass('input-error');
  });
});
