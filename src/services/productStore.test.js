import {
  deleteProduct,
  getProducts,
  saveProduct,
  updateProduct,
} from "./productStore";

const STORAGE_KEY = "dashboard-products";

describe("productStore", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns default products with computed status", () => {
    const products = getProducts();

    expect(products.length).toBeGreaterThan(0);
    expect(products[0]).toHaveProperty("status");
  });

  it("creates, updates, and deletes products", () => {
    const created = saveProduct({
      name: "Test Gadget",
      price: 19.99,
      stock: 15,
    });

    expect(created.name).toBe("Test Gadget");
    expect(created.status).toBe("In Stock");
    expect(getProducts().some((product) => product.name === "Test Gadget")).toBe(
      true
    );

    updateProduct(created.id, { stock: 0 });
    const updated = getProducts().find((product) => product.id === created.id);
    expect(updated.status).toBe("Out of Stock");

    deleteProduct(created.id);
    expect(
      getProducts().some((product) => product.id === created.id)
    ).toBe(false);
  });

  it("falls back to defaults when storage is corrupted", () => {
    localStorage.setItem(STORAGE_KEY, "not-json");
    expect(getProducts().length).toBeGreaterThan(0);
  });
});