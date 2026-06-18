import { createContext, useCallback, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useStorage";

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

  const login = useCallback(
    (credentials) => {
      const nextUser = {
        ...DEFAULT_USER,
        email: credentials.email.trim(),
        name: credentials.email.split("@")[0] || DEFAULT_USER.name,
      };
      setUser(nextUser);
      navigate("/admin");
    },
    [navigate, setUser]
  );

  const logout = useCallback(() => {
    removeUser();
    navigate("/");
  }, [navigate, removeUser]);

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