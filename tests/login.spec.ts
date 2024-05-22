import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  })

  test('Correct credentials', async ({ page }) => {
    // Arrange
    const userLogin = 'testuser';
    const userPassword = 'test1234';
    const userName = 'Jan Demobankowy';

    // Act
    await page.getByTestId('login-input').fill(userLogin);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    // Assert
    await test.expect(page.getByTestId('user-name')).toHaveText(userName);
  });

  test('Validation -> Invalid username', async ({ page }) => {
    // Arrange
    const userLogin = 'test';
    const errorLogin = 'identyfikator ma min. 8 znaków';

    // Act
    await page.getByTestId('login-input').fill(userLogin);
    await page.getByTestId('login-input').blur();

    // Assert
    await test.expect(page.getByTestId('error-login-id')).toHaveText(errorLogin);
  });

  test('Validation -> No password', async ({ page }) => {
    // Arrange
    const userLogin = 'testuser';
    const errorLogin = 'pole wymagane';

    // Act
    await page.getByTestId('login-input').fill(userLogin);
    await page.getByTestId('password-input').click();
    await page.getByTestId('password-input').blur();

    // Assert
    await test.expect(page.getByTestId('error-login-password')).toHaveText(errorLogin);
  });

  test('Inorrect credentials -> Invalid password', async ({ page }) => {
    // Arrange
    const userLogin = 'testuser';
    const userPassword = 'test';
    const errorLogin = 'hasło ma min. 8 znaków';

    // Act
    await page.getByTestId('login-input').fill(userLogin);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('password-input').blur();

    // Assert
    await test.expect(page.getByTestId('error-login-password')).toHaveText(errorLogin);
  });
});
