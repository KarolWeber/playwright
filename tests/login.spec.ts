import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
  })

  test('Correct credentials',
    { tag: ["@Login", "@smoke"], annotation: { type: "Acceptance criteria", description: "https://www.link-to-jira-story.com/task-number" } },
    async ({ page }) => {
      // Arrange
      const userLogin = loginData.userLogin;
      const userPassword = loginData.userPassword;
      const userName = 'Jan Demobankowy';

      // Act
      loginPage.login(userLogin, userPassword)

      // Assert
      await test.expect(loginPage.userName).toHaveText(userName);
    });

  test('Validation -> Invalid username',
    { tag: "@Login" },
    async ({ page }) => {
      // Arrange
      const userLogin = 'test';
      const errorLogin = 'identyfikator ma min. 8 znaków';

      // Act
      await loginPage.loginInput.fill(userLogin);
      await loginPage.loginInput.blur();

      // Assert
      await test.expect(loginPage.loginError).toHaveText(errorLogin);
    });

  test('Validation -> No password',
    { tag: "@Login" },
    async ({ page }) => {
      // Arrange
      const userLogin = loginData.userLogin;
      const errorLogin = 'pole wymagane';

      // Act
      await loginPage.loginInput.fill(userLogin);
      await loginPage.passwordInput.click()
      await loginPage.passwordInput.blur();

      // Assert
      await test.expect(loginPage.passwordError).toHaveText(errorLogin);
    });

  test('Inorrect credentials -> Invalid password',
    { tag: "@Login" }, async ({ page }) => {
      // Arrange
      const userLogin = loginData.userLogin;
      const userPassword = 'test';
      const errorLogin = 'hasło ma min. 8 znaków';

      // Act
      await loginPage.loginInput.fill(userLogin);
      await loginPage.passwordInput.fill(userPassword);
      await loginPage.passwordInput.blur();

      // Assert
      await test.expect(loginPage.passwordError).toHaveText(errorLogin);
    });
});
