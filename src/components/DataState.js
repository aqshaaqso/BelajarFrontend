import ErrorMessage from "./ErrorMessage";
import EmptyState from "./EmptyState";
import { CardSkeleton, TableSkeleton, TextSkeleton } from "./Skeleton";

const skeletons = {
  text: TextSkeleton,
  table: TableSkeleton,
  cards: CardSkeleton,
};

const DataState = ({
  loading,
  error,
  isEmpty,
  emptyMessage,
  skeleton = "text",
  children,
}) => {
  if (loading) {
    const SkeletonView = skeletons[skeleton] || TextSkeleton;
    return <SkeletonView />;
  }
  if (error) return <ErrorMessage error={error} />;
  if (isEmpty) return <EmptyState message={emptyMessage} />;
  return children;
};

export default DataState;