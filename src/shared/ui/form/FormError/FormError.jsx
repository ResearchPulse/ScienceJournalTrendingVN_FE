import Icon from '../../primitives/Icon';

export default function FormError({ id, children, className = '' }) {
  if (!children) return null;
  return (
    <div
      id={id}
      role="alert"
      aria-live="polite"
      className={`text-danger text-xs mt-1.5 d-flex align-items-center gap-1 animate-fade-in ${className}`.trim()}
      style={{ fontWeight: 500 }}
    >
      <Icon icon="lucide:alert-circle" width="12" />
      <span>{children}</span>
    </div>
  );
}
