import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlice } from './slices/ingredientsSlice/ingredientsSlice';
import { constructorItemsSlice } from './slices/constructorItemsSlice/constructorItemsSlice';
import { feedDataSlice } from './slices/feedSlice/feedSlice';
import { userSlice } from './slices/userSlice/userSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  constructorItems: constructorItemsSlice.reducer,
  feed: feedDataSlice.reducer,
  user: userSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
