import { useMemo } from "react";
import { Card } from "react-bootstrap";
import Table from "../components/Table";
import PageHeader from "../components/PageHeader";
import DataState from "../components/DataState";
import Pagination from "../components/Pagination";
import { API } from "../services/api";
import { useFetch } from "../hooks/useFetch";
import { usePagination } from "../hooks/usePagination";
import { useSearch } from "../context/SearchContext";
import { useDebounce } from "../hooks/useDebounce";
import { filterByQuery } from "../utils/search";

const Customers = () => {
  const { query } = useSearch();
  const debouncedQuery = useDebounce(query);
  const { data: users, loading, error } = useFetch("users", API.users);

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

  const pagination = usePagination(filteredUsers, 6);

  return (
    <>
      <PageHeader
        title="Customers"
        subtitle="Browse and search your customer directory"
      />

      <Card className="shadow-sm mb-2-sm">
        <Card.Body className="p-4">
          <DataState
            loading={loading}
            error={error}
            isEmpty={!loading && filteredUsers.length === 0}
            emptyMessage="No customers match your search."
            skeleton="table"
          >
            <div className="table-responsive">
              <Table data={pagination.pageItems} />
            </div>
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

export default Customers;