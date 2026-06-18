import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import EmptyState from "./EmptyState";

const DataState = ({ loading, error, isEmpty, emptyMessage, children }) => {
  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;
  if (isEmpty) return <EmptyState message={emptyMessage} />;
  return children;
};

export default DataState;