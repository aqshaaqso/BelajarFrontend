import { Form } from "react-bootstrap";
import useDarkMode from "../hooks/useDarkMode";

export default function DarkMode() {
  const [darkMode, setDarkMode, usesSystemTheme] = useDarkMode();

  return (
    <Form className="theme-switch">
      <Form.Check
        type="switch"
        id="custom-switch"
        label={usesSystemTheme ? "Dark Mode (System)" : "Dark Mode"}
        checked={darkMode}
        onChange={() => setDarkMode((prevDarkMode) => !prevDarkMode)}
      />
    </Form>
  );
}
