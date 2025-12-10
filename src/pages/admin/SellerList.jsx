import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchSellers,
  blockSeller,
  unblockSeller,
} from "../../features/sellers/sellerSlice";
import LoadingSpinner from "../../components/LoadingSpinner";
import ConfirmModal from "../../components/ConfirmModal";
import { ROUTES } from "../../utils/constants";

const SellerList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sellers, loading } = useSelector((state) => state.sellers);
  const [blockModal, setBlockModal] = useState({ isOpen: false, seller: null });

  useEffect(() => {
    dispatch(fetchSellers());
  }, [dispatch]);

  const handleBlock = (seller) => {
    setBlockModal({ isOpen: true, seller });
  };

  const handleConfirmBlock = () => {
    if (blockModal.seller) {
      if (blockModal.seller.isBlocked) {
        dispatch(unblockSeller(blockModal.seller._id));
      } else {
        dispatch(blockSeller(blockModal.seller._id));
      }
      setBlockModal({ isOpen: false, seller: null });
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
          <h1 className="text-3xl font-bold text-gray-900">Seller List</h1>
          <p className="mt-2 text-gray-600">
            Manage all sellers on the platform
          </p>
        </div>
        <button
          onClick={() => navigate(ROUTES.ADMIN_CREATE_SELLER)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          + Create Seller
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sellers.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No sellers found
                </td>
              </tr>
            ) : (
              sellers.map((seller) => (
                <tr key={seller._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {seller.firstName} {seller.lastName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{seller.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        seller.isBlocked
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {seller.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleBlock(seller)}
                      className={`${
                        seller.isBlocked
                          ? "text-green-600 hover:text-green-900"
                          : "text-red-600 hover:text-red-900"
                      }`}
                    >
                      {seller.isBlocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={blockModal.isOpen}
        onClose={() => setBlockModal({ isOpen: false, seller: null })}
        onConfirm={handleConfirmBlock}
        title={blockModal.seller?.isBlocked ? "Unblock Seller" : "Block Seller"}
        message={`Are you sure you want to ${
          blockModal.seller?.isBlocked ? "unblock" : "block"
        } ${blockModal.seller?.firstName} ${blockModal.seller?.lastName}?`}
        confirmText={blockModal.seller?.isBlocked ? "Unblock" : "Block"}
      />
    </div>
  );
};

export default SellerList;
