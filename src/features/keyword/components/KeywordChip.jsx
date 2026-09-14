import React from 'react';

const KeywordChip = ({ keyword, count, icon, onClick, isTrending = false, isActive = false, className = '' }) => {
  const isSelected = isActive && !isTrending;

  return (
    <button
      type="button"
      className={`d-inline-flex align-items-center gap-2 px-3 py-1 me-2 mb-2 rounded-pill font-sans transition-colors ${
        isSelected
          ? 'btn-dark-solid border border-dark'
          : 'text-main bg-white border'
      } ${className}`}
      style={{ 
        cursor: onClick ? 'pointer' : 'default', 
        backgroundColor: isSelected ? undefined : (isTrending ? 'var(--bg-chip)' : 'var(--bg-card)'),
        borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
        fontSize: '0.85rem',
      }}
      onClick={onClick}
      aria-pressed={onClick ? isActive : undefined}
    >
      <span className="fw-medium">{keyword}</span>
      {count != null && <span className="text-muted-custom small">({count})</span>}
      {icon && <span className="ms-1 d-inline-flex align-items-center">{icon}</span>}
    </button>
  );
};

export default KeywordChip;
