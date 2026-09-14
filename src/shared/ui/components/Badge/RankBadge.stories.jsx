import { expect } from 'storybook/test';
import { RankBadge } from './index';

const meta = {
  component: RankBadge,
  tags: ['ai-generated'],
};

export default meta;

export const GoldRank = {
  args: {
    rank: 1,
  },
  play: async ({ canvas }) => {
    // Top 1 renders crown icon instead of number text
    await expect(canvas.queryByText('1')).toBeNull();
  },
};

export const SilverRank = {
  args: {
    rank: 2,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('2')).toBeVisible();
  },
};

export const BronzeRank = {
  args: {
    rank: 3,
  },
};

export const RegularRank = {
  args: {
    rank: 18,
  },
};
