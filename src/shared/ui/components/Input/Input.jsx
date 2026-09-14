import { Form } from 'react-bootstrap';

export default function Input({ className = '', style, ...props }) {
  return (
    <Form.Control
      className={`bg-transparent text-main text-sm py-2 px-3 border rounded-3 ${className}`.trim()}
      style={{
        borderColor: 'var(--border)',
        ...style,
      }}
      {...props}
    />
  );
}
