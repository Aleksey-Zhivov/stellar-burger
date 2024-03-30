import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

interface IFeedSliceState {
  userOrders: TOrder[];
  userOrdersIsLoading: boolean;
  error: string | null;
}

const initialState: IFeedSliceState = {
  userOrders: [],
  userOrdersIsLoading: false,
  error: null
};

export const fetchUserOrdersApi = createAsyncThunk(
  'userOrders/fetchUserOrdersApi',
  async () => getOrdersApi()
);

const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  selectors: {
    selectUserOrdersIsLoading: (state) => state.userOrdersIsLoading,
    selectUserOrders: (state) => state.userOrders
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserOrdersApi.pending, (state) => {
        state.userOrdersIsLoading = true;
      })
      .addCase(fetchUserOrdersApi.rejected, (state, action) => {
        state.userOrdersIsLoading = false;
        action.error.message
          ? (state.error = action.error.message)
          : (state.error = '');
        console.log(state.error);
      })
      .addCase(fetchUserOrdersApi.fulfilled, (state, action) => {
        state.userOrdersIsLoading = false;
        state.userOrders = action.payload;
      });
  }
});

export const { selectUserOrders } = userOrdersSlice.selectors;
export const userOrderReducer = userOrdersSlice.reducer;
