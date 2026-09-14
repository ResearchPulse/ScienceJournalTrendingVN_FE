import React from 'react';
import KeywordChip from './KeywordChip';

export default {
  title: 'Features/Keyword/KeywordChip',
  component: KeywordChip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    keyword: 'Machine Learning',
    count: 124,
    isActive: false,
    isTrending: false,
    onClick: () => console.log('Keyword clicked'),
  },
};

export const Active = {
  args: {
    keyword: 'Deep Learning',
    count: 85,
    isActive: true,
    isTrending: false,
    onClick: () => console.log('Keyword clicked'),
  },
};

export const Trending = {
  args: {
    keyword: 'Generative AI',
    count: 210,
    isActive: false,
    isTrending: true,
    onClick: () => console.log('Trending keyword clicked'),
  },
};
