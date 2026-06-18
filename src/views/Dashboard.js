import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Table from "../components/Table";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import Pagination from "../components/Pagination";

const Dashboard = () => {
  const [dataTable, setDataTable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ show: false, data: null });

  const pageNumberLimit = 20;
  const [currentPage, setCurrentPage] = useState(0);
  const [maxPageLimit, setMaxPageLimit] = useState(15);
  const [minPageLimit, setMinPageLimit] = useState(0);

  useEffect(() => {
    const url = `${process.env.REACT_APP_PLACEHOLDER_ENDPOINT}/users?offset=${currentPage}`;
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setDataTable(json);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError({ show: true, data: error });
      }
    };

    fetchData();
  }, [currentPage]);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onPrevClick = () => {
    if ((currentPage - 0) % pageNumberLimit === 0) {
      setMaxPageLimit(maxPageLimit - pageNumberLimit);
      setMinPageLimit(minPageLimit - pageNumberLimit);
    }
    setCurrentPage((prev) => prev - 1);
  };

  const onNextClick = () => {
    if (currentPage + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + pageNumberLimit);
      setMinPageLimit(minPageLimit + pageNumberLimit);
    }
    setCurrentPage((prev) => prev + 1);
  };

  const paginationAttributes = {
    currentPage,
    maxPageLimit,
    minPageLimit,
    response: dataTable,
  };

  return (
    <>
      <h1 className="h2 my-4">Dashboard</h1>
      <Row className="row-stats mb-4 mb-2-sm">
        <Col md={3}>
          <a href="#" className="h-primary-outline mb-2-sm">
            <Card className="card shadow-sm">
              <Card.Body className="card-body">
                <Row>
                  <Col md={2}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      className="bi bi-activity"
                      viewBox="0 0 15 15"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z"
                      />
                    </svg>
                  </Col>
                  <Col md={10}>
                    <h3 className="h5">Modul Belajar</h3>
                    <p className="m-0 text-muted">
                      persiapan untuk coding FE codeheral.
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </a>
        </Col>
        <Col md={3}>
          <a href="#" className="h-primary-outline mb-2-sm">
            <Card className="card shadow-sm">
              <Card.Body className="card-body">
                <Row>
                  <Col md={2}>
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
                  </Col>
                  <Col md={10}>
                    <h3 className="h5">Satu satu</h3>
                    <p className="m-0 text-muted">Satu persatu menjadi abu.</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </a>
        </Col>
        <Col md={3}>
          <a href="#" className="h-primary-outline mb-2-sm">
            <Card className="card shadow-sm">
              <Card.Body className="card-body">
                <Row>
                  <Col md={2}>
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
                  </Col>
                  <Col md={10}>
                    <h3 className="h5">Lorem Ipsum</h3>
                    <p className="m-0 text-muted">
                      Lorem ipsum dolor sit amet, consectetur adipisicing.
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </a>
        </Col>
        <Col md={3}>
          <a href="#" className="h-primary-outline mb-2-sm">
            <Card className="card shadow-sm">
              <Card.Body className="card-body">
                <Row>
                  <Col md={2}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      className="bi bi-clock-history"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z" />
                      <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z" />
                      <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" />
                    </svg>
                  </Col>
                  <Col md={10}>
                    <h3 className="h5">Lorem Ipsum</h3>
                    <p className="m-0 text-muted">
                      Lorem ipsum dolor sit amet, consectetur adipisicing.
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </a>
        </Col>
      </Row>
      <Row className="row">
        <Col md={4}>
          <Card className="shadow-sm mb-2-sm">
            <Card.Body className="p-4 text-center">
              <img
                src="https://via.placeholder.com/550x225/454752/ffffff?text=Placeholder"
                alt=""
                className="img-fluid rounded mb-4"
              />
              <h3 className="h4">Lorem Ipsum Dolor</h3>
              <p className="text-muted">
                Lorem ipsum dolor sit amet consectetur adipisicing elit non
                perspiciatis, obcaecati quae itaque molestias, eius quas eaque.
              </p>
              <a href="#" className="btn btn-primary py-3 px-5">
                Lorem Ipsum Dolor
              </a>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="my-0 h3">Lorem Ipsum</h2>
              <div className="table-responsive mt-4 mb-2">
                {loading && <Loader />}
                {!loading && error.show && <ErrorMessage error={error} />}
                {dataTable.length !== 0 && <Table data={dataTable} />}
              </div>
              {dataTable.length !== 0 && (
                <Pagination
                  {...paginationAttributes}
                  onPrevClick={onPrevClick}
                  onNextClick={onNextClick}
                  onPageChange={onPageChange}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default Dashboard;
