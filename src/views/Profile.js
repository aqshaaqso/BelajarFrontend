import { Card, Col, Row } from "react-bootstrap";
import PageHeader from "../components/PageHeader";
import { useAuth } from "../context/AuthContext";
import UserAvatar from "../components/UserAvatar";

const Profile = () => {
  const { user } = useAuth();

  return (
    <>
      <PageHeader title="Profile" subtitle="Your account information" />

      <Row>
        <Col md={8}>
          <Card className="shadow-sm mb-2-sm">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                <UserAvatar
                  name={user?.name}
                  size={72}
                  className="rounded-circle"
                />
                <div>
                  <h2 className="h4 mb-1">{user?.name}</h2>
                  <p className="text-muted mb-0">{user?.email}</p>
                </div>
              </div>
              <Row>
                <Col sm={6} className="mb-3">
                  <small className="text-muted">User ID</small>
                  <p className="mb-0">{user?.id}</p>
                </Col>
                <Col sm={6} className="mb-3">
                  <small className="text-muted">Role</small>
                  <p className="mb-0">{user?.role}</p>
                </Col>
                <Col sm={6}>
                  <small className="text-muted">Status</small>
                  <p className="mb-0 text-success">Active</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Profile;