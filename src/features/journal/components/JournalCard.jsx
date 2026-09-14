import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Card from '../../../shared/ui/components/Card/Card';
import Badge from '../../../shared/ui/components/Badge/Badge';
import Button from '../../../shared/ui/components/Button/Button';

/**
 * Component JournalCard - Hiển thị thông tin tạp chí dưới dạng thẻ khối độc lập (Card View).
 * Tuân thủ chuẩn Design System: sử dụng Card, Badge, Button chuẩn hóa.
 * @param {Object} props.journal - Dữ liệu chi tiết của một tạp chí cụ thể
 * @param {boolean} [props.asCol=false] - Tuỳ chọn bọc trong Bootstrap Col khi nằm trong Row
 */
export default function JournalCard({ journal = {}, asCol = false, className = '' }) {
  const navigate = useNavigate();

  const id = journal.journal_id || journal.id;
  const category = journal.subjectCategory || journal.category || 'General';
  const status = journal.status || 'Active';
  const isStatusActive = status.toLowerCase() === 'active';

  const cardContent = (
    <Card className={`journal-dark-card h-100 shadow-sm transition-hover ${className}`}>
      <div className="d-flex flex-column p-4 h-100">
        {/* Hàng đầu tiên: Danh mục và Badge trạng thái */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          <Badge variant="neutral" className="text-uppercase font-display" style={{ fontSize: '0.75rem' }}>
            {category}
          </Badge>
          <Badge variant={isStatusActive ? 'success' : 'warning'}>
            {status}
          </Badge>
        </div>

        {/* Tiêu đề chính của tạp chí */}
        <h3 className="font-display fw-bold text-main mb-2 line-clamp-2" style={{ fontSize: '1.15rem' }}>
          {journal.title}
        </h3>

        {/* Nhà xuất bản */}
        <div className="text-muted-custom mb-3 small fw-normal">
          <i className="bi bi-building me-1"></i> {journal.publisher || '—'}
        </div>

        {/* Khối thông tin chi tiết (Mã số ISSN, Nhà xuất bản) */}
        <div className="p-3 rounded-3 mb-4 mt-auto" style={{ backgroundColor: 'var(--bg-chip)' }}>
          <Row className="g-2 text-main small">
            <Col xs={6}>
              <span className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Mã số ISSN:</span>
              <span className="fw-medium">{journal.issn || '—'}</span>
            </Col>
            <Col xs={6}>
              <span className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Nhà xuất bản:</span>
              <span className="fw-medium text-truncate d-block">{journal.publisher || '—'}</span>
            </Col>
          </Row>
        </div>

        {/* Thanh tương tác phía chân thẻ bài viết */}
        <div className="d-flex gap-2 w-100 pt-2 border-top" style={{ borderColor: 'var(--border)' }}>
          <Button 
            variant="secondary" 
            size="sm"
            className="w-50"
            onClick={() => navigate(id ? `/journals/${id}` : '/journals')}
          >
            <i className="bi bi-eye me-1"></i> Chi tiết
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="w-50"
            onClick={() => navigate(id ? `/admin/journals/${id}/edit` : '/admin/journals')}
          >
            <i className="bi bi-pencil me-1"></i> Sửa đổi
          </Button>
        </div>
      </div>
    </Card>
  );

  if (asCol) {
    return (
      <Col xs={12} sm={6} lg={4}>
        {cardContent}
      </Col>
    );
  }

  return cardContent;
}