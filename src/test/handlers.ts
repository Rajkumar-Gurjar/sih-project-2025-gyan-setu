import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const { phone, pin } = await request.json() as any;
    
    if (phone === '1234567890' && pin === '1234') {
      return HttpResponse.json({
        user: {
          id: '1',
          name: 'Test User',
          phone: '1234567890',
          role: 'student',
          languagePreference: 'en',
        },
        token: 'fake-token',
      });
    }
    
    return new HttpResponse(null, { status: 401 });
  }),

  http.post('/api/auth/register', async ({ request }) => {
    const data = await request.json() as any;
    
    return HttpResponse.json({
      user: {
        id: '2',
        ...data,
      },
      token: 'fake-token-reg',
    });
  }),
];
