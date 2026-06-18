import { useState } from "react";
import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";
import PageHeader from "../components/PageHeader";
import DarkMode from "../components/DarkMode";
import { useSettings } from "../context/SettingsContext";
import { useToast } from "../context/ToastContext";

const Settings = () => {
  const { settings, updateSetting } = useSettings();
  const { addToast } = useToast();
  const [savedLocally, setSavedLocally] = useState(false);

  const handleSave = () => {
    if (settings.notifications) {
      addToast({ message: "Settings saved successfully.", variant: "success" });
      return;
    }

    setSavedLocally(true);
    setTimeout(() => setSavedLocally(false), 2500);
  };

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Customize your dashboard experience"
      />

      {savedLocally && (
        <Alert variant="success" className="mb-4">
          Settings saved successfully.
        </Alert>
      )}

      <Row className="g-4">
        <Col md={8}>
          <Card className="shadow-sm mb-2-sm">
            <Card.Body className="p-4">
              <h3 className="h4 mb-4">Preferences</h3>
              <Form>
                <Form.Check
                  type="switch"
                  id="notifications"
                  className="mb-3"
                  label="Toast notifications"
                  checked={settings.notifications}
                  onChange={(e) => updateSetting("notifications", e.target.checked)}
                />
                <p className="text-muted small ms-5 mb-3">
                  Show feedback toasts for login, saves, and table actions.
                </p>
                <Form.Check
                  type="switch"
                  id="weeklyReport"
                  className="mb-3"
                  label="Weekly summary report"
                  checked={settings.weeklyReport}
                  onChange={(e) => updateSetting("weeklyReport", e.target.checked)}
                />
                <p className="text-muted small ms-5 mb-3">
                  Displays a reminder banner on the Reports page when enabled.
                </p>
                <Form.Check
                  type="switch"
                  id="compactTables"
                  className="mb-4"
                  label="Compact table layout"
                  checked={settings.compactTables}
                  onChange={(e) => updateSetting("compactTables", e.target.checked)}
                />
                <p className="text-muted small ms-5 mb-4">
                  Reduces row padding across all tables immediately.
                </p>
                <Button variant="primary" onClick={handleSave}>
                  Save Preferences
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h3 className="h4 mb-3">Appearance</h3>
              <DarkMode />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Settings;