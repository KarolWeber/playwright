import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
test.describe('Payments', () => {
  test.beforeEach(async ({ page }) => {
    const userLogin = loginData.userLogin;
    const userPassword = loginData.userPassword;
    await page.goto('/');
    const loginPage = new LoginPage(page)
    await loginPage.loginInput.fill(userLogin);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
    await page.getByRole('link', { name: 'płatności' }).click();
  });

  test('Simple payment', async ({ page }) => {
    // Arrange
    const receiver = 'Test reciver';
    const amount = '150';
    const account = '12 3456 7890 1234 5678 9012 3456';
    const title = 'Test title';
    const expectedMessage = `Przelew wykonany! ${amount},00PLN dla ${receiver}`;

    // Act
    await page.getByTestId('transfer_receiver').fill(`${receiver}`);
    await page.getByTestId('form_account_to').fill(`${account}`);
    await page.getByTestId('form_amount').fill(`${amount}`);
    await page.getByTestId('form_title').fill(`${title}`);
    await page.getByRole('button', { name: 'wykonaj przelew' }).click();
    await page.getByTestId('close-button').click();

    // Assert
    await test.expect(page.locator('#show_messages')).toHaveText(`${expectedMessage}`);
  });
});