import { TIngredient } from '@utils-types';
import ingredientSlice, {
  fetchIngredients,
  initialState
} from './ingredientsSlice';

describe('Проверка редьюсера ingredients', () => {
  const ingredient1: TIngredient = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };

  const ingredient2: TIngredient = {
    _id: '643d69a5c3f7b9001cfa093f',
    name: 'Мясо бессмертных моллюсков Protostomia',
    type: 'main',
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: 'https://code.s3.yandex.net/react/code/meat-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
  };

  const actions = {
    pending: {
      type: fetchIngredients.pending.type,
      payload: null
    },
    rejected: {
      type: fetchIngredients.rejected.type,
      error: { message: 'some error' }
    },
    fulfilled: {
      type: fetchIngredients.fulfilled.type,
      payload: [ingredient1, ingredient2]
    }
  };

  test('Экшен pending', () => {
    const result = ingredientSlice(initialState, actions.pending);
    expect(result.isLoading).toBe(true);
  });

  test('Экшен rejected', () => {
    const result = ingredientSlice(initialState, actions.rejected);
    expect(result.isLoading).toBe(false);
    expect(result.error).toBe(actions.rejected.error.message);
  });

  test('Экшен fulfilled', () => {
    const result = ingredientSlice(initialState, actions.fulfilled);
    expect(result.isLoading).toBe(false);
    expect(result.ingredients).toEqual(actions.fulfilled.payload);
  });
});
