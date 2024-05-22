import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test('Correct credentials', async ({ page }) => {
    // Arrange 
    const url = 'https://demo-bank.vercel.app/'
    const userLogin = 'testuser'
    const userPassword = 'test1234'
    const userName = "Jan Demobankowy"

    // Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userLogin);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    // Assert
    await test.expect(page.getByTestId('user-name')).toHaveText(userName)
  });
  
  test('Inorrect credentials -> Invalid username', async ({ page }) => {
    // Arrange 
    const url = 'https://demo-bank.vercel.app/'
    const userLogin = 'test'
    const errorLogin = "identyfikator ma min. 8 znaków"

    // Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userLogin);
    await page.getByTestId('login-input').blur()

    // Assert
    await test.expect(page.getByTestId('error-login-id')).toHaveText(errorLogin)
  });

  test('Inorrect credentials -> No password', async ({ page }) => {
    // Arrange 
    const url = 'https://demo-bank.vercel.app/'
    const userLogin = 'testuser'
    const errorLogin = "pole wymagane"

    // Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userLogin);
    await page.getByTestId('password-input').click();
    await page.getByTestId('password-input').blur();

    // Assert
    await test.expect(page.getByTestId('error-login-password')).toHaveText(errorLogin)
  });

  test('Inorrect credentials -> Invalid password', async ({ page }) => {
    // Arrange 
    const url = 'https://demo-bank.vercel.app/'
    const userLogin = 'testuser'
    const userPassword = 'test'
    const errorLogin = "hasło ma min. 8 znaków"

    // Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userLogin);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('password-input').blur();

    // Assert
    await test.expect(page.getByTestId('error-login-password')).toHaveText(errorLogin)
  });
});