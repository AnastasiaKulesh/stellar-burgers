import Cypress from 'cypress';

const BASE_URL = 'https://norma.nomoreparties.space/api';
const INGR_ID = '643d69a5c3f7b9001cfa093c';
const INGR_NAME = 'Краторная булка N-200i';

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

describe('Работа модальных окон', function () {
  it('Открытие модального окна ингредиента/закрытие по клику на крестик', function () {
    cy.get('[data-cy="' + INGR_ID + '"]').click();
    cy.get('[id^="modal"]')
      .children('div')
      .children('div')
      .children('button')
      .click();
  });

  it('Отображение в открытом модальном окне данных именно того ингредиента, по которому произошел клик', function () {
    cy.get('[data-cy="' + INGR_ID + '"]').click();
    cy.get('[id^="modal"]').find('h3').should('have.text', INGR_NAME);
  });
});
