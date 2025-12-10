import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sellerApi } from "../../api/sellerApi";
import toast from "react-hot-toast";

export const createSeller = createAsyncThunk(
  "sellers/create",
  async (sellerData, { rejectWithValue }) => {
    try {
      const response = await sellerApi.createSeller(sellerData);
      toast.success("Seller created successfully!");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create seller");
      return rejectWithValue(
        error.response?.data?.message || "Failed to create seller"
      );
    }
  }
);

export const fetchSellers = createAsyncThunk(
  "sellers/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await sellerApi.getSellers();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch sellers"
      );
    }
  }
);

export const blockSeller = createAsyncThunk(
  "sellers/block",
  async (id, { rejectWithValue }) => {
    try {
      const response = await sellerApi.blockSeller(id);
      toast.success("Seller blocked successfully!");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to block seller");
      return rejectWithValue(
        error.response?.data?.message || "Failed to block seller"
      );
    }
  }
);

export const unblockSeller = createAsyncThunk(
  "sellers/unblock",
  async (id, { rejectWithValue }) => {
    try {
      const response = await sellerApi.unblockSeller(id);
      toast.success("Seller unblocked successfully!");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to unblock seller");
      return rejectWithValue(
        error.response?.data?.message || "Failed to unblock seller"
      );
    }
  }
);

const sellerSlice = createSlice({
  name: "sellers",
  initialState: {
    sellers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.sellers.push(action.payload);
      })
      .addCase(createSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellers.fulfilled, (state, action) => {
        state.loading = false;
        state.sellers = action.payload;
      })
      .addCase(fetchSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(blockSeller.fulfilled, (state, action) => {
        const index = state.sellers.findIndex(
          (s) => s._id === action.payload._id
        );
        if (index !== -1) {
          state.sellers[index] = action.payload;
        }
      })
      .addCase(unblockSeller.fulfilled, (state, action) => {
        const index = state.sellers.findIndex(
          (s) => s._id === action.payload._id
        );
        if (index !== -1) {
          state.sellers[index] = action.payload;
        }
      });
  },
});

export default sellerSlice.reducer;
