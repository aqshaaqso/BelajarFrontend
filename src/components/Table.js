import { memo } from "react";
import { Dropdown } from "react-bootstrap";
import UserAvatar from "./UserAvatar";

const Table = memo(({ data = [] }) => (
  <table className="table table-striped">
    <thead>
      <tr>
        <th scope="col">
          <input
            className="form-check-input"
            type="checkbox"
            aria-label="Select all"
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
      {data.map(({ id, name, username, email, company }) => (
        <tr key={id ?? `${name}-${username}`}>
          <td>
            <input
              className="form-check-input"
              type="checkbox"
              aria-label={`Select ${name}`}
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
                <Dropdown.Item href="#view">View</Dropdown.Item>
                <Dropdown.Item href="#edit">Edit</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#archive" className="text-danger">
                  Archive
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
));

Table.displayName = "Table";

export default Table;
