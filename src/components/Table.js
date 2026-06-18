import { memo, useMemo, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import UserAvatar from "./UserAvatar";
import { useToast } from "../context/ToastContext";

const mergeCustomer = (customer, overrides) => {
  const patch = overrides[customer.id];
  return patch ? { ...customer, ...patch } : customer;
};

const Table = memo(({ data = [] }) => {
  const { addToast } = useToast();
  const [selectedIds, setSelectedIds] = useState(() => new Set());
  const [archivedIds, setArchivedIds] = useState(() => new Set());
  const [overrides, setOverrides] = useState({});
  const [viewCustomer, setViewCustomer] = useState(null);
  const [editCustomer, setEditCustomer] = useState(null);
  const [archiveTarget, setArchiveTarget] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", username: "" });

  const displayData = useMemo(
    () =>
      data
        .filter((customer) => !archivedIds.has(customer.id))
        .map((customer) => mergeCustomer(customer, overrides)),
    [data, archivedIds, overrides]
  );

  const visibleIds = displayData.map((customer) => customer.id);
  const allSelected =
    visibleIds.length > 0 && visibleIds.every((id) => selectedIds.has(id));
  const someSelected = visibleIds.some((id) => selectedIds.has(id));

  const toggleAll = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allSelected) {
        visibleIds.forEach((id) => next.delete(id));
      } else {
        visibleIds.forEach((id) => next.add(id));
      }
      return next;
    });
  };

  const toggleRow = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const openEdit = (customer) => {
    setEditCustomer(customer);
    setEditForm({
      name: customer.name,
      email: customer.email,
      username: customer.username,
    });
  };

  const handleEditSave = (event) => {
    event.preventDefault();
    if (!editCustomer) return;

    setOverrides((prev) => ({
      ...prev,
      [editCustomer.id]: {
        name: editForm.name.trim(),
        email: editForm.email.trim(),
        username: editForm.username.trim(),
      },
    }));
    setEditCustomer(null);
    addToast({
      message: `${editForm.name.trim()} updated successfully.`,
      variant: "success",
    });
  };

  const confirmArchive = () => {
    if (!archiveTarget) return;
    setArchivedIds((prev) => new Set([...prev, archiveTarget.id]));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(archiveTarget.id);
      return next;
    });
    addToast({
      message: `${archiveTarget.name} archived.`,
      variant: "warning",
    });
    setArchiveTarget(null);
  };

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">
              <input
                className="form-check-input"
                type="checkbox"
                aria-label="Select all"
                checked={allSelected}
                ref={(input) => {
                  if (input) input.indeterminate = someSelected && !allSelected;
                }}
                onChange={toggleAll}
              />
            </th>
            <th scope="col" />
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Company</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          {displayData.map(({ id, name, username, email, company, phone, website, address }) => (
            <tr key={id ?? `${name}-${username}`}>
              <td>
                <input
                  className="form-check-input"
                  type="checkbox"
                  aria-label={`Select ${name}`}
                  checked={selectedIds.has(id)}
                  onChange={() => toggleRow(id)}
                />
              </td>
              <td>
                <UserAvatar
                  name={name}
                  seed={username || String(id)}
                  size={40}
                  variant="customer"
                  className="img-fluid rounded-circle border"
                />
              </td>
              <td>{name}</td>
              <td>{username}</td>
              <td>{email}</td>
              <td>{company?.name}</td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="success"
                    className="text-primary dropdown-action"
                    id={`dropdown-${id}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-three-dots-vertical"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    </svg>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() =>
                        setViewCustomer({ id, name, username, email, company, phone, website, address })
                      }
                    >
                      View
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        openEdit({ id, name, username, email, company, phone, website, address })
                      }
                    >
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      className="text-danger"
                      onClick={() => setArchiveTarget({ id, name })}
                    >
                      Archive
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={Boolean(viewCustomer)} onHide={() => setViewCustomer(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Customer Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewCustomer && (
            <>
              <div className="d-flex align-items-center gap-3 mb-4">
                <UserAvatar
                  name={viewCustomer.name}
                  seed={viewCustomer.username || String(viewCustomer.id)}
                  size={56}
                  variant="customer"
                  className="rounded-circle border"
                />
                <div>
                  <h2 className="h5 mb-1">{viewCustomer.name}</h2>
                  <p className="text-muted mb-0">@{viewCustomer.username}</p>
                </div>
              </div>
              <dl className="row mb-0">
                <dt className="col-sm-4">Email</dt>
                <dd className="col-sm-8">{viewCustomer.email}</dd>
                <dt className="col-sm-4">Company</dt>
                <dd className="col-sm-8">{viewCustomer.company?.name || "—"}</dd>
                <dt className="col-sm-4">Phone</dt>
                <dd className="col-sm-8">{viewCustomer.phone || "—"}</dd>
                <dt className="col-sm-4">Website</dt>
                <dd className="col-sm-8">{viewCustomer.website || "—"}</dd>
                <dt className="col-sm-4">City</dt>
                <dd className="col-sm-8">{viewCustomer.address?.city || "—"}</dd>
              </dl>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setViewCustomer(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={Boolean(editCustomer)} onHide={() => setEditCustomer(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Customer</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditSave}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={editForm.username}
                onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setEditCustomer(null)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={Boolean(archiveTarget)} onHide={() => setArchiveTarget(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Archive Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {archiveTarget && (
            <p className="mb-0">
              Archive <strong>{archiveTarget.name}</strong>? They will be hidden from
              this table for the current session.
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setArchiveTarget(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmArchive}>
            Archive
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});

Table.displayName = "Table";

export default Table;