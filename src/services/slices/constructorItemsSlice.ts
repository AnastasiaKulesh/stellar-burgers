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
    },
    removeIngredient: (state, action: PayloadAction<String>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id != action.payload
        );
    },
    moveUpIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const tempItem = state.constructorItems.ingredients[index];
      state.constructorItems.ingredients[index] =
        state.constructorItems.ingredients[index - 1];
      state.constructorItems.ingredients[index - 1] = tempItem;
    },
    moveDownIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const tempItem = state.constructorItems.ingredients[index];
      state.constructorItems.ingredients[index] =
        state.constructorItems.ingredients[index + 1];
      state.constructorItems.ingredients[index + 1] = tempItem;
    }
  },
  selectors: { getConstructorItemsState: (state) => state }
});

export const { getConstructorItemsState } = constructorItemsSlice.selectors;
export const {
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient
} = constructorItemsSlice.actions;
export default constructorItemsSlice.reducer;
