import React from 'react';
import KeywordTopicCard from './KeywordTopicCard';

export default {
  title: 'Features/Article/KeywordTopicCard',
  component: KeywordTopicCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const WithKeywordsAndTopics = {
  args: {
    primaryTopic: 'Computer Science & AI',
    keywords: [
      { keyword_id: 'kw-1', display_name: 'Natural Language Processing' },
      { keyword_id: 'kw-2', display_name: 'Transformer Models' },
      { keyword_id: 'kw-3', display_name: 'Few-shot Learning' },
    ],
    topics: [
      { topic_id: 'top-1', display_name: 'Machine Learning', is_primary: true },
      { topic_id: 'top-2', display_name: 'Deep Learning', is_primary: false },
    ],
  },
};

export const Empty = {
  args: {
    primaryTopic: null,
    keywords: [],
    topics: [],
  },
};
