import { Modal as BsModal } from 'react-bootstrap';

export default function Modal({ show, onHide, title, children, footer, ...props }) {
  return (
    <BsModal show={show} onHide={onHide} centered {...props}>
      {title && (
        <BsModal.Header closeButton>
          <BsModal.Title style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', fontWeight: 700 }}>
            {title}
          </BsModal.Title>
        </BsModal.Header>
      )}
      <BsModal.Body>{children}</BsModal.Body>
      {footer && <BsModal.Footer>{footer}</BsModal.Footer>}
    </BsModal>
  );
}
