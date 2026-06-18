import { useMemo } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Table from "../components/Table";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import DataState from "../components/DataState";
import Pagination from "../components/Pagination";
import { API } from "../services/api";
import { getProductStats } from "../services/productStore";
import { useFetch } from "../hooks/useFetch";
import { usePagination } from "../hooks/usePagination";
import { useSearch } from "../context/SearchContext";
import { useDebounce } from "../hooks/useDebounce";
import { filterByQuery } from "../utils/search";

const statIcons = {
  customers: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="currentColor"
      className="bi bi-people"
      viewBox="0 0 16 16"
    >
      <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216Z" />
      <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
    </svg>
  ),
  orders: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="currentColor"
      className="bi bi-card-checklist"
      viewBox="0 0 16 16"
    >
      <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
      <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z" />
    </svg>
  ),
  products: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="currentColor"
      className="bi bi-bag-plus"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
      />
      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
    </svg>
  ),
  reports: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="currentColor"
      className="bi bi-bar-chart"
      viewBox="0 0 16 16"
    >
      <path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z" />
    </svg>
  ),
};

const Dashboard = () => {
  const { query } = useSearch();
  const debouncedQuery = useDebounce(query);
  const { data: users, loading, error } = useFetch("users", API.users);
  const { data: posts } = useFetch("posts", API.posts);
  const productStats = useMemo(() => getProductStats(), []);

  const filteredUsers = useMemo(
    () =>
      filterByQuery(users || [], debouncedQuery, [
        "name",
        "username",
        "email",
        (user) => user.company?.name,
        (user) => user.address?.city,
      ]),
    [users, debouncedQuery]
  );

  const pagination = usePagination(filteredUsers, 5);

  const statCards = [
    {
      title: "Customers",
      value: users?.length,
      description: "Total registered customers",
      icon: statIcons.customers,
      to: "/admin/customers",
    },
    {
      title: "Orders",
      value: posts?.length,
      description: "Orders tracked in the system",
      icon: statIcons.orders,
      to: "/admin/orders",
    },
    {
      title: "Products",
      value: productStats.total,
      description: "Active products in inventory",
      icon: statIcons.products,
      to: "/admin/products",
    },
    {
      title: "Reports",
      value: productStats.lowStock > 0 ? `${productStats.lowStock} low` : undefined,
      description: "Business metrics and insights",
      icon: statIcons.reports,
      to: "/admin/reports",
    },
  ];

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Overview of your store activity"
      />

      <Row className="row-stats mb-4 mb-2-sm g-3">
        {statCards.map((card) => (
          <Col key={card.to} md={6} lg={3}>
            <StatCard {...card} />
          </Col>
        ))}
      </Row>

      <Row className="g-4">
        <Col md={4}>
          <Card className="shadow-sm mb-2-sm h-100">
            <Card.Body className="p-4 text-center d-flex flex-column">
              <img
                src="https://via.placeholder.com/550x225/6246ea/ffffff?text=Admin+Dashboard"
                alt="Dashboard preview"
                className="img-fluid rounded mb-4"
              />
              <h3 className="h4">Business Insights</h3>
              <p className="text-muted flex-grow-1">
                Review sales trends, inventory health, and customer activity
                from a single reports view.
              </p>
              <Button
                as={Link}
                to="/admin/reports"
                variant="primary"
                className="py-3 px-5 align-self-center"
              >
                View Reports
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="shadow-sm h-100">
            <Card.Body className="p-4">
              <h2 className="my-0 h3">Recent Customers</h2>
              <p className="text-muted mt-1 mb-0">
                Use the header search to filter this list.
              </p>
              <div className="table-responsive mt-4 mb-2">
                <DataState
                  loading={loading}
                  error={error}
                  isEmpty={!loading && filteredUsers.length === 0}
                  emptyMessage="No customers match your search."
                  skeleton="table"
                >
                  <Table data={pagination.pageItems} />
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
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;