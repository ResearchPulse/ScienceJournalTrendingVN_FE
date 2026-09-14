/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features/article/components/ArticleHeaderCard.jsx
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Card from '../../../shared/ui/components/Card/Card';
import Badge from '../../../shared/ui/components/Badge/Badge';
import Avatar from '../../../shared/ui/primitives/Avatar';

export default function ArticleHeaderCard({ article }) {
  const navigate = useNavigate();

  if (!article) return null;

  // Extract author info from normalized array
  let authorText = '';
  let hasMultipleAuthors = false;
  let additionalCount = 0;

  const authors = Array.isArray(article.authors) ? article.authors : [];
  if (authors.length > 0) {
    const firstAuthor = authors[0];
    authorText = firstAuthor.display_name || firstAuthor.name || 'Tác giả';
    if (authors.length > 1) {
      hasMultipleAuthors = true;
      additionalCount = authors.length - 1;
    }
  }

  const handleJournalClick = () => {
    const journalId = article.journal_id;
    if (journalId) {
      navigate(`/journals/${journalId}`);
    }
  };

  return (
    <Card 
      className="journal-dark-card border-0 p-4 mb-4" 
      style={{ 
        backgroundColor: 'var(--bg-card)', 
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl, 16px)',
        boxShadow: 'var(--shadow-sm, 0 10px 30px rgba(0, 0, 0, 0.02))'
      }}
    >
      {/* Badges row */}
      <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
        {article.is_open_access && (
          <Badge variant="success" className="font-semibold">
            Open Access
          </Badge>
        )}
        {article.publication_year && (
          <span 
            className="text-muted-custom" 
            style={{ fontSize: '0.875rem' }}
          >
            Năm xuất bản: {article.publication_year}
          </span>
        )}
      </div>

      {/* Title */}
      <h1 
        className="font-display text-main mb-3" 
        style={{ 
          fontSize: '1.85rem', 
          lineHeight: '1.3', 
          fontWeight: 700 
        }}
      >
        {article.title}
      </h1>

      {/* Main Author Row */}
      {authorText && (
        <div className="d-flex align-items-center gap-3 mb-4">
          <Avatar name={authorText} size="sm" />
          <div>
            <div className="text-sm text-main" style={{ fontWeight: 600 }}>
              {authorText}
              {hasMultipleAuthors && (
                <span className="text-muted-custom font-normal text-xs ms-1">
                  và {additionalCount} tác giả khác
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Journal Link */}
      {article.journal_name && (
        <div 
          className="d-flex align-items-center gap-2 text-muted-custom pt-3 border-top" 
          style={{ fontSize: '0.9rem', borderColor: 'var(--border)' }}
        >
          <Icon icon="lucide:book-open" style={{ color: 'var(--primary)' }} width="18" />
          <span>Xuất bản trong:</span>
          {article.journal_id ? (
            <span 
              onClick={handleJournalClick}
              className="text-main hover:text-dark transition-colors"
              style={{ cursor: 'pointer', fontWeight: 600, textDecoration: 'underline' }}
            >
              {article.journal_name}
            </span>
          ) : (
            <span className="text-main" style={{ fontWeight: 600 }}>
              {article.journal_name}
            </span>
          )}
        </div>
      )}
    </Card>
  );
}
