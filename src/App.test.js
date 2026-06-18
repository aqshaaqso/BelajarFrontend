import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import Products from "./views/Products";
import { getProducts } from "./services/productStore";
import { renderWithProviders } from "./testUtils";

const mockUsers = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "leanne@example.com",
    company: { name: "Romaguera-Crona" },
  },
];

const mockPosts = [{ id: 1, title: "Sample order", userId: 1 }];

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    const path = String(url);

    if (path.includes("/users")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUsers),
      });
    }

    if (path.includes("/posts")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPosts),
      });
    }

    return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("App", () => {
  it("renders login page", async () => {
    renderWithProviders(<App />);
    expect(await screen.findByText(/login/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter email/i)).toBeInTheDocument();
  });

  it("redirects unauthenticated users away from admin routes", async () => {
    renderWithProviders(<App />, { initialEntries: ["/admin"] });
    expect(await screen.findByPlaceholderText(/enter email/i)).toBeInTheDocument();
  });

  it("logs in and shows the dashboard", async () => {
    renderWithProviders(<App />);

    await userEvent.type(
      screen.getByPlaceholderText(/enter email/i),
      "test@example.com"
    );
    await userEvent.type(screen.getByPlaceholderText(/^password/i), "password");
    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(
      await screen.findByRole("heading", { name: /dashboard/i })
    ).toBeInTheDocument();
  });
});

describe("Products", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("creates a product from the modal form", async () => {
    renderWithProviders(<Products />, { initialEntries: ["/admin/products"] });

    await userEvent.click(
      await screen.findByRole("button", { name: /add product/i })
    );

    const dialog = await screen.findByRole("dialog");
    await userEvent.type(within(dialog).getByRole("textbox"), "Studio Mic");

    const numberInputs = within(dialog).getAllByRole("spinbutton");
    fireEvent.change(numberInputs[0], { target: { value: "129.99" } });
    fireEvent.change(numberInputs[1], { target: { value: "12" } });
    await userEvent.click(
      within(dialog).getByRole("button", { name: /create product/i })
    );

    await waitFor(() => {
      expect(
        getProducts().some((product) => product.name === "Studio Mic")
      ).toBe(true);
    });
  });
});