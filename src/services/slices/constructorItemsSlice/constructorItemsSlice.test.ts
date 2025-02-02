import { TIngredient } from '@utils-types';
import constructorSlice, {
  initialState,
  addIngredient,
  removeIngredient,
  moveUpIngredient
} from './constructorItemsSlice';

describe('Проверка редьюсера слайса constructorItems', () => {
  test('Обработка экшена добавления ингредиента', () => {
    const ingredient: TIngredient = {
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

    const state = constructorSlice(initialState, addIngredient(ingredient));

    expect(state.constructorItems.ingredients[0]).toEqual({
      ...ingredient,
      id: expect.any(String)
    });
  });

  test('Обработка экшена удаления ингредиента', () => {
    const ingredient: TIngredient = {
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

    const state = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [{ ...ingredient, id: 'uniqID' }]
      }
    };

    expect(state.constructorItems.ingredients.length).toEqual(1);
    const newState = constructorSlice(state, removeIngredient('uniqID'));

    expect(newState.constructorItems.ingredients.length).toEqual(0);
  });

  test('Обработка экшена изменения порядка ингредиентов в начинке', () => {
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

    const state = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [
          { ...ingredient1, id: 'id0' },
          { ...ingredient2, id: 'id1' }
        ]
      }
    };

    expect(state.constructorItems.ingredients[0].id).toEqual('id0');
    expect(state.constructorItems.ingredients[1].id).toEqual('id1');

    const newState = constructorSlice(state, moveUpIngredient(1));

    expect(newState.constructorItems.ingredients[0].id).toEqual('id1');
    expect(newState.constructorItems.ingredients[1].id).toEqual('id0');
  });
});
