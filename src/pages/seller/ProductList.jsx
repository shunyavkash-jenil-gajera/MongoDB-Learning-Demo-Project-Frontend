import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchSellerProducts,
  deleteProduct,
  togglePublishProduct,
} from "../../features/products/productSlice";
import LoadingSpinner from "../../components/LoadingSpinner";
import ConfirmModal from "../../components/ConfirmModal";
import { formatCurrency } from "../../utils/helpers";
import { ROUTES } from "../../utils/constants";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading } = useSelector((state) => state.products);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    productId: null,
  });
  const [publishModal, setPublishModal] = useState({
    isOpen: false,
    product: null,
  });

  useEffect(() => {
    dispatch(fetchSellerProducts());
  }, [dispatch]);

  const handleDelete = (productId) => {
    setDeleteModal({ isOpen: true, productId });
  };

  const handleConfirmDelete = () => {
    if (deleteModal.productId) {
      dispatch(deleteProduct(deleteModal.productId));
      setDeleteModal({ isOpen: false, productId: null });
    }
  };

  const handleTogglePublish = (product) => {
    setPublishModal({ isOpen: true, product });
  };

  const handleConfirmPublish = () => {
    if (publishModal.product) {
      dispatch(togglePublishProduct(publishModal.product._id));
      setPublishModal({ isOpen: false, product: null });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Products</h1>
          <p className="mt-2 text-gray-600">Manage your product inventory</p>
        </div>
        <button
          onClick={() => navigate(ROUTES.SELLER_CREATE_PRODUCT)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          + Create Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No products found. Create your first product!
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            >
              {product.images && product.images.length > 0 && (
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-indigo-600">
                    {formatCurrency(product.price)}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      product.isPublished
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {product.isPublished ? "Published" : "Unpublished"}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      navigate(`/seller/products/${product._id}/edit`)
                    }
                    className="flex-1 px-3 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleTogglePublish(product)}
                    className={`flex-1 px-3 py-2 text-sm rounded-md ${
                      product.isPublished
                        ? "bg-yellow-600 text-white hover:bg-yellow-700"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    {product.isPublished ? "Unpublish" : "Publish"}
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, productId: null })}
        onConfirm={handleConfirmDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Delete"
      />

      <ConfirmModal
        isOpen={publishModal.isOpen}
        onClose={() => setPublishModal({ isOpen: false, product: null })}
        onConfirm={handleConfirmPublish}
        title={
          publishModal.product?.isPublished
            ? "Unpublish Product"
            : "Publish Product"
        }
        message={`Are you sure you want to ${
          publishModal.product?.isPublished ? "unpublish" : "publish"
        } "${publishModal.product?.title}"?`}
        confirmText={
          publishModal.product?.isPublished ? "Unpublish" : "Publish"
        }
      />
    </div>
  );
};

export default ProductList;
