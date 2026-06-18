import { Toast, ToastContainer as BSToastContainer } from "react-bootstrap";

const variantTitle = {
  success: "Success",
  danger: "Error",
  warning: "Warning",
  info: "Info",
  primary: "Notice",
};

const lightBodyVariants = new Set(["light", "secondary"]);

const ToastContainer = ({ toasts, onDismiss }) => (
  <div className="toast-stack" aria-live="polite" aria-atomic="true">
    <BSToastContainer position="top-end" className="p-3">
      {toasts.map(({ id, message, variant }) => (
        <Toast
          key={id}
          bg={variant}
          onClose={() => onDismiss(id)}
          show
          delay={4000}
          autohide
        >
          <Toast.Header closeButton>
            <strong className="me-auto">
              {variantTitle[variant] || variantTitle.primary}
            </strong>
          </Toast.Header>
          <Toast.Body
            className={lightBodyVariants.has(variant) ? "" : "text-white"}
          >
            {message}
          </Toast.Body>
        </Toast>
      ))}
    </BSToastContainer>
  </div>
);

export default ToastContainer;