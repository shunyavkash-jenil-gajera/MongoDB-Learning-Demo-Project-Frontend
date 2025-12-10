import axiosInstance from "./axios";

export const sellerApi = {
  createSeller: (sellerData) =>
    axiosInstance.post("/admin/sellers", sellerData),
  getSellers: () => axiosInstance.get("/admin/sellers"),
  blockSeller: (id) => axiosInstance.patch(`/admin/sellers/${id}/block`),
  unblockSeller: (id) => axiosInstance.patch(`/admin/sellers/${id}/unblock`),
};
