import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSellerProducts } from '../../features/products/productSlice';
import LoadingSpinner from '../../components/LoadingSpinner';

const SellerDashboard = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchSellerProducts());
  }, [dispatch]);

  const totalProducts = products.length;
  const publishedProducts = products.filter((p) => p.isPublished).length;
  const unpublishedProducts = totalProducts - publishedProducts;

  const stats = [
    {
      title: 'Total Products',
      value: totalProducts,
      icon: '📦',
      color: 'bg-blue-500',
    },
    {
      title: 'Published Products',
      value: publishedProducts,
      icon: '✅',
      color: 'bg-green-500',
    },
    {
      title: 'Unpublished Products',
      value: unpublishedProducts,
      icon: '⏸️',
      color: 'bg-yellow-500',
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
        <p className="mt-2 text-gray-600">Manage your products and sales</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} w-16 h-16 rounded-full flex items-center justify-center text-3xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <h3 className="font-medium text-gray-900">Create Product</h3>
            <p className="text-sm text-gray-600 mt-1">Add a new product to your store</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <h3 className="font-medium text-gray-900">Manage Products</h3>
            <p className="text-sm text-gray-600 mt-1">View and edit your products</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;

