import {
  fetchOrderByNumber,
  orderByNumberReducer
} from '../src/services/slices/orderInfoSlice';
import { TOrderResponse } from '../src/utils/burger-api';
import { userOrders } from '../src/utils/testData';

describe('Проверка асинхронных экшенов получения информации о заказе', () => {
  test('Проверка fetchOrderByNumber.pending', async () => {
    const initialState = {
      orders: userOrders,
      orderIsLoading: false,
      error: undefined
    };

    const newState = orderByNumberReducer(
      initialState,
      fetchOrderByNumber.pending('pending', 2)
    );

    expect(newState.orderIsLoading).toBeTruthy;
    expect(newState.error).toBeUndefined;
  });

  test('Проверка fetchOrderByNumber.rejected', async () => {
    const initialState = {
      orders: userOrders,
      orderIsLoading: false,
      error: undefined
    };

    const error: Error = {
      name: 'rejected',
      message: 'Ошибка получения списка заказов'
    };

    const newState = orderByNumberReducer(
      initialState,
      fetchOrderByNumber.rejected(error, 'rejected', 2)
    );

    expect(newState.orderIsLoading).toBeFalsy;
    expect(newState.error).toEqual(error.message);
  });

  test('Проверка fetchOrderByNumber.fulfilled', async () => {
    const initialState = {
      orders: userOrders,
      orderIsLoading: false,
      error: undefined
    };

    const currentOrder = initialState.orders[0];

    const orders: TOrderResponse = {
      orders: [currentOrder],
      success: true
    };

    const newState = orderByNumberReducer(
      initialState,
      fetchOrderByNumber.fulfilled(orders, '', 0)
    );

    expect(newState.orders).toEqual([currentOrder]);
    expect(newState.error).toBeUndefined;
    expect(newState.orderIsLoading).toBeFalsy;
  });
});
