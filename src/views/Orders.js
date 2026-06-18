import { useMemo } from "react";
import { Badge, Card, Table } from "react-bootstrap";
import PageHeader from "../components/PageHeader";
import DataState from "../components/DataState";
import Pagination from "../components/Pagination";
import { API } from "../services/api";
import { useFetch } from "../hooks/useFetch";
import { usePagination } from "../hooks/usePagination";
import { useSearch } from "../context/SearchContext";
import { useDebounce } from "../hooks/useDebounce";
import { filterByQuery } from "../utils/search";

const ORDER_STATUSES = ["Pending", "Processing", "Completed"];

const getOrderStatus = (id) => ORDER_STATUSES[id % ORDER_STATUSES.length];

const getStatusVariant = (status) => {
  if (status === "Completed") return "success";
  if (status === "Processing") return "warning";
  return "secondary";
};

const Orders = () => {
  const { query } = useSearch();
  const debouncedQuery = useDebounce(query);
  const { data: posts, loading, error } = useFetch("posts", API.posts);

  const orders = useMemo(
    () =>
      (posts || []).map((post) => ({
        id: post.id,
        customerId: post.userId,
        title: post.title,
        status: getOrderStatus(post.id),
      })),
    [posts]
  );

  const filteredOrders = useMemo(
    () =>
      filterByQuery(orders, debouncedQuery, [
        "title",
        "status",
        (order) => String(order.id),
        (order) => String(order.customerId),
      ]),
    [orders, debouncedQuery]
  );

  const pagination = usePagination(filteredOrders, 8);

  return (
    <>
      <PageHeader
        title="Orders"
        subtitle="Track order status across your store"
      />

      <Card className="shadow-sm mb-2-sm">
        <Card.Body className="p-4">
          <DataState
            loading={loading}
            error={error}
            isEmpty={!loading && filteredOrders.length === 0}
            emptyMessage="No orders match your search."
          >
            <Table responsive className="mb-0">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer ID</th>
                  <th>Item</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {pagination.pageItems.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>Customer {order.customerId}</td>
                    <td>{order.title}</td>
                    <td>
                      <Badge bg={getStatusVariant(order.status)}>
                        {order.status}
                      </Badge>
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
    </>
  );
};

export default Orders;