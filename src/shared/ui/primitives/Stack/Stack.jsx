export default function Stack({
  direction = 'vertical',
  gap = 2,
  align = 'stretch',
  justify = 'start',
  className = '',
  style,
  children,
  ...props
}) {
  const isHoriz = direction === 'horizontal' || direction === 'row';
  const flexCls = isHoriz ? 'd-flex flex-row' : 'd-flex flex-column';
  const alignCls = align ? `align-items-${align}` : '';
  const justifyCls = justify ? `justify-content-${justify}` : '';
  const gapCls = gap != null ? `gap-${gap}` : '';

  return (
    <div
      className={`${flexCls} ${alignCls} ${justifyCls} ${gapCls} ${className}`.trim()}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}
