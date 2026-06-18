import { Button, Col, Dropdown, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSearch } from "../context/SearchContext";
import UserAvatar from "./UserAvatar";

const Header = ({ handleSidebar }) => {
  const { user, logout } = useAuth();
  const { query, setQuery } = useSearch();

  return (
    <nav className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-md-3 bg-white shadow-sm">
      <Row className="align-items-center">
        <Button
          className="btn btn-link"
          onClick={handleSidebar}
          id="sidebar-toggle"
          aria-label="Toggle sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </Button>
        <Col md={4} className="ps-md-2 ps-4">
          <form role="search" onSubmit={(e) => e.preventDefault()}>
            <div className="search-group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
              <input
                type="search"
                className="form-control"
                placeholder="Search..."
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </form>
        </Col>
        <Col md={8}>
          <Dropdown align="end" className="dropdown-usrn">
            <Dropdown.Toggle
              as="button"
              className="btn btn-link link-dark text-decoration-none dropdown-toggle border-0 shadow-none"
            >
              <UserAvatar
                name={user?.name}
                size={32}
                className="rounded-circle me-1"
              />
              {user?.name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/admin/profile">
                Profile
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/admin/settings">
                Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </nav>
  );
};

export default Header;