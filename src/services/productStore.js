const STORAGE_KEY = "dashboard-products";

const DEFAULT_PRODUCTS = [
  { id: 1, name: "Wireless Mouse", price: 29.99, stock: 120 },
  { id: 2, name: "USB-C Hub", price: 45.0, stock: 34 },
  { id: 3, name: "Mechanical Keyboard", price: 89.99, stock: 0 },
  { id: 4, name: "Monitor Stand", price: 39.5, stock: 18 },
  { id: 5, name: "Webcam HD", price: 59.99, stock: 52 },
  { id: 6, name: "Desk Lamp", price: 24.99, stock: 8 },
];

const getStatus = (stock) => {
  if (stock === 0) return "Out of Stock";
  if (stock <= 10) return "Low Stock";
  return "In Stock";
};

const readProducts = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return DEFAULT_PRODUCTS;
  try {
    return JSON.parse(stored);
  } catch {
    return DEFAULT_PRODUCTS;
  }
};

const writeProducts = (products) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const getProducts = () =>
  readProducts().map((product) => ({
    ...product,
    status: getStatus(product.stock),
  }));

export const saveProduct = (product) => {
  const products = readProducts();
  const nextId = products.reduce((max, item) => Math.max(max, item.id), 0) + 1;
  const newProduct = { ...product, id: nextId };
  writeProducts([...products, newProduct]);
  return { ...newProduct, status: getStatus(newProduct.stock) };
};

export const updateProduct = (id, updates) => {
  const products = readProducts().map((product) =>
    product.id === id ? { ...product, ...updates, id } : product
  );
  writeProducts(products);
  const updated = products.find((product) => product.id === id);
  return { ...updated, status: getStatus(updated.stock) };
};

export const deleteProduct = (id) => {
  const products = readProducts().filter((product) => product.id !== id);
  writeProducts(products);
};

export const getProductStats = () => {
  const products = getProducts();
  return {
    total: products.length,
    inStock: products.filter((p) => p.stock > 10).length,
    lowStock: products.filter((p) => p.stock > 0 && p.stock <= 10).length,
    outOfStock: products.filter((p) => p.stock === 0).length,
    inventoryValue: products.reduce((sum, p) => sum + p.price * p.stock, 0),
  };
};