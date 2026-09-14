import { useId } from 'react';
import { OverlayTrigger, Tooltip as BsTooltip } from 'react-bootstrap';

export default function Tooltip({ text, placement = 'top', children, ...props }) {
  const generatedId = useId();
  if (!text) return children;
  return (
    <OverlayTrigger
      placement={placement}
      overlay={<BsTooltip id={`tooltip-${generatedId}`}>{text}</BsTooltip>}
      {...props}
    >
      {children}
    </OverlayTrigger>
  );
}
