export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api/v1";

export const ROLES = {
  ADMIN: "admin",
  SELLER: "seller",
  USER: "user",
};

export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_SELLERS: "/admin/sellers",
  ADMIN_CREATE_SELLER: "/admin/sellers/create",
  SELLER_DASHBOARD: "/seller/dashboard",
  SELLER_PRODUCTS: "/seller/products",
  SELLER_CREATE_PRODUCT: "/seller/products/create",
  USER_HOME: "/user/home",
  USER_PRODUCTS: "/user/products",
  USER_CART: "/user/cart",
};
