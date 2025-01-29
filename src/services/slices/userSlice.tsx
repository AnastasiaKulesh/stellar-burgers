import {
  loginUserApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  getOrdersApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser, TOrder } from '@utils-types';
import { error } from 'console';
import { act } from 'react-dom/test-utils';
import { setCookie } from '../../utils/cookie';

export type TUserState = {
  user: TUser | null;
  error: string | null | undefined;
  isAuth: boolean;
  orders: TOrder[];
};

export const initialState: TUserState = {
  user: null,
  error: null,
  isAuth: false,
  orders: []
};

export const userRegister = createAsyncThunk(
  'user/register',
  async (registerData: TRegisterData) => {
    const data = await registerUserApi(registerData);
    return data;
  }
);

export const userLogin = createAsyncThunk(
  'user/login',
  async (loginData: TLoginData) => {
    const data = await loginUserApi(loginData);

    if (data.success) {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    }

    return data;
  }
);

export const userOrders = createAsyncThunk('user/orders', async () => {
  const data = await getOrdersApi();
  return data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.error = null;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.error = action.error.message;
        console.log(action.error.message);
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        console.log('userSlice.userRegister: ', action.payload);
      })
      .addCase(userLogin.pending, (state) => {
        state.isAuth = false;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.error = action.error.message;
        state.isAuth = false;
        console.log(action.error.message);
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        console.log('userSlice.userLogin: ', action.payload);
        state.user = action.payload.user;
        state.isAuth = true;
      })
      .addCase(userOrders.pending, (state) => {
        state.error = null;
      })
      .addCase(userOrders.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(userOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        console.log('users orders: ', action.payload);
      });
  },
  selectors: {
    getUserState: (state) => state
  }
});

export const { getUserState } = userSlice.selectors;
export default userSlice.reducer;
