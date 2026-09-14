export default function Divider({ orientation = 'horizontal', className = '', style, ...props }) {
  if (orientation === 'vertical') {
    return (
      <div
        className={`vr ${className}`.trim()}
        style={{ borderColor: 'var(--border)', ...style }}
        {...props}
      />
    );
  }
  return (
    <hr
      className={`my-3 ${className}`.trim()}
      style={{ borderColor: 'var(--border)', opacity: 1, ...style }}
      {...props}
    />
  );
}
