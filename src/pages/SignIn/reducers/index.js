import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { signIn } from "../api";
import { LOCAL_STORAGE_KEYS } from "../../../constants";

const initialState = {
  isLoading: false,
  error: null,
  data: {},
  isAuth: false,
};

export const auth = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await signIn(data);

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    repeatAuth: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(auth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(auth.fulfilled, (state, { payload }) => {
      const { accessToken, ...data } = payload;

      state.isLoading = false;
      state.data = data;
      state.isAuth = true;

      localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    });
    builder.addCase(auth.rejected, (state, { payload: error }) => {
      console.log(error);
      state.isLoading = false;
      state.error = error;
    });
  },
});

export const { repeatAuth } = authSlice.actions;

export default authSlice.reducer;