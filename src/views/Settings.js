import { useState } from "react";
import { Button, Card, Col, Form, Row, Alert } from "react-bootstrap";
import PageHeader from "../components/PageHeader";
import DarkMode from "../components/DarkMode";
import { useLocalStorage } from "../hooks/useStorage";

const DEFAULT_SETTINGS = {
  notifications: true,
  weeklyReport: true,
  compactTables: false,
};

const Settings = () => {
  const [settings, setSettings] = useLocalStorage("dashboard-settings", DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Customize your dashboard experience"
      />

      {saved && (
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
                  label="Email notifications"
                  checked={settings.notifications}
                  onChange={(e) => updateSetting("notifications", e.target.checked)}
                />
                <Form.Check
                  type="switch"
                  id="weeklyReport"
                  className="mb-3"
                  label="Weekly summary report"
                  checked={settings.weeklyReport}
                  onChange={(e) => updateSetting("weeklyReport", e.target.checked)}
                />
                <Form.Check
                  type="switch"
                  id="compactTables"
                  className="mb-4"
                  label="Compact table layout"
                  checked={settings.compactTables}
                  onChange={(e) => updateSetting("compactTables", e.target.checked)}
                />
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