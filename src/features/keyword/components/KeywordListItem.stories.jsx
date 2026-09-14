import React from 'react';
import KeywordListItem from './KeywordListItem';

export default {
  title: 'Features/Keyword/KeywordListItem',
  component: KeywordListItem,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    keyword: {
      keyword_id: 'kw-101',
      display_name: 'Reinforcement Learning',
      article_count: 58,
      topic_name: 'Artificial Intelligence',
    },
    onViewArticles: (id) => console.log('View articles for keyword', id),
  },
};

export const WithoutTopic = {
  args: {
    keyword: {
      keyword_id: 'kw-102',
      display_name: 'Bioinformatics',
      article_count: 12,
    },
    onViewArticles: (id) => console.log('View articles for keyword', id),
  },
};
