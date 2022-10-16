import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getProductsDetails } from "../api";

const initialState = {
  isLoading: false,
  error: null,
  data: {},
};

export const loadProductDetails = createAsyncThunk(
  "productDetails/loadProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getProductsDetails(id);

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const productDetailsSlice = createSlice({
  name: "pokemonDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadProductDetails.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      loadProductDetails.fulfilled,
      (state, { payload: product }) => {
        state.isLoading = false;
        state.data = product;
      }
    );
    builder.addCase(
      loadProductDetails.rejected,
      (state, { payload: error }) => {
        state.isLoading = false;
        state.error = error;
      }
    );
  },
});

export default productDetailsSlice.reducer;
