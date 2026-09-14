import ProgressBar from './ProgressBar';

const meta = {
  component: ProgressBar,
  tags: ['ai-generated'],
};

export default meta;

export const Primary = {
  args: {
    current: 25,
    total: 100,
  },
};

export const Halfway = {
  args: {
    current: 50,
    total: 100,
  },
};

export const Completed = {
  args: {
    current: 0,
    total: 100,
  },
};
