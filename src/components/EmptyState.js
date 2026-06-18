import { Alert } from "react-bootstrap";

const EmptyState = ({ message = "No results found." }) => (
  <Alert variant="secondary" className="mb-0">
    {message}
  </Alert>
);

export default EmptyState;