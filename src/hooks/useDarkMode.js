import { useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "./useStorage";

const getSystemDark = () => {
  if (typeof window.matchMedia !== "function") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

export default function useDarkMode() {
  const [stored, setStored] = useLocalStorage("useDarkMode");
  const [systemDark, setSystemDark] = useState(getSystemDark);

  const darkMode =
    stored !== undefined ? Boolean(stored) : systemDark;

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event) => setSystemDark(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const setDarkMode = useCallback(
    (updater) => {
      setStored((prev) => {
        const current = prev !== undefined ? Boolean(prev) : systemDark;
        return typeof updater === "function" ? updater(current) : updater;
      });
    },
    [systemDark, setStored]
  );

  return [darkMode, setDarkMode, stored === undefined];
}