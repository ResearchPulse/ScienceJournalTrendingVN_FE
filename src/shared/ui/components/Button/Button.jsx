import React from 'react';
import { Button as BsButton, Spinner } from 'react-bootstrap';

export default function Button({
  variant = 'primary',
  size,
  className = '',
  children,
  loading = false,
  disabled = false,
  ...props
}) {
  const variantClassMap = {
    primary: 'btn-primary-glow',
    dark: 'btn-dark-solid',
    outline: 'btn-outline-secondary',
  };

  const extraClass = variantClassMap[variant] || '';

  return (
    <BsButton
      variant={variantClassMap[variant] ? undefined : variant}
      size={size}
      disabled={disabled || loading}
      className={`${extraClass} ${className}`.trim()}
      {...props}
    >
      {loading && (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          className="me-2"
        />
      )}
      {children}
    </BsButton>
  );
}
