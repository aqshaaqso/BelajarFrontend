import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { SearchProvider } from "./context/SearchContext";

const renderApp = () =>
  render(
    <BrowserRouter>
      <AuthProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </AuthProvider>
    </BrowserRouter>
  );

test("renders login page", async () => {
  renderApp();
  expect(await screen.findByText(/login/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/enter email/i)).toBeInTheDocument();
});