import { Badge as BsBadge } from 'react-bootstrap';

export default function Badge({ className = '', children, ...props }) {
  return (
    <BsBadge className={className} {...props}>
      {children}
    </BsBadge>
  );
}
