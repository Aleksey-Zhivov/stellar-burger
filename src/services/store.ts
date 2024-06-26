import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsReducer } from './slices/ingredientSlice';
import { burgerConstructorReducer } from './slices/burgerCunstructorSlice';
import { orderReducer } from './slices/orderSlice';
import { feedReducer } from './slices/feedSlice';
import { orderByNumberReducer } from './slices/orderInfoSlice';
import { authReducer } from './slices/authSlice';
import { userOrderReducer } from './slices/usersOrderSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  feed: feedReducer,
  orderByNumber: orderByNumberReducer,
  userOrders: userOrderReducer,
  auth: authReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
