import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

interface IOrderSliceState {
  order: TOrder | null;
  orderIsLoading: boolean;
  error: string | null;
}

const initialState: IOrderSliceState = {
  order: null,
  orderIsLoading: false,
  error: null
};

export const fetchOrderBurgerApi = createAsyncThunk(
  'postOrder/fetchOrderBurgerApi',
  async (data: string[]) => orderBurgerApi(data)
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    selectOrderIsLoading: (state) => state.orderIsLoading,
    selectOrder: (state) => state.order
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOrderBurgerApi.pending, (state) => {
        state.orderIsLoading = true;
      })
      .addCase(fetchOrderBurgerApi.rejected, (state) => {
        state.orderIsLoading = false;
        state.error = 'Ошибка загрузки ингредиентов';
        console.log(state.error);
      })
      .addCase(fetchOrderBurgerApi.fulfilled, (state, action) => {
        state.orderIsLoading = false;
        state.order = action.payload.order;
      });
  }
});

export const { selectOrderIsLoading, selectOrder } = orderSlice.selectors;
export const orderReducer = orderSlice.reducer;
