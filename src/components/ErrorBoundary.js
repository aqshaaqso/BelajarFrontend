import { Component } from "react";
import { Alert, Button } from "react-bootstrap";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught application error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 p-4">
          <Alert variant="danger" className="shadow-sm mw-100" style={{ maxWidth: 480 }}>
            <Alert.Heading>Something went wrong</Alert.Heading>
            <p className="mb-4">
              The dashboard hit an unexpected error. Reload the page to try again.
            </p>
            <Button variant="primary" onClick={this.handleReload}>
              Reload page
            </Button>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;