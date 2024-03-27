import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

interface IngredientListState {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  error: string | null;
}

const initialState: IngredientListState = {
  ingredients: [],
  isIngredientsLoading: true,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  `ingredients/fetchIngredients`,
  async () => {
    const result = await getIngredientsApi();
    return result;
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredientsLoading: (state) => {
      state.isIngredientsLoading = false;
    },
    ingredientsAdded: (state, action) => {
      state.ingredients.push(action.payload);
    }
  },
  selectors: {
    getIngredients: (state) => state.ingredients,
    getIngredientsLoading: (state) => state.isIngredientsLoading
  },
  extraReducers(builder) {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.isIngredientsLoading = false;
        state.error = 'Ошибка загрузки ингредиентов';
        console.log(state.error);
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { getIngredients, getIngredientsLoading } =
  ingredientsSlice.selectors;
export const ingredientsReducer = ingredientsSlice.reducer;
