import React from 'react';
import JournalResultCard from './JournalResultCard';

export default {
  title: 'Features/Catalog/JournalResultCard',
  component: JournalResultCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const OpenAccessQ1 = {
  args: {
    journal: {
      id: 'cat-1',
      display_name: 'IEEE Transactions on Pattern Analysis and Machine Intelligence',
      publisher: 'IEEE Computer Society',
      country: 'United States',
      issn: '0162-8828',
      is_open_access: true,
      quartile: 'Q1',
      subject_category_name: 'Artificial Intelligence',
      subject_area_name: 'Computer Science',
      metric_value: '23.6',
      metric_name: 'Impact Factor',
      metric_year: '2024',
    },
    isFollowed: false,
    onFollow: (id) => console.log('Follow journal', id),
    onTagClick: (tag) => console.log('Tag clicked', tag),
  },
};

export const SubscriptionQ2Followed = {
  args: {
    journal: {
      id: 'cat-2',
      display_name: 'Journal of Systems and Software',
      publisher: 'Elsevier',
      country: 'Netherlands',
      issn: '0164-1212',
      is_open_access: false,
      quartile: 'Q2',
      subject_category_name: 'Software Engineering',
      subject_area_name: 'Computer Science',
      metric_value: '3.7',
      metric_name: 'SJR',
      metric_year: '2023',
    },
    isFollowed: true,
    onFollow: (id) => console.log('Follow journal', id),
  },
};
