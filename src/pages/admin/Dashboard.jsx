import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellers } from "../../features/sellers/sellerSlice";
import { fetchPublishedProducts } from "../../features/products/productSlice";
import LoadingSpinner from "../../components/LoadingSpinner";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { sellers, loading: sellersLoading } = useSelector(
    (state) => state.sellers
  );
  const { products, loading: productsLoading } = useSelector(
    (state) => state.products
  );

  console.log("Sellers:", sellers);
  console.log("Products:", products);

  useEffect(() => {
    dispatch(fetchSellers());
    dispatch(fetchPublishedProducts());
  }, [dispatch]);

  const totalSellers = sellers?.length;
  console.log("Total Sellers:", totalSellers);
  const totalProducts = products?.length;
  console.log("Total Products:", totalProducts);

  const stats = [
    {
      title: "Total Sellers",
      value: totalSellers,
      icon: "👥",
      color: "bg-blue-500",
    },
    {
      title: "Total Products",
      value: totalProducts,
      icon: "📦",
      color: "bg-green-500",
    },
  ];

  if (sellersLoading || productsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Overview of your e-commerce platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stat.value}
                </p>
              </div>
              <div
                className={`${stat.color} w-16 h-16 rounded-full flex items-center justify-center text-3xl`}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <h3 className="font-medium text-gray-900">Manage Sellers</h3>
            <p className="text-sm text-gray-600 mt-1">
              View and manage all sellers
            </p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <h3 className="font-medium text-gray-900">Create Seller</h3>
            <p className="text-sm text-gray-600 mt-1">
              Add a new seller to the platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
