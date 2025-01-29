import { getFeedsApi } from './../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';

export type TOrdersDataState = TOrdersData & {
  isLoading: boolean;
  error: string | null | undefined;
};

export const initialState: TOrdersDataState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

export const fetchFeed = createAsyncThunk('feed/fetchFeed', async () => {
  const data = await getFeedsApi();
  return data;
});

export const feedDataSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
        state.error = null;
      });
  },
  selectors: {
    getFeedDataState: (state) => state
  }
});

export const { getFeedDataState } = feedDataSlice.selectors;
export default feedDataSlice.reducer;
