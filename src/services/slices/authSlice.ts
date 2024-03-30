import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TRegisterData,
  TLoginData
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const fetchRegisterUser = createAsyncThunk(
  'register/fetchRegisterUser',
  async (data: TRegisterData) => registerUserApi(data)
);

export const fetchLoginUser = createAsyncThunk(
  'login/fetchLoginUser',
  async (data: TLoginData) => loginUserApi(data)
);

export const fetchGetUser = createAsyncThunk('user/fetchGetUser', async () =>
  getUserApi()
);

export const fetchUpdateUser = createAsyncThunk(
  'user/fetchUpdateUser',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const fetchLogout = createAsyncThunk('logout/fetchLogout', async () =>
  logoutApi()
);

interface TAuthState {
  isAuthenticated: boolean;
  data: TUser;
  error: string;
  loginUserRequest: boolean;
}

const initialState: TAuthState = {
  isAuthenticated: false,
  data: {
    name: '',
    email: ''
  },
  error: '',
  loginUserRequest: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearErrorMessage: (state) => {
      state.error = '';
    }
  },
  selectors: {
    selectUserData: (state) => state.data,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectError: (state) => state.error
  },
  extraReducers(builder) {
    builder
      //Регистрация
      .addCase(fetchRegisterUser.pending, (state) => {
        state.isAuthenticated = false;
        state.loginUserRequest = true;
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        action.error.message
          ? (state.error = action.error.message)
          : (state.error = '');
        state.loginUserRequest = false;
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.data.email = action.payload.user.email;
        state.data.name = action.payload.user.name;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.loginUserRequest = false;
      })
      //Авторизация
      .addCase(fetchLoginUser.pending, (state) => {
        state.isAuthenticated = false;
        state.loginUserRequest = true;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        action.error.message
          ? (state.error = action.error.message)
          : (state.error = '');
        state.loginUserRequest = false;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.data.email = action.payload.user.name;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.loginUserRequest = false;
      })
      //Получение данных юзера
      .addCase(fetchGetUser.pending, (state) => {
        state.loginUserRequest = true;
      })
      .addCase(fetchGetUser.rejected, (state, action) => {
        state.loginUserRequest = true;
        action.error.message
          ? (state.error = action.error.message)
          : (state.error = '');
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.error = '';
        state.isAuthenticated = true;
        state.loginUserRequest = false;
      })
      //Обвнолвение данные пользователя
      .addCase(fetchUpdateUser.pending, (state) => {
        state.loginUserRequest = true;
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.loginUserRequest = true;
        action.error.message
          ? (state.error = action.error.message)
          : (state.error = '');
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.isAuthenticated = true;
        state.loginUserRequest = false;
      })
      //Выход
      .addCase(fetchLogout.pending, (state) => {
        state.loginUserRequest = true;
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        action.error.message
          ? (state.error = action.error.message)
          : (state.error = '');
        state.loginUserRequest = true;
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.loginUserRequest = false;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      });
  }
});

export const { clearErrorMessage } = authSlice.actions;
export const { selectUserData, selectError, selectIsAuthenticated } =
  authSlice.selectors;
export const authReducer = authSlice.reducer;
