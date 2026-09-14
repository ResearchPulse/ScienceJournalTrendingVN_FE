import React from 'react';
import ArticleHeaderCard from './ArticleHeaderCard';

export default {
  title: 'Features/Article/ArticleHeaderCard',
  component: ArticleHeaderCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const OpenAccessMultiAuthor = {
  args: {
    article: {
      article_id: 'art-1',
      title: 'Tối ưu hóa kiến trúc mạng nơ-ron tích chập trong phát hiện tổn thương phổi',
      is_open_access: true,
      publication_year: 2024,
      journal_id: 'jour-10',
      journal_name: 'Tạp chí Khoa học & Công nghệ Thông tin',
      authors: [
        { name: 'Nguyễn Thanh Tùng', display_name: 'TS. Nguyễn Thanh Tùng' },
        { name: 'Trần Văn Bình', display_name: 'ThS. Trần Văn Bình' },
        { name: 'Lê Hoàng Nam', display_name: 'Lê Hoàng Nam' },
      ],
    },
  },
};

export const SingleAuthorClosed = {
  args: {
    article: {
      article_id: 'art-2',
      title: 'Khảo sát vật liệu nano carbon trong pin lưu trữ năng lượng tương lai',
      is_open_access: false,
      publication_year: 2023,
      journal_id: 'jour-15',
      journal_name: 'Tạp chí Hóa học & Vật liệu tiên tiến',
      authors: [
        { name: 'Phạm Minh Đức', display_name: 'GS. TS. Phạm Minh Đức' },
      ],
    },
  },
};
