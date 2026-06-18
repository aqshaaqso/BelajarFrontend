import { useCallback, useMemo, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Form,
  Modal,
  Table,
} from "react-bootstrap";
import PageHeader from "../components/PageHeader";
import DataState from "../components/DataState";
import Pagination from "../components/Pagination";
import {
  deleteProduct,
  getProducts,
  saveProduct,
  updateProduct,
} from "../services/productStore";
import { usePagination } from "../hooks/usePagination";
import { useSearch } from "../context/SearchContext";
import { useDebounce } from "../hooks/useDebounce";
import { filterByQuery } from "../utils/search";
import { useToast } from "../context/ToastContext";

const emptyForm = { name: "", price: "", stock: "" };

const Products = () => {
  const { query } = useSearch();
  const debouncedQuery = useDebounce(query);
  const { addToast } = useToast();
  const [products, setProducts] = useState(() => getProducts());
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filteredProducts = useMemo(
    () =>
      filterByQuery(products, debouncedQuery, [
        "name",
        "status",
        (item) => String(item.price),
      ]),
    [products, debouncedQuery]
  );

  const pagination = usePagination(filteredProducts, 6);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: String(product.price),
      stock: String(product.stock),
    });
    setShowModal(true);
  };

  const refresh = useCallback(() => {
    setProducts(getProducts());
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      name: form.name.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
    };

    if (!payload.name || Number.isNaN(payload.price) || Number.isNaN(payload.stock)) {
      return;
    }

    if (editingId) {
      updateProduct(editingId, payload);
      addToast({
        message: `"${payload.name}" updated successfully.`,
        variant: "success",
      });
    } else {
      saveProduct(payload);
      addToast({
        message: `"${payload.name}" added to inventory.`,
        variant: "success",
      });
    }

    refresh();
    setShowModal(false);
  };

  const handleDelete = (product) => {
    deleteProduct(product.id);
    refresh();
    addToast({
      message: `"${product.name}" removed from inventory.`,
      variant: "warning",
    });
  };

  return (
    <>
      <PageHeader
        title="Products"
        subtitle="Manage inventory and stock levels"
        action={
          <Button variant="primary" onClick={openCreate}>
            Add Product
          </Button>
        }
      />

      <Card className="shadow-sm mb-2-sm">
        <Card.Body className="p-4">
          <DataState
            loading={false}
            error={null}
            isEmpty={filteredProducts.length === 0}
            emptyMessage="No products match your search."
          >
            <Table responsive className="mb-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagination.pageItems.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>{product.stock}</td>
                    <td>
                      <Badge
                        bg={
                          product.status === "In Stock"
                            ? "success"
                            : product.status === "Low Stock"
                            ? "warning"
                            : "danger"
                        }
                      >
                        {product.status}
                      </Badge>
                    </td>
                    <td className="text-end">
                      <Button
                        size="sm"
                        variant="outline-primary"
                        className="me-2"
                        onClick={() => openEdit(product)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => handleDelete(product)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              windowStart={pagination.windowStart}
              windowEnd={pagination.windowEnd}
              onPageChange={pagination.goToPage}
              onPrev={pagination.goPrev}
              onNext={pagination.goNext}
              hasPrev={pagination.hasPrev}
              hasNext={pagination.hasNext}
            />
          </DataState>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? "Edit Product" : "Add Product"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingId ? "Save Changes" : "Create Product"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Products;