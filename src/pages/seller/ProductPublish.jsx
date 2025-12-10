import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSellerProducts, togglePublishProduct } from '../../features/products/productSlice';
import LoadingSpinner from '../../components/LoadingSpinner';
import ConfirmModal from '../../components/ConfirmModal';
import { ROUTES } from '../../utils/constants';

const ProductPublish = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading } = useSelector((state) => state.products);
  const [product, setProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchSellerProducts());
  }, [dispatch]);

  useEffect(() => {
    const foundProduct = products.find((p) => p._id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setShowModal(true);
    }
  }, [products, id]);

  const handleConfirm = () => {
    if (product) {
      dispatch(togglePublishProduct(product._id));
      navigate(ROUTES.SELLER_PRODUCTS);
    }
  };

  const handleCancel = () => {
    navigate(ROUTES.SELLER_PRODUCTS);
  };

  if (loading && !product) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {product.isPublished ? 'Unpublish' : 'Publish'} Product
          </h1>
          <p className="mt-2 text-gray-600">Manage product visibility</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            {product.images && product.images.length > 0 && (
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
            )}
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex items-center space-x-4">
              <span className="text-xl font-bold text-indigo-600">${product.price}</span>
              <span className="text-gray-600">Stock: {product.stock}</span>
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  product.isPublished
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {product.isPublished ? 'Published' : 'Unpublished'}
              </span>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
            <p className="text-yellow-800">
              {product.isPublished
                ? 'Unpublishing this product will hide it from customers. You can republish it anytime.'
                : 'Publishing this product will make it visible to all customers.'}
            </p>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading}
              className={`px-6 py-2 text-white rounded-md disabled:opacity-50 flex items-center space-x-2 ${
                product.isPublished
                  ? 'bg-yellow-600 hover:bg-yellow-700'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>Processing...</span>
                </>
              ) : (
                product.isPublished ? 'Unpublish Product' : 'Publish Product'
              )}
            </button>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showModal}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        title={product.isPublished ? 'Unpublish Product' : 'Publish Product'}
        message={`Are you sure you want to ${
          product.isPublished ? 'unpublish' : 'publish'
        } "${product.title}"?`}
        confirmText={product.isPublished ? 'Unpublish' : 'Publish'}
        cancelText="Cancel"
      />
    </>
  );
};

export default ProductPublish;

