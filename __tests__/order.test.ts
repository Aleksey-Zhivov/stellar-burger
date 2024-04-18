import {
  clearOrder,
  fetchOrderBurgerApi,
  orderReducer
} from '../src/services/slices/orderSlice';
import { TNewOrderResponse } from '../src/utils/burger-api';
import { order } from '../src/utils/testData';

describe('Проверка синхронных экшенов отправки заказа', () => {
  test('Очистка заказа', () => {
    const initialState = {
      order: order,
      orderIsLoading: false,
      error: undefined
    };
    const newState = orderReducer(initialState, clearOrder());

    expect(newState).toEqual({
      order: null,
      orderIsLoading: false,
      error: undefined
    });
  });
});

describe('Проверка асинхронных экшенов отправки заказа', () => {
  test('Проверка fetchOrderBurgerApi.pending', async () => {
    const initialState = {
      order: order,
      orderIsLoading: false,
      error: undefined
    };

    const newState = orderReducer(
      initialState,
      fetchOrderBurgerApi.pending('pending', [])
    );

    expect(newState.orderIsLoading).toBeTruthy;
    expect(newState.error).toBeUndefined;
  });

  test('Проверка fetchOrderBurgerApi.rejected', async () => {
    const initialState = {
      order: order,
      orderIsLoading: false,
      error: undefined
    };

    const error: Error = {
      name: 'rejected',
      message: 'Ошибка отправки заказа'
    };

    const newState = orderReducer(
      initialState,
      fetchOrderBurgerApi.rejected(error, 'rejected', [])
    );

    expect(newState.orderIsLoading).toBeFalsy;
    expect(newState.error).toEqual(error.message);
  });

  test('Проверка fetchOrderBurgerApi.fulfilled', async () => {
    const initialState = {
      order: order,
      orderIsLoading: false,
      error: undefined
    };

    const newOrder: TNewOrderResponse = {
      order: order,
      name: 'some order',
      success: true
    };

    const newState = orderReducer(
      initialState,
      fetchOrderBurgerApi.fulfilled(newOrder, 'fulfilled', [])
    );

    expect(newState.order).toEqual(order);
    expect(newState.error).toBeUndefined;
    expect(newState.orderIsLoading).toBeFalsy;
  });
});
