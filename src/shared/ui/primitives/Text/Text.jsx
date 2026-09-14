export default function Text({
  as: Component = 'span',
  variant = 'body',
  color,
  weight,
  className = '',
  style,
  children,
  ...props
}) {
  const variantStyles = {
    h1: { fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-display)' },
    h2: { fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-display)' },
    h3: { fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-sans)' },
    body: { fontSize: '1rem', fontWeight: 400, fontFamily: 'var(--font-sans)' },
    caption: { fontSize: '0.85rem', color: 'var(--text-muted)' },
    xs: { fontSize: '0.75rem' },
  };

  return (
    <Component
      className={className}
      style={{
        ...(variantStyles[variant] || {}),
        ...(color ? { color } : {}),
        ...(weight ? { fontWeight: weight } : {}),
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
