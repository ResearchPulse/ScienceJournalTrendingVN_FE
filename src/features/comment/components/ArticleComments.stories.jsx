import React from 'react';
import { http, HttpResponse } from 'msw';
import ArticleComments from './ArticleComments';

export default {
  title: 'Features/Comment/ArticleComments',
  component: ArticleComments,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const WithComments = {
  args: {
    articleId: 'art-100',
  },
  parameters: {
    msw: {
      handlers: [
        http.get('*/api/v1/articles/art-100/comments', () => {
          return HttpResponse.json({
            success: true,
            data: [
              {
                id: 'c-1',
                user: 'PGS. TS. Trần Minh Tuấn',
                avatar: '',
                content: 'Bài viết có phương pháp luận rất chặt chẽ, kết quả thực nghiệm thuyết phục.',
                created_at: '2025-02-10T14:30:00Z',
              },
              {
                id: 'c-2',
                user: 'Lê Hoàng Nam',
                avatar: '',
                content: 'Cho tôi hỏi tác giả đã thử nghiệm trên tập dữ liệu benchmark ImageNet chưa?',
                created_at: '2025-02-11T09:15:00Z',
              },
            ],
          });
        }),
      ],
    },
  },
};

export const Empty = {
  args: {
    articleId: 'art-empty',
  },
  parameters: {
    msw: {
      handlers: [
        http.get('*/api/v1/articles/art-empty/comments', () => {
          return HttpResponse.json({
            success: true,
            data: [],
          });
        }),
      ],
    },
  },
};
