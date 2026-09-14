import LoadingSkeleton, { ArticleCardSkeleton } from './LoadingSkeleton';

const meta = {
  component: LoadingSkeleton,
  tags: ['ai-generated'],
};

export default meta;

export const Primary = {
  args: {
    width: '240px',
    height: '24px',
    borderRadius: '6px',
  },
};

export const Circle = {
  args: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
  },
};

export const ArticleSkeleton = {
  render: () => <ArticleCardSkeleton />,
};
