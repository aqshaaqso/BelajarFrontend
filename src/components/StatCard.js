import { memo } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const StatCard = memo(({ title, value, description, icon, to }) => {
  const content = (
    <Card className="card shadow-sm h-100">
      <Card.Body className="card-body">
        <Row className="align-items-center">
          <Col xs={2}>{icon}</Col>
          <Col xs={10}>
            <h3 className="h5 mb-1">{title}</h3>
            {value !== undefined && (
              <p className="h4 text-primary mb-1">{value}</p>
            )}
            <p className="m-0 text-muted">{description}</p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );

  if (to) {
    return (
      <Link to={to} className="h-primary-outline mb-2-sm text-decoration-none">
        {content}
      </Link>
    );
  }

  return content;
});

StatCard.displayName = "StatCard";

export default StatCard;