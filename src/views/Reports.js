import { useMemo } from "react";
import { Alert, Card, Col, ProgressBar, Row } from "react-bootstrap";
import PageHeader from "../components/PageHeader";
import DataState from "../components/DataState";
import { InventoryChart, OrderStatusChart } from "../components/ReportCharts";
import { API } from "../services/api";
import { getProductStats } from "../services/productStore";
import { useFetch } from "../hooks/useFetch";
import { useSettings } from "../context/SettingsContext";

const Reports = () => {
  const { settings } = useSettings();
  const { data: users, loading: usersLoading, error: usersError } = useFetch(
    "users",
    API.users
  );
  const { data: posts, loading: postsLoading, error: postsError } = useFetch(
    "posts",
    API.posts
  );

  const loading = usersLoading || postsLoading;
  const error = usersError || postsError;

  const productStats = useMemo(() => getProductStats(), []);

  const reportData = useMemo(() => {
    if (!users || !posts) return null;

    const completedOrders = posts.filter((post) => post.id % 3 === 2).length;
    const processingOrders = posts.filter((post) => post.id % 3 === 1).length;
    const pendingOrders = posts.length - completedOrders - processingOrders;

    return {
      customers: users.length,
      orders: posts.length,
      completedOrders,
      processingOrders,
      pendingOrders,
      products: productStats.total,
      inventoryValue: productStats.inventoryValue,
      stockHealth: Math.round(
        ((productStats.inStock + productStats.lowStock) / productStats.total) * 100
      ),
    };
  }, [users, posts, productStats]);

  return (
    <>
      <PageHeader
        title="Reports"
        subtitle="Business metrics and performance insights"
      />

      {settings.weeklyReport && (
        <Alert variant="info" className="mb-4">
          Weekly summary reports are enabled. In a production app, this preference
          would schedule an email digest every Monday.
        </Alert>
      )}

      <DataState loading={loading} error={error} isEmpty={false} skeleton="cards">
        <Row className="g-4 mb-4">
          <Col md={4}>
            <Card className="shadow-sm h-100">
              <Card.Body className="p-4">
                <h3 className="h5">Sales Overview</h3>
                <p className="display-6 text-primary mb-0">{reportData?.orders}</p>
                <p className="text-muted">Total orders tracked</p>
                <hr />
                <div className="mb-2 d-flex justify-content-between">
                  <span>Completed</span>
                  <strong>{reportData?.completedOrders}</strong>
                </div>
                <div className="mb-2 d-flex justify-content-between">
                  <span>Processing</span>
                  <strong>{reportData?.processingOrders}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Pending</span>
                  <strong>{reportData?.pendingOrders}</strong>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="shadow-sm h-100">
              <Card.Body className="p-4">
                <h3 className="h5">Inventory Health</h3>
                <p className="display-6 text-primary mb-0">
                  {reportData?.stockHealth}%
                </p>
                <p className="text-muted">Products with available stock</p>
                <ProgressBar now={reportData?.stockHealth} className="mb-3" />
                <div className="mb-2 d-flex justify-content-between">
                  <span>In stock</span>
                  <strong>{productStats.inStock}</strong>
                </div>
                <div className="mb-2 d-flex justify-content-between">
                  <span>Low stock</span>
                  <strong>{productStats.lowStock}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Out of stock</span>
                  <strong>{productStats.outOfStock}</strong>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="shadow-sm h-100">
              <Card.Body className="p-4">
                <h3 className="h5">Business Summary</h3>
                <div className="mb-3">
                  <small className="text-muted">Customers</small>
                  <p className="h4 mb-0">{reportData?.customers}</p>
                </div>
                <div className="mb-3">
                  <small className="text-muted">Active Products</small>
                  <p className="h4 mb-0">{reportData?.products}</p>
                </div>
                <div>
                  <small className="text-muted">Inventory Value</small>
                  <p className="h4 mb-0">
                    ${reportData?.inventoryValue.toFixed(2)}
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="g-4">
          <Col lg={6}>
            <Card className="shadow-sm h-100">
              <Card.Body className="p-4">
                <h3 className="h5 mb-1">Order Status Breakdown</h3>
                <p className="text-muted mb-4">
                  Distribution of orders by fulfillment stage
                </p>
                <OrderStatusChart
                  completed={reportData?.completedOrders}
                  processing={reportData?.processingOrders}
                  pending={reportData?.pendingOrders}
                />
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6}>
            <Card className="shadow-sm h-100">
              <Card.Body className="p-4">
                <h3 className="h5 mb-1">Inventory Levels</h3>
                <p className="text-muted mb-4">
                  Product counts by stock availability
                </p>
                <InventoryChart
                  inStock={productStats.inStock}
                  lowStock={productStats.lowStock}
                  outOfStock={productStats.outOfStock}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </DataState>
    </>
  );
};

export default Reports;