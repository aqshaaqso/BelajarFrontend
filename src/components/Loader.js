import { Spinner } from "react-bootstrap";

const Loader = ({ message = "Loading..." }) => (
  <div className="d-flex align-items-center gap-2 py-3 text-muted">
    <Spinner animation="border" size="sm" role="status" />
    <span>{message}</span>
  </div>
);

export default Loader;