import axiosInstance from "./axios";

export const productApi = {
  // User endpoints
  getPublishedProducts: () => axiosInstance.get("/products"),
  getProductById: (id) => axiosInstance.get(`/products/${id}`),

  // Seller endpoints
  getSellerProducts: () => axiosInstance.get("/products"),
  createProduct: (productData) => {
    return axiosInstance.post("/products/create", productData);
  },
  updateProduct: (id, productData) => {
    return axiosInstance.put(`/products/update/${id}`, productData);
  },
  deleteProduct: (id) => axiosInstance.delete(`/products/delete/${id}`),
  // togglePublish: (id) => axiosInstance.patch(`/products/publish/${id}`),
  Publish: (id) => axiosInstance.patch(`/products/publish/${id}`),
  UnPublish: (id) => axiosInstance.patch(`/products/publish/${id}`),
};
