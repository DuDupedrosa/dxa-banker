import type { User } from "../factories/user";

const requiredFieldMessage = 'Esse campo é obrigatório';
const invalidFormatMessage = 'Esse formato é inválido';
const incorrectCredentialsMessage = 'Email ou senha incorretos';

export default {
  verifyRequiredFields() {
    cy.get('[data-test="SubmitButton"]').click();
    cy.get('[data-test="ErrorInputMessage"]')
      .should('have.length', 2)
      .and('have.text', requiredFieldMessage + requiredFieldMessage);
  },

  fillLoginForm(user: User) {
    cy.get('[data-test="LoginComponent:Email"]')
      .type(user.firstName)
      .should('have.value', user.firstName);
    cy.get('[data-test="SubmitButton"]').click();
    cy.get('[data-test="ErrorInputMessage"]')
      .should('have.length.at.least', 1)
      .and('contain', invalidFormatMessage);

    cy.get('[data-test="LoginComponent:Email"]')
      .clear()
      .type(user.email)
      .should('have.value', user.email);
    cy.get('[data-test="SubmitButton"]').click();
    cy.get('[data-test="ErrorInputMessage"]')
      .should('have.length', 1)
      .and('have.text', requiredFieldMessage);
    cy.get('[data-test="LoginComponent:Password"]')
      .type(user.password)
      .should('have.value', user.password);
  },

  verifyPasswordHidden() {
    cy.get('[data-test="LoginComponent:Password"]')
      .should('have.attr', 'type', 'password');
    cy.get('[data-test="LoginComponent:ShowPassword"]')
      .click();
    cy.get('[data-test="LoginComponent:Password"]')
      .should('have.attr', 'type', 'text');
    cy.get('[data-test="LoginComponent:HidePassword"]')
      .click();
    cy.get('[data-test="LoginComponent:Password"]')
      .should('have.attr', 'type', 'password');
  },

  submit(shouldComplete: boolean) {
    cy.intercept('token').as('token');

    cy.get('[data-test="SubmitButton"]').click();
    cy.wait('@token');

    if(shouldComplete) {
      cy.get('[data-test="AlertComponent:error"]')
        .should('not.exist', { timeout: 15000 })
      cy.url().should('include', '/dashboard');
    } else {
      cy.url().should('include', '/auth');
      cy.get('[data-test="AlertComponent:error"]')
        .should('be.visible')
        .and('contain', incorrectCredentialsMessage)
        .find('[data-icon="circle-xmark"]')
        .click();
      cy.get('[data-test="AlertComponent:error"]')
        .should('not.exist');
    }
  }
};