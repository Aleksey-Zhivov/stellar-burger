import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

interface IIngredientSliceState {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  error: string | null;
}

const initialState: IIngredientSliceState = {
  ingredients: [],
  isIngredientsLoading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    getIngredients: (state) => {
      state.isIngredientsLoading = false;
    },
    getIngredientsAdded: (state, action) => {
      state.ingredients.push(action.payload);
    }
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIngredientsLoading: (state) => state.isIngredientsLoading
  },
  extraReducers(builder) {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        action.error.message
          ? (state.error = action.error.message)
          : (state.error = '');
        console.log(state.error);
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { selectIngredients, selectIngredientsLoading } =
  ingredientsSlice.selectors;
export const ingredientsReducer = ingredientsSlice.reducer;
