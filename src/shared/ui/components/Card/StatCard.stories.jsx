import { expect } from 'storybook/test';
import StatCard from './StatCard';

const meta = {
  component: StatCard,
  tags: ['ai-generated'],
};

export default meta;

export const Primary = {
  args: {
    icon: 'lucide:trending-up',
    accentColor: '#1976d2',
    value: 1250,
    label: 'Tổng số bài báo',
    growth: 12,
    growthLabel: 'tuần này',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Tổng số bài báo')).toBeVisible();
    await expect(canvas.getByText('+12 tuần này')).toBeVisible();
  },
};

export const Loading = {
  args: {
    loading: true,
    label: 'Đang tải thống kê',
  },
};

export const NegativeGrowth = {
  args: {
    icon: 'lucide:trending-down',
    accentColor: '#ef4444',
    value: 340,
    label: 'Lượt trích dẫn',
    growth: -5,
  },
};

export const CssCheck = {
  args: {
    icon: 'lucide:trending-up',
    accentColor: '#1976d2',
    value: 1250,
    label: 'Thống kê CSS',
  },
  play: async ({ canvas }) => {
    const label = canvas.getByText('Thống kê CSS');
    const card = label.closest('.position-relative');
    // Verifies --bg-card (#ffffff) has resolved to rgb(255, 255, 255)
    await expect(getComputedStyle(card).backgroundColor).toBe('rgb(255, 255, 255)');
  },
};
