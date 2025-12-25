import type { User } from '../../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  phone: string;
  pin: string;
}

export interface RegisterRequest {
  name: string;
  phone: string;
  pin: string;
  role: string;
}

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('UNAUTHORIZED');
      }
      throw new Error('LOGIN_FAILED');
    }

    return response.json();
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('REGISTRATION_FAILED');
    }

    return response.json();
  },
};
