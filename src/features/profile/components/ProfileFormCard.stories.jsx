import React from 'react';
import ProfileFormCard from './ProfileFormCard';

export default {
  title: 'Features/Profile/ProfileFormCard',
  component: ProfileFormCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    formData: {
      first_name: 'Văn An',
      last_name: 'Nguyễn',
      email: 'vanan.nguyen@vnu.edu.vn',
      role: 'Giảng viên chính / Nghiên cứu sinh',
      gender: true,
      date_of_birth: '1988-05-20',
      url_image: '',
    },
    isSaving: false,
    onSave: () => console.log('Save profile'),
    onLogout: () => console.log('Logout'),
    onRequestDelete: () => console.log('Request delete account'),
  },
};

export const Saving = {
  args: {
    ...Default.args,
    isSaving: true,
  },
};
