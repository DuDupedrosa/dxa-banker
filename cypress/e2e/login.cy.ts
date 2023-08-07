import userFactory, { User } from "./factories/user";
import loginPage from "./pages/login";

describe('Login de usuário', () => {
  beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
    cy.visit('/auth')
  });

  it('Tentativa de Login', () => {
    const user = userFactory.signInUser();
    const wrongUser = {...user};
    wrongUser.password += 'aaa';

    loginPage.verifyRequiredFields();
    loginPage.fillLoginForm(wrongUser);
    loginPage.verifyPasswordHidden();
    loginPage.submit(false);

    loginPage.fillLoginForm(user);
    loginPage.submit(true);
  });
});