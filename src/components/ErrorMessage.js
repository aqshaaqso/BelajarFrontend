import { Alert } from "react-bootstrap";

const getErrorMessage = (error) => {
  if (!error) return "Something went wrong.";
  if (typeof error === "string") return error;
  if (error.message) return error.message;
  return "Something went wrong.";
};

const ErrorMessage = ({ error }) => (
  <Alert variant="danger" className="mb-0">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-exclamation-triangle me-2 d-inline"
      viewBox="0 0 16 16"
    >
      <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016l6.5 11.25A.125.125 0 0 1 14.5 13.5h-13a.125.125 0 0 1-.065-.234l6.5-11.25zM8 5a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 5zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
    </svg>
    {getErrorMessage(error)}
  </Alert>
);

export default ErrorMessage;