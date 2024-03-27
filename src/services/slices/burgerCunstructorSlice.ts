import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { TConstructorIngredient } from '@utils-types';

interface IBurgerConstructorSliceState {
  constructorItems: {
    bun: TConstructorIngredient | undefined;
    ingredients: TConstructorIngredient[];
  };
  isIngredientsLoading: boolean;
  error: string | null;
}

const initialState: IBurgerConstructorSliceState = {
  constructorItems: {
    bun: undefined,
    ingredients: []
  },
  isIngredientsLoading: false,
  error: null
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else if (action.payload.type === 'main') {
        state.constructorItems.ingredients.push(action.payload);
      } else if (action.payload.type === 'sauce') {
        state.constructorItems.ingredients.push(action.payload);
      }
    },
    upIngredient: (state, action) => {
      const { id } = action.payload;
      console.log(id);
    },
    removeIngredient: (state, action) => {
      const { id } = action.payload;
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter((ingredient) => {
          ingredient._id != id;
        });
    }
  },
  selectors: {
    selectConstructorBurger: (state) => state
  }
});

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const { selectConstructorBurger } = burgerConstructorSlice.selectors;
export const { addIngredient, upIngredient, removeIngredient } =
  burgerConstructorSlice.actions;
