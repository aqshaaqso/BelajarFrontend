import { Navigate, Outlet } from "react-router-dom";
import Layout from "./Layout";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ redirectPath = "/" }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default ProtectedRoute;