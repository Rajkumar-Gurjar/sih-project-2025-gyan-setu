import { describe, it, expect } from 'vitest';
import { authService } from './auth.service';

describe('authService', () => {
  describe('login', () => {
    it('successfully logs in with valid credentials', async () => {
      const response = await authService.login({
        phone: '1234567890',
        pin: '1234',
      });

      expect(response.user.name).toBe('Test User');
      expect(response.token).toBe('fake-token');
    });

    it('throws UNAUTHORIZED for invalid credentials', async () => {
      await expect(
        authService.login({
          phone: 'wrong',
          pin: 'wrong',
        })
      ).rejects.toThrow('UNAUTHORIZED');
    });
  });

  describe('register', () => {
    it('successfully registers a new user', async () => {
      const registrationData = {
        name: 'New User',
        phone: '0987654321',
        pin: '5678',
        role: 'student',
      };

      const response = await authService.register(registrationData);

      expect(response.user.name).toBe('New User');
      expect(response.user.phone).toBe('0987654321');
      expect(response.token).toBe('fake-token-reg');
    });
  });
});
