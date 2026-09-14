import React from 'react';
import SharedEmptyState from '../../../shared/ui/feedback/EmptyState/EmptyState';

export default function EmptyState({ 
  icon = 'lucide:info', 
  title = 'Không có dữ liệu', 
  description = 'Không tìm thấy thông tin phù hợp.', 
  className = '',
  style = {}
}) {
  return (
    <div style={style} className={className}>
      <SharedEmptyState
        title={title}
        description={description}
        icon={icon}
      />
    </div>
  );
}
