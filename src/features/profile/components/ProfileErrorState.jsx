import React from 'react';
import { useTranslation } from 'react-i18next';
import ErrorState from '../../../shared/ui/feedback/ErrorState/ErrorState';

export default function ProfileErrorState({ error, onRetry }) {
  const { i18n } = useTranslation();
  const isVi = i18n.resolvedLanguage?.startsWith('vi');

  const errorTitle = isVi ? 'Đã xảy ra lỗi' : 'An error occurred';
  const retryText = isVi ? 'Thử lại' : 'Retry';

  return (
    <div className="py-4">
      <ErrorState
        title={errorTitle}
        description={error}
        onRetry={onRetry}
        retryText={retryText}
      />
    </div>
  );
}
