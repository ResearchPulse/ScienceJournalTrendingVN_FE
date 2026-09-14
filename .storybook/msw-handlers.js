import { http, HttpResponse, passthrough } from 'msw';

export const mswHandlers = [
  http.get('https://images.unsplash.com/*', () => passthrough()),
  http.get('https://accounts.google.com/*', () => new HttpResponse('', { status: 200 })),
  http.get('*/api/v1/keywords', () => {
    return HttpResponse.json({
      success: true,
      data: [
        {
          keyword_id: 'kw-1',
          display_name: 'Machine Learning',
          article_count: 42,
          topic_name: 'Artificial Intelligence'
        },
        {
          keyword_id: 'kw-2',
          display_name: 'Natural Language Processing',
          article_count: 28,
          topic_name: 'Computer Science'
        }
      ]
    });
  }),
  http.get('*/api/v1/auth/session', () => {
    return HttpResponse.json({
      success: true,
      data: {
        user: {
          id: 'u-1',
          name: 'Demo Researcher',
          email: 'researcher@example.com'
        }
      }
    });
  }),
];
