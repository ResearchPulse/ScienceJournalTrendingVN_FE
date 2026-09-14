import { expect } from 'storybook/test';
import EmptyState from './EmptyState';

const meta = {
  component: EmptyState,
  tags: ['ai-generated'],
};

export default meta;

export const Primary = {
  args: {
    title: 'Không tìm thấy bài báo',
    description: 'Vui lòng thử lại với từ khóa khác.',
    icon: 'lucide:file-question',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { level: 3, name: /không tìm thấy bài báo/i })).toBeVisible();
    await expect(canvas.getByText('Vui lòng thử lại với từ khóa khác.')).toBeVisible();
  },
};

export const WithAction = {
  args: {
    title: 'Chưa có bộ sưu tập',
    description: 'Bắt đầu tạo bộ sưu tập đầu tiên của bạn.',
    actionLabel: 'Tạo bộ sưu tập',
    onAction: () => {},
  },
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: /tạo bộ sưu tập/i });
    await expect(button).toBeVisible();
    await userEvent.click(button);
  },
};

export const CustomIcon = {
  args: {
    title: 'Không có dữ liệu',
    description: 'Chưa có dữ liệu thống kê.',
    icon: 'lucide:inbox',
  },
};
