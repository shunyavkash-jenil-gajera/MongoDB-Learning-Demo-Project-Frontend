import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/products/productSlice";
import sellerReducer from "../features/sellers/sellerSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    sellers: sellerReducer,
  },
});
