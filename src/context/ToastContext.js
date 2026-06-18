import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import ToastContainer from "../components/ToastContainer";
import { useSettings } from "./SettingsContext";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const { settings } = useSettings();
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    ({ message, variant = "success", delay = 4000 }) => {
      if (!settings.notifications) return null;

      const id = ++idRef.current;
      setToasts((prev) => [...prev, { id, message, variant }]);

      if (delay > 0) {
        setTimeout(() => removeToast(id), delay);
      }

      return id;
    },
    [settings.notifications, removeToast]
  );

  const value = useMemo(
    () => ({ addToast, removeToast }),
    [addToast, removeToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};