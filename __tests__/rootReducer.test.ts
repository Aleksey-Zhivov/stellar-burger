import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ingredientsReducer } from '../src/services/slices/ingredientSlice';
import { burgerConstructorReducer } from '../src/services/slices/burgerCunstructorSlice';
import { orderReducer } from '../src/services/slices/orderSlice';
import { feedReducer } from '../src/services/slices/feedSlice';
import { orderByNumberReducer } from '../src/services/slices/orderInfoSlice';
import { userOrderReducer } from '../src/services/slices/usersOrderSlice';
import { authReducer } from '../src/services/slices/authSlice';

describe('Проверка rootReducer', () => {
  test('Проверка на UNKNOWN_ACTION', () => {
    const rootReducer = combineReducers({
      ingredients: ingredientsReducer,
      burgerConstructor: burgerConstructorReducer,
      order: orderReducer,
      feed: feedReducer,
      orderByNumber: orderByNumberReducer,
      userOrders: userOrderReducer,
      auth: authReducer
    });

    const store = configureStore({
      reducer: rootReducer
    });

    expect(rootReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      store.getState()
    );
  });
});
