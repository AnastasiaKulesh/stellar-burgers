import store, { rootReducer } from './store';

test('Проверка правильной настройки и работы rootReducer', () => {
  const expected = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
  expect(expected).toEqual(store.getState());
});
