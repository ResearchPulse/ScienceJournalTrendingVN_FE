import React from 'react';
import ProjectCard from './ProjectCard';

export default {
  title: 'Features/Project/ProjectCard',
  component: ProjectCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    project: {
      id: 'proj-1',
      title: 'Ứng dụng Deep Learning trong phân tích dữ liệu y sinh học',
      subject_area: { display_name: 'Khoa học máy tính & Trí tuệ nhân tạo' },
      journals_count: 5,
      keywords_count: 4,
      watch_keywords: [
        { keyword: 'Deep Learning' },
        { keyword: 'Biomedical AI' },
        { keyword: 'Neural Networks' },
        { keyword: 'Medical Imaging' },
      ],
      created_at: '2025-01-15T08:00:00Z',
    },
    onDelete: () => console.log('Delete project clicked'),
  },
};

export const Minimal = {
  args: {
    project: {
      id: 'proj-2',
      title: 'Nghiên cứu năng lượng tái tạo',
      subject_area: null,
      journals_count: 0,
      keywords_count: 0,
      watch_keywords: [],
      created_at: '2025-02-01T10:30:00Z',
    },
  },
};
