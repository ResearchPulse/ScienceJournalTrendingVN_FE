import React from 'react';
import AuthorCard from './AuthorCard';

export default {
  title: 'Features/Author/AuthorCard',
  component: AuthorCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    author: {
      author_id: 'auth-101',
      display_name: 'GS. TS. Nguyễn Văn An',
      institution_1: 'Đại học Quốc gia Hà Nội',
      institution_2: 'Viện Công nghệ Thông tin',
      h_index: 28,
      citation_count: 3450,
      article_count: 42,
      subject_areas: ['Artificial Intelligence', 'Data Science', 'Machine Learning'],
      url_image: '',
      avatar_color: '#3B82F6',
    },
  },
};

export const WithoutAreas = {
  args: {
    author: {
      author_id: 'auth-102',
      display_name: 'TS. Lê Thị Mai',
      institution_1: 'Đại học Bách Khoa TP.HCM',
      h_index: 12,
      citation_count: 820,
      article_count: 15,
      subject_areas: [],
      url_image: '',
      avatar_color: '#10B981',
    },
  },
};
