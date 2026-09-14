/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features/auth/components/SubmitButton.jsx
 */
import React from 'react';
import Button from '../../../shared/ui/components/Button/Button';

export default function SubmitButton({
  type = 'submit',
  disabled = false,
  isLoading = false,
  loadingText = 'Đang xử lý...',
  label = 'Xác nhận',
  onClick,
  className = '',
}) {
  return (
    <Button
      type={type}
      variant="primary"
      disabled={disabled}
      loading={isLoading}
      onClick={onClick}
      className={`w-100 py-2.5 rounded-3 text-sm font-semibold d-flex align-items-center justify-content-center gap-2 ${className}`}
      style={{
        boxShadow: '0 4px 14px rgba(255, 122, 51, 0.2)',
      }}
    >
      <span>{isLoading ? loadingText : label}</span>
    </Button>
  );
}
