import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { useLocalStorage } from "../hooks/useStorage";

const SettingsContext = createContext(null);

export const DEFAULT_SETTINGS = {
  notifications: true,
  weeklyReport: true,
  compactTables: false,
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useLocalStorage(
    "dashboard-settings",
    DEFAULT_SETTINGS
  );

  useEffect(() => {
    document.body.classList.toggle("compact-tables", Boolean(settings?.compactTables));
  }, [settings?.compactTables]);

  const updateSetting = useCallback((key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, [setSettings]);

  const value = useMemo(
    () => ({ settings: settings ?? DEFAULT_SETTINGS, updateSetting, setSettings }),
    [settings, updateSetting, setSettings]
  );

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return context;
};