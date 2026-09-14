import { expect } from 'storybook/test';
import Avatar from './Avatar';

const meta = {
  component: Avatar,
  tags: ['ai-generated'],
};

export default meta;

export const Initials = {
  args: {
    name: 'Nguyễn Văn An',
    size: 'md',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('A')).toBeVisible();
  },
};

export const Large = {
  args: {
    name: 'Trần Thị Bình',
    size: 'lg',
  },
};

export const WithPhoto = {
  args: {
    name: 'Lê Hoàng',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    size: 'md',
  },
};
