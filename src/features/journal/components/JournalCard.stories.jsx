import React from 'react';
import JournalCard from './JournalCard';

export default {
  title: 'Features/Journal/JournalCard',
  component: JournalCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const Active = {
  args: {
    journal: {
      id: 'jour-1',
      title: 'Tạp chí Khoa học & Công nghệ Việt Nam',
      publisher: 'Bộ Khoa học và Công nghệ',
      subjectCategory: 'Khoa học tự nhiên',
      issn: '1859-4794',
      status: 'Active',
    },
  },
};

export const Inactive = {
  args: {
    journal: {
      id: 'jour-2',
      title: 'Tạp chí Phát triển Khoa học & Công nghệ ĐHQG-HCM',
      publisher: 'ĐHQG TP. Hồ Chí Minh',
      subjectCategory: 'Kỹ thuật & Công nghệ',
      issn: '2588-1078',
      status: 'Pending Review',
    },
  },
};
