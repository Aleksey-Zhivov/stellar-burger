import { forgotPasswordApi, resetPasswordApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchForgotPassword = createAsyncThunk(
  'password-reset/fetchForgotPassword',
  async (data: { email: string }) => forgotPasswordApi(data)
);

export const fetchResetPassword = createAsyncThunk(
  'reset/fetchResetPassword',
  async (data: { password: string; token: string }) => resetPasswordApi(data)
);

interface TAuthSliceState {
  isForgot: boolean;
  error: string | null;
}

const initialState: TAuthSliceState = {
  isForgot: false,
  error: null
};

const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {},
  selectors: {
    selectIsLogin: (state) => state.isForgot
  },
  extraReducers(builder) {
    builder
      .addCase(fetchForgotPassword.pending, (state) => {
        state.isForgot = false;
      })
      .addCase(fetchForgotPassword.rejected, (state, action) => {
        state.isForgot = false;
        action.error.message
          ? (state.error = action.error.message)
          : (state.error = '');
        console.log(state.error);
      })
      .addCase(fetchForgotPassword.fulfilled, (state, action) => {
        state.isForgot = true;
      })
      .addCase(fetchResetPassword.pending, (state) => {
        state.isForgot = false;
      })
      .addCase(fetchResetPassword.rejected, (state, action) => {
        state.isForgot = false;
        action.error.message
          ? (state.error = action.error.message)
          : (state.error = '');
        console.log(state.error);
      })
      .addCase(fetchResetPassword.fulfilled, (state, action) => {
        state.isForgot = true;
      });
  }
});

export const { selectIsLogin } = passwordSlice.selectors;
export const passwordReducer = passwordSlice.reducer;
