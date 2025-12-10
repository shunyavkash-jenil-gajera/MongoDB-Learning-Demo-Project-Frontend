import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "../utils/constants";
import ProtectedRoute from "../components/ProtectedRoute";
import RoleBasedRoute from "../components/RoleBasedRoute";

// Layouts
import AdminLayout from "../layouts/AdminLayout";
import SellerLayout from "../layouts/SellerLayout";
import UserLayout from "../layouts/UserLayout";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import CreateSeller from "../pages/admin/CreateSeller";
import SellerList from "../pages/admin/SellerList";

// Seller Pages
import SellerDashboard from "../pages/seller/Dashboard";
import CreateProduct from "../pages/seller/CreateProduct";
import ProductList from "../pages/seller/ProductList";
import ProductEdit from "../pages/seller/ProductEdit";
import ProductPublish from "../pages/seller/ProductPublish";

// User Pages
import Home from "../pages/user/Home";
import Products from "../pages/user/Products";
import ProductDetails from "../pages/user/ProductDetails";
import Cart from "../pages/user/Cart";
import { loadUserFromToken } from "../features/auth/authSlice.js";
import store from "../app/store.js";

const AppRouter = () => {
  const user = localStorage.getItem("user");
  const accessToken = localStorage.getItem("accessToken");

  if (user && accessToken) {
    store.dispatch(
      loadUserFromToken({
        user: JSON.parse(user),
        accessToken,
      })
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />

      {/* Admin Routes */}
      <Route
        path="/admin/*"
        element={
          <RoleBasedRoute role="admin">
            <AdminLayout />
          </RoleBasedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="sellers/create" element={<CreateSeller />} />
        <Route path="sellers" element={<SellerList />} />
        <Route
          path="*"
          element={<Navigate to={ROUTES.ADMIN_DASHBOARD} replace />}
        />
      </Route>

      {/* Seller Routes */}
      <Route
        path="/seller/*"
        element={
          <RoleBasedRoute role="seller">
            <SellerLayout />
          </RoleBasedRoute>
        }
      >
        <Route path="dashboard" element={<SellerDashboard />} />
        <Route path="products/create" element={<CreateProduct />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/:id/edit" element={<ProductEdit />} />
        <Route path="products/:id/publish" element={<ProductPublish />} />
        <Route
          path="*"
          element={<Navigate to={ROUTES.SELLER_DASHBOARD} replace />}
        />
      </Route>

      {/* User Routes */}
      <Route
        path="/user/*"
        element={
          <RoleBasedRoute role="user">
            <UserLayout />
          </RoleBasedRoute>
        }
      >
        <Route path="home" element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<Navigate to={ROUTES.USER_HOME} replace />} />
      </Route>

      {/* Root redirect */}
      <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />
      <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
    </Routes>
  );
};

export default AppRouter;
