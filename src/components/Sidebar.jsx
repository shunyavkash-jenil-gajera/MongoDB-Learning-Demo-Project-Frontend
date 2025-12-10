import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../utils/constants";

const Sidebar = ({ role }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const adminLinks = [
    { path: ROUTES.ADMIN_DASHBOARD, label: "Dashboard", icon: "📊" },
    { path: ROUTES.ADMIN_CREATE_SELLER, label: "Create Seller", icon: "➕" },
    { path: ROUTES.ADMIN_SELLERS, label: "Seller List", icon: "👥" },
  ];

  const sellerLinks = [
    { path: ROUTES.SELLER_DASHBOARD, label: "Dashboard", icon: "📊" },
    { path: ROUTES.SELLER_CREATE_PRODUCT, label: "Create Product", icon: "➕" },
    { path: ROUTES.SELLER_PRODUCTS, label: "Products", icon: "📦" },
  ];

  const links = role === "admin" ? adminLinks : sellerLinks;

  return (
    <div className="w-64 bg-gray-800 min-h-screen text-white">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6">
          {role === "admin" ? "Admin Panel" : "Seller Panel"}
        </h2>
        <nav className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                isActive(link.path)
                  ? "bg-indigo-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
