import { feedReducer, fetchFeedsApi } from '../src/services/slices/feedSlice';
import { TFeedsResponse } from '../src/utils/burger-api';
import { userOrders, order } from '../src/utils/testData';

describe('Проверка асинхронных экшенов получения общего списка заказов', () => {
  test('Проверка fetchFeedsApi.pending', async () => {
    const initialState = {
      feeds: userOrders,
      feedIsLoading: false,
      total: 3,
      totalToday: 2,
      error: undefined
    };

    const newState = feedReducer(
      initialState,
      fetchFeedsApi.pending('pending')
    );

    expect(newState.feedIsLoading).toBeTruthy;
    expect(newState.error).toBeUndefined;
  });

  test('Проверка fetchFeedsApi.rejected', async () => {
    const initialState = {
      feeds: userOrders,
      feedIsLoading: false,
      total: 3,
      totalToday: 2,
      error: undefined
    };

    const error: Error = {
      name: 'rejected',
      message: 'Ошибка получения списка заказов'
    };

    const newState = feedReducer(
      initialState,
      fetchFeedsApi.rejected(error, 'rejected')
    );

    expect(newState.feedIsLoading).toBeFalsy;
    expect(newState.error).toEqual(error.message);
  });

  test('Проверка fetchFeedsApi.fulfilled', async () => {
    const initialState = {
      feeds: userOrders,
      feedIsLoading: false,
      total: 3,
      totalToday: 2,
      error: undefined
    };

    const feeds: TFeedsResponse = {
      orders: userOrders,
      total: initialState.total,
      totalToday: initialState.totalToday,
      success: true
    };

    const newState = feedReducer(
      initialState,
      fetchFeedsApi.fulfilled(feeds, '')
    );

    //Проверяем, что полученный массив заказов совпадает
    //с массивом из тестовых данных
    expect(newState.feeds).toEqual(userOrders);
    expect(newState.error).toBeUndefined;
    expect(newState.feedIsLoading).toBeFalsy;
  });
});
