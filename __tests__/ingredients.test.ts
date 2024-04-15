import {
  fetchIngredients,
  getIngredients,
  getIngredientsAdded,
  ingredientsReducer
} from '../src/services/slices/ingredientSlice';
import { ingredients, main } from '../src/utils/testData';

describe('Проверка синхронных экшенов загрузки ингредиентов', () => {
  test('Получение ингредиентов', () => {
    const initialState = {
      ingredients: ingredients,
      isIngredientsLoading: false,
      error: undefined
    };
    const newState = ingredientsReducer(initialState, getIngredients());

    expect(newState).toEqual({
      ingredients: ingredients,
      isIngredientsLoading: false,
      error: undefined
    });
  });

  test('Получение добавленных ингредиентов', () => {
    const initialState = {
      ingredients: [],
      isIngredientsLoading: false,
      error: undefined
    };
    const newState = ingredientsReducer(
      initialState,
      getIngredientsAdded(main)
    );

    expect(newState).toEqual({
      ingredients: [main],
      isIngredientsLoading: false,
      error: undefined
    });
  });
});

describe('Проверка асинхронных экшенов загрузки ингредиентов', () => {
  test('Проверка fetchIngredients.pending', async () => {
    const initialState = {
      ingredients: ingredients,
      isIngredientsLoading: false,
      error: undefined
    };
    const newState = ingredientsReducer(
      initialState,
      fetchIngredients.pending('pending')
    );
    expect(newState.isIngredientsLoading).toBeTruthy;
    expect(newState.error).toBeUndefined;
  });
  test('Проверка fetchIngredients.rejected', async () => {
    const initialState = {
      ingredients: ingredients,
      isIngredientsLoading: false,
      error: undefined
    };
    const error: Error = {
      name: 'rejected',
      message: 'Ошибка получения игредиента'
    };
    const newState = ingredientsReducer(
      initialState,
      fetchIngredients.rejected(error, 'rejected')
    );
    expect(newState.isIngredientsLoading).toBeFalsy;
    expect(newState.error).toEqual(error.message);
  });
  test('Проверка fetchIngredients.fulfilled', async () => {
    const initialState = {
      ingredients: ingredients,
      isIngredientsLoading: false,
      error: undefined
    };

    const newState = ingredientsReducer(
      initialState,
      fetchIngredients.fulfilled(ingredients, 'fulfilled')
    );
    expect(newState.ingredients).toEqual(ingredients);
    expect(newState.error).toBeUndefined;
    expect(newState.isIngredientsLoading).toBeFalsy;
  });
});
