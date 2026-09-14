import { expect } from 'storybook/test';
import Logo from './Logo';

const meta = {
  component: Logo,
  tags: ['ai-generated'],
};

export default meta;

export const Primary = {
  args: {
    size: 32,
    fontSize: '1.25rem',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('ResearchPulse')).toBeVisible();
  },
};

export const Large = {
  args: {
    size: 48,
    fontSize: '1.75rem',
  },
};
