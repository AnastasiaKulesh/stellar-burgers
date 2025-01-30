import {
  loginUserApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  getOrdersApi,
  updateUserApi,
  logoutApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser, TOrder } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

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

export const updateUser = createAsyncThunk('user/update', updateUserApi);

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

export const userLogout = createAsyncThunk('user/logout', async () => {
  const data = await logoutApi();
  console.log('logout', data);

  deleteCookie('accessToken');
  localStorage.clear();
  return data;
});

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
        state.user = action.payload.user;
        state.isAuth = true;
      })
      .addCase(userLogout.pending, (state) => {
        state.isAuth = true;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.error = action.error.message;
        state.isAuth = false;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.user = null;
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
      })
      .addCase(updateUser.pending, (state) => {
        state.isAuth = true;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
      });
  },
  selectors: {
    getUserState: (state) => state
  }
});

export const { getUserState } = userSlice.selectors;
export default userSlice.reducer;
