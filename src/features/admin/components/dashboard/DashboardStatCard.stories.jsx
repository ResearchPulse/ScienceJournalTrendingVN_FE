import React from 'react';
import DashboardStatCard from './DashboardStatCard';
import '../../admin.css';

export default {
  title: 'Features/Admin/DashboardStatCard',
  component: DashboardStatCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const PositiveGrowth = {
  args: {
    label: 'Tổng số bài báo',
    value: '12,450',
    icon: 'lucide:file-text',
    note: '+15% so với tháng trước',
    noteType: 'positive',
  },
};

export const PendingReview = {
  args: {
    label: 'Bài báo chờ duyệt',
    value: '38',
    icon: 'lucide:clock',
    note: 'Cần xử lý trong tuần',
    noteType: 'warning',
  },
};
