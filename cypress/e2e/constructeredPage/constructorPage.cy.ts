import Cypress from 'cypress';

const BASE_URL = 'https://norma.nomoreparties.space/api';
const INGR_ID = '643d69a5c3f7b9001cfa093c';

beforeEach(() => {
  cy.intercept('GET', `${BASE_URL}/auth/user`, {
    fixture: 'user.json'
  });

  cy.intercept('GET', `${BASE_URL}/ingredients`, {
    fixture: 'ingredients.json'
  });

  cy.visit('http://localhost:4000');
});

describe('Проверяем доступность приложения', function () {
  it('Сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit('http://localhost:4000');
  });
});

describe('Добавление ингредиента из списка в конструктор', function () {
  it('Должен добавиться ингредиент bun', function () {
    cy.get('[data-cy="' + INGR_ID + '"]')
      .children('button')
      .click();
    cy.get('[data-cy="total-price"]').children('p').should('have.text', '2510');
  });
});
