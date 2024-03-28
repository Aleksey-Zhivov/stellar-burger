import { createSlice } from '@reduxjs/toolkit';

import { TConstructorIngredient } from '@utils-types';

const randomId = () => self.crypto.randomUUID();

interface IBurgerConstructorSliceState {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  isIngredientsLoading: boolean;
  error: string | null;
}

const initialState: IBurgerConstructorSliceState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  isIngredientsLoading: false,
  error: null
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredients: (state, action) => {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else if (
        action.payload.type === 'main' ||
        action.payload.type === 'sauce'
      ) {
        state.constructorItems.ingredients.push({
          id: randomId(),
          ...action.payload
        });
      } else {
        state.error = 'Неизвестный ингредиент, не стоит его добавлять :)';
        alert(state.error);
      }
    },
    ingredientsToUp: (state, action) => {
      const currentIngredient =
        state.constructorItems.ingredients[action.payload];

      const neighbourIngredient =
        state.constructorItems.ingredients[action.payload - 1];

      state.constructorItems.ingredients.splice(
        action.payload - 1,
        2,
        currentIngredient,
        neighbourIngredient
      );
    },
    ingredientsToDown: (state, action) => {
      const currentIngredient =
        state.constructorItems.ingredients[action.payload];

      const neighbourIngredient =
        state.constructorItems.ingredients[action.payload + 1];

      state.constructorItems.ingredients.splice(
        action.payload,
        2,
        neighbourIngredient,
        currentIngredient
      );
    },
    removeIngredient: (state, action) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id != action.payload.id
        );
      console.log(action.payload.id);
    }
  },
  selectors: {
    selectConstructorBurger: (state) => state
  }
});

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const { selectConstructorBurger } = burgerConstructorSlice.selectors;
export const {
  addIngredients,
  ingredientsToUp,
  ingredientsToDown,
  removeIngredient
} = burgerConstructorSlice.actions;
