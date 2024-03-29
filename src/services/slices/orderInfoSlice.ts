import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

interface IOrderByNumberSliceState {
  orders: TOrder[];
  orderIsLoading: boolean;
  error: string | null;
}

const initialState: IOrderByNumberSliceState = {
  orders: [],
  orderIsLoading: false,
  error: null
};

export const fetchOrderByNumber = createAsyncThunk(
  'getOrderByNumber/fetchOrderByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

const orderByNumberSlice = createSlice({
  name: 'orderByNumber',
  initialState,
  reducers: {},
  selectors: {
    selectOrdersIsLoading: (state) => state.orderIsLoading,
    selectOrders: (state) => state.orders
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.orderIsLoading = true;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.orderIsLoading = false;
        action.error.message
          ? (state.error = action.error.message)
          : (state.error = '');
        console.log(state.error);
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.orderIsLoading = false;
        state.orders = action.payload.orders;
      });
  }
});

export const { selectOrdersIsLoading, selectOrders } =
  orderByNumberSlice.selectors;
export const orderNuNumberReducer = orderByNumberSlice.reducer;
