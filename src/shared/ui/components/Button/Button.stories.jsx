import { expect } from 'storybook/test';
import Button from './Button';

const meta = {
  component: Button,
  tags: ['ai-generated'],
};

export default meta;

export const Primary = {
  args: {
    variant: 'primary',
    children: 'Khám phá ngay',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /khám phá ngay/i })).toBeVisible();
  },
};

export const Dark = {
  args: {
    variant: 'dark',
    children: 'Thử lại',
  },
};

export const Outline = {
  args: {
    variant: 'outline',
    children: 'Xem chi tiết',
  },
};
