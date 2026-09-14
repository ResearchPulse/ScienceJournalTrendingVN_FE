import LoadingSkeleton from '../../components/Skeleton/LoadingSkeleton';

export default function LoadingState({ count = 3, height = '2.5rem', className = '' }) {
  return (
    <div className={`d-flex flex-column gap-2 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <LoadingSkeleton key={i} height={height} borderRadius="8px" />
      ))}
    </div>
  );
}
