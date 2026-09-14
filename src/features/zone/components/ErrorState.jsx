import React from 'react';
import SharedErrorState from '../../../shared/ui/feedback/ErrorState/ErrorState';

export default function ErrorState({ 
  message = 'Đã xảy ra lỗi khi tải dữ liệu.', 
  onRetry, 
  className = '',
  style = {} 
}) {
  return (
    <div style={style} className={className}>
      <SharedErrorState
        title="Đã xảy ra lỗi"
        description={message}
        onRetry={onRetry}
        retryText="Thử lại"
      />
    </div>
  );
}
