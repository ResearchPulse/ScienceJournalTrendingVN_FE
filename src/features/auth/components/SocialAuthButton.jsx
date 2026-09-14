/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features/auth/components/SocialAuthButton.jsx
 */
import React from 'react';
import Button from '../../../shared/ui/components/Button/Button';
import Icon from '../../../shared/ui/primitives/Icon';

export default function SocialAuthButton({
  onClick,
  disabled = false,
  label = 'Tiếp tục với Google',
  className = '',
}) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={disabled}
      className={`w-100 d-flex align-items-center justify-content-center gap-2 py-2.5 rounded-3 text-sm font-semibold ${className}`}
      style={{
        background: 'var(--bg-chip)',
        borderColor: 'var(--border)',
        color: 'var(--text-main)',
      }}
    >
      <Icon icon="flat-color-icons:google" width="18" />
      <span>{label}</span>
    </Button>
  );
}
