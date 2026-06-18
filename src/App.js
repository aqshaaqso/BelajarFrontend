import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";

const Login = lazy(() => import("./views/Login"));
const Dashboard = lazy(() => import("./views/Dashboard"));
const Orders = lazy(() => import("./views/Orders"));
const Products = lazy(() => import("./views/Products"));
const Customers = lazy(() => import("./views/Customers"));
const Reports = lazy(() => import("./views/Reports"));
const Settings = lazy(() => import("./views/Settings"));
const Profile = lazy(() => import("./views/Profile"));

const PageLoader = () => (
  <div className="p-5">
    <Loader message="Loading page..." />
  </div>
);

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;