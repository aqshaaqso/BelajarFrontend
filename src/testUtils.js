import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { SearchProvider } from "./context/SearchContext";
import { SettingsProvider } from "./context/SettingsContext";
import { ToastProvider } from "./context/ToastContext";

export const renderWithProviders = (
  ui,
  { initialEntries = ["/"], ...options } = {}
) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <SettingsProvider>
        <ToastProvider>
          <AuthProvider>
            <SearchProvider>{ui}</SearchProvider>
          </AuthProvider>
        </ToastProvider>
      </SettingsProvider>
    </MemoryRouter>,
    options
  );