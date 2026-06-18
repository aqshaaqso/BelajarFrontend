import { createContext, useCallback, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useStorage";
import { useToast } from "./ToastContext";

const AuthContext = createContext(null);

const DEFAULT_USER = {
  id: "1",
  name: "Derrick",
  email: "derrick@dashboard.com",
  role: "Admin",
};

export const AuthProvider = ({ children }) => {
  const [user, setUser, removeUser] = useLocalStorage("dashboard-user");
  const navigate = useNavigate();
  const { addToast } = useToast();

  const login = useCallback(
    (credentials) => {
      const nextUser = {
        ...DEFAULT_USER,
        email: credentials.email.trim(),
        name: credentials.email.split("@")[0] || DEFAULT_USER.name,
      };
      setUser(nextUser);
      addToast({
        message: `Welcome back, ${nextUser.name}!`,
        variant: "success",
      });
      navigate("/admin");
    },
    [navigate, setUser, addToast]
  );

  const logout = useCallback(() => {
    removeUser();
    addToast({ message: "You have been signed out.", variant: "info" });
    navigate("/");
  }, [navigate, removeUser, addToast]);

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), login, logout }),
    [user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};