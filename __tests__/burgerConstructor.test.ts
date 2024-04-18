import {
  IBurgerConstructorSliceState,
  burgerConstructorReducer,
  addIngredients,
  ingredientsToUp,
  ingredientsToDown,
  removeIngredient,
  clearConstructor
} from '../src/services/slices/burgerCunstructorSlice';
import { bun, main, sauce } from '../src/utils/testData';

describe('Проверка синхронных экшенов конструктора', () => {
  test('Добавление ингредиента', () => {
    //Начальное состояние
    const initialState: IBurgerConstructorSliceState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      isIngredientsLoading: false,
      error: null
    };
    const newState = burgerConstructorReducer(
      initialState,
      addIngredients(main)
    );
    const addedIngredients = newState.constructorItems;
    //Так как внешние id у ингредиентов разные (замоканного объекта свой,
    //у записанного через редьюсер - свой, сравниваем по внутреннему id)
    expect(addedIngredients.ingredients[0]._id).toEqual(main._id);
  });

  test('Добавление булки', () => {
    const initialState: IBurgerConstructorSliceState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      isIngredientsLoading: false,
      error: null
    };

    const newState = burgerConstructorReducer(
      initialState,
      addIngredients(bun)
    );

    const addedIngredients = newState.constructorItems;

    expect(addedIngredients.bun?._id).toEqual(bun._id);
  });

  test('Передвигание ингредиентов вверх', () => {
    const initialState: IBurgerConstructorSliceState = {
      constructorItems: {
        bun: bun,
        ingredients: [main, sauce]
      },
      isIngredientsLoading: false,
      error: null
    };

    const stateForMoveUp = burgerConstructorReducer(
      initialState,
      ingredientsToUp(1)
    );

    const newIngredientsArrayForMoveUp = stateForMoveUp.constructorItems;

    expect(newIngredientsArrayForMoveUp.ingredients).toEqual([sauce, main]);
  });

  test('Передвигание ингредиентов вниз', () => {
    const initialState: IBurgerConstructorSliceState = {
      constructorItems: {
        bun: bun,
        ingredients: [main, sauce, main]
      },
      isIngredientsLoading: false,
      error: null
    };

    const stateForMoveDown = burgerConstructorReducer(
      initialState,
      ingredientsToDown(1)
    );

    const newIngredientsArrayForMoveDown = stateForMoveDown.constructorItems;

    expect(newIngredientsArrayForMoveDown.ingredients).toEqual([
      main,
      main,
      sauce
    ]);
  });

  test('Удаление игредиента', () => {
    const initialState: IBurgerConstructorSliceState = {
      constructorItems: {
        bun: bun,
        ingredients: [main, sauce]
      },
      isIngredientsLoading: false,
      error: null
    };

    const newState = burgerConstructorReducer(
      initialState,
      removeIngredient(sauce)
    );

    const ingredientsAfterRemoving = newState.constructorItems;

    expect(ingredientsAfterRemoving.ingredients).toEqual([main]);
  });

  test('Очистка конструктора', () => {
    const initialState: IBurgerConstructorSliceState = {
      constructorItems: {
        bun: bun,
        ingredients: [main, sauce]
      },
      isIngredientsLoading: false,
      error: null
    };

    const newState = burgerConstructorReducer(initialState, clearConstructor());

    const stateAfterClearing = newState.constructorItems;

    expect(stateAfterClearing).toEqual({
      bun: null,
      ingredients: []
    });
  });
});
