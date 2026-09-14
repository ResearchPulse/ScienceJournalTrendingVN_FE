import { Nav } from 'react-bootstrap';

export default function Tabs({ items = [], activeKey, onSelect, className = '', ...props }) {
  return (
    <Nav variant="pills" activeKey={activeKey} onSelect={onSelect} className={`gap-2 ${className}`.trim()} {...props}>
      {items.map(item => (
        <Nav.Item key={item.key}>
          <Nav.Link eventKey={item.key} className="rounded-pill px-3 py-1.5 text-xs font-bold">
            {item.label}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
}
