import { expect } from 'storybook/test';
import ErrorState from './ErrorState';

const meta = {
  component: ErrorState,
  tags: ['ai-generated'],
};

export default meta;

export const Primary = {
  args: {
    title: 'Không thể tải dữ liệu',
    message: 'Vui lòng kiểm tra lại kết nối mạng hoặc thử lại sau.',
    retryLabel: 'Thử lại kết nối',
    onRetry: () => {},
  },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByRole('heading', { level: 3, name: /không thể tải dữ liệu/i })).toBeVisible();
    const retryBtn = canvas.getByRole('button', { name: /thử lại kết nối/i });
    await expect(retryBtn).toBeVisible();
    await userEvent.click(retryBtn);
  },
};

export const WithoutRetry = {
  args: {
    title: 'Phiên đăng nhập hết hạn',
    message: 'Vui lòng đăng nhập lại để tiếp tục.',
    onRetry: null,
  },
};
