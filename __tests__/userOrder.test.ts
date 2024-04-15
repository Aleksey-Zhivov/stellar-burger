import {
  fetchUserOrdersApi,
  userOrderReducer
} from '../src/services/slices/usersOrderSlice';
import { userOrders } from '../src/utils/testData';

describe('Проверка асинхронных экшенов получения пользовательских заказов', () => {
  test('Проверка fetchUserOrdersApi.pending', async () => {
    const initialState = {
      userOrders: userOrders,
      userOrdersIsLoading: false,
      error: undefined
    };

    const newState = userOrderReducer(
      initialState,
      fetchUserOrdersApi.pending('pending')
    );

    expect(newState.userOrdersIsLoading).toBeTruthy;
    expect(newState.error).toBeUndefined;
  });

  test('Проверка fetchUserOrdersApi.rejected', async () => {
    const initialState = {
      userOrders: userOrders,
      userOrdersIsLoading: false,
      error: undefined
    };

    const error: Error = {
      name: 'rejected',
      message: 'Ошибка получения списка пользовательских заказов'
    };

    const newState = userOrderReducer(
      initialState,
      fetchUserOrdersApi.rejected(error, 'rejected')
    );

    expect(newState.userOrdersIsLoading).toBeFalsy;
    expect(newState.error).toEqual(error.message);
  });

  test('Проверка fetchUserOrdersApi.fulfilled', async () => {
    const initialState = {
      userOrders: userOrders,
      userOrdersIsLoading: false,
      error: undefined
    };

    const newState = userOrderReducer(
      initialState,
      fetchUserOrdersApi.fulfilled(userOrders, '')
    );

    //Проверяем, что полученный массив заказов совпадает
    //с массивом из тестовых данных
    expect(newState.userOrders).toEqual(userOrders);
    expect(newState.error).toBeUndefined;
    expect(newState.userOrdersIsLoading).toBeFalsy;
  });
});
