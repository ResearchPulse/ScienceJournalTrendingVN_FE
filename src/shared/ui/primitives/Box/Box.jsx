export default function Box({ as: Component = 'div', className = '', style, children, ...props }) {
  return (
    <Component className={className} style={style} {...props}>
      {children}
    </Component>
  );
}
