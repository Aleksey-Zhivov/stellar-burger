import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getIngredientsApi } from '../../utils/burger-api';
import { TConstructorIngredient, TIngredient } from '../../utils/types';
import { getCookie } from '../../utils/cookie';

interface IIngredientSliceState {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  error: string | undefined;
}

const initialState: IIngredientSliceState = {
  ingredients: [],
  isIngredientsLoading: false,
  error: undefined
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
    getIngredientsAdded: (
      state,
      { payload }: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients.push(payload);
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
        state.error = action.error.message;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { selectIngredients, selectIngredientsLoading } =
  ingredientsSlice.selectors;
export const { getIngredients, getIngredientsAdded } = ingredientsSlice.actions;
export const ingredientsReducer = ingredientsSlice.reducer;
