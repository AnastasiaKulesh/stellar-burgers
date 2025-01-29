import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export type TConstructorItemsState = {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  isLoading: boolean;
  error: string | null | undefined;
};

export const initialState: TConstructorItemsState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  isLoading: false,
  error: null
};

export const constructorItemsSlice = createSlice({
  name: 'constructorItems',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else {
        const id = nanoid();
        const ingredient: TConstructorIngredient = { ...action.payload, id };
        state.constructorItems.ingredients.push(ingredient);
      }
    }
  },
  selectors: { getConstructorItemsState: (state) => state }
});

export const { getConstructorItemsState } = constructorItemsSlice.selectors;
export const { addIngredient } = constructorItemsSlice.actions;
export default constructorItemsSlice.reducer;
