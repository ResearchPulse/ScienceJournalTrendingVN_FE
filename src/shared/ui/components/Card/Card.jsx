export default function Card({ className = '', style, children, ...props }) {
  return (
    <div
      className={`p-4 rounded-3 ${className}`.trim()}
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
