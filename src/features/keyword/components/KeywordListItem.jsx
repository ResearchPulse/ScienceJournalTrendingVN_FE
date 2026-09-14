/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features/keyword/components/KeywordListItem.jsx
 */
import React from 'react';
import { Icon } from '@iconify/react';
import Card from '../../../shared/ui/components/Card/Card';
import Badge from '../../../shared/ui/components/Badge/Badge';
import Button from '../../../shared/ui/components/Button/Button';

/**
 * Card hiển thị một keyword trong danh sách.
 */
export default function KeywordListItem({ keyword = {}, onViewArticles }) {
  const keywordId = keyword.keyword_id || keyword.id || keyword.keywordId;
  const articleCount = Number(keyword.article_count || 0);

  return (
    <Card className="keyword-card p-4 h-100">
      <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
        <div>
          <div className="keyword-card-label text-uppercase small text-muted-custom fw-semibold mb-1" style={{ fontSize: '0.72rem', letterSpacing: '0.5px' }}>
            Research keyword
          </div>
          <h3 className="keyword-card-title font-display fw-bold text-main m-0" style={{ fontSize: '1.2rem' }}>
            {keyword.display_name}
          </h3>
        </div>
        <Icon icon="lucide:sparkles" width="18" className="keyword-card-icon text-warning flex-shrink-0" />
      </div>

      <div className="d-flex align-items-center gap-2 flex-wrap mb-4">
        {articleCount > 0 && (
          <Badge variant="neutral">
            {articleCount} bài báo
          </Badge>
        )}
        {(keyword.topic_name || keyword.topic) && (
          <Badge variant="primary">
            {keyword.topic_name || keyword.topic}
          </Badge>
        )}
      </div>

      <div className="mt-auto">
        <Button
          id={`keyword-view-${keywordId || keyword.display_name}`}
          type="button"
          variant="secondary"
          size="sm"
          disabled={!keywordId}
          onClick={() => keywordId && onViewArticles && onViewArticles(keywordId)}
          className="d-inline-flex align-items-center gap-2"
        >
          <span>Xem bài báo liên quan</span>
          <Icon icon="lucide:arrow-up-right" width="16" />
        </Button>
      </div>
    </Card>
  );
}
