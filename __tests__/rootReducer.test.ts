import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ingredientsReducer } from '../src/services/slices/ingredientSlice';
import { burgerConstructorReducer } from '../src/services/slices/burgerCunstructorSlice';
import { orderReducer } from '../src/services/slices/orderSlice';
import { feedReducer } from '../src/services/slices/feedSlice';
import { orderNuNumberReducer } from '../src/services/slices/orderInfoSlice';
import { userOrderReducer } from '../src/services/slices/usersOrderSlice';
import { authReducer } from '../src/services/slices/authSlice';

it('rootReducer Testing', () => {
  const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer,
    feed: feedReducer,
    orderByNumber: orderNuNumberReducer,
    userOrders: userOrderReducer,
    auth: authReducer
  });

  const store = configureStore({
    reducer: rootReducer
  });

  expect(store.getState()).toEqual(
    rootReducer(undefined, { type: 'UNKNOWN_ACTION' })
  );
});
