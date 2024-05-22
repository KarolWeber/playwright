import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('Pulpit', () => {
  test.beforeEach(async ({ page }) => {
    const userLogin = loginData.userLogin;
    const userPassword = loginData.userPassword;
    
    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userLogin);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
  })
  
  test('Fast transfer', async ({ page }) => {
    // Arrange
    const revicer = '2';
    const amount = '150';
    const title = 'Transfer';
    const message = `Przelew wykonany! Chuck Demobankowy - ${amount},00PLN - ${title}`;

    // Act
    await page.locator('#widget_1_transfer_receiver').selectOption(revicer);
    await page.locator('#widget_1_transfer_amount').fill(amount);
    await page.locator('#widget_1_transfer_title').fill(title);

    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();

    // Assert
    await expect(page.locator('#show_messages')).toHaveText(message);
  });

  test('Phone top up', async ({ page }) => {
    // Arrange
    const revicer = '500 xxx xxx';
    const amount = '150';
    const message = `Doładowanie wykonane! ${amount},00PLN na numer ${revicer}`;

    // Act
    await page.locator('#widget_1_topup_receiver').selectOption(revicer);
    await page.locator('#widget_1_topup_amount').fill(amount);
    await page.locator('#uniform-widget_1_topup_agreement span').click();

    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    // Assert
    await expect(page.locator('#show_messages')).toHaveText(message);
  });

  test('Correct balance after successful phone top up -> ', async ({ page }) => {
    // Arrange
    const revicer = '500 xxx xxx';
    const amount = '150';
    const initialBalance = await page.locator('#money_value').innerText();
    const expectedBalance = Number(initialBalance) - Number(amount)

    // Act
    await page.locator('#widget_1_topup_receiver').selectOption(revicer);
    await page.locator('#widget_1_topup_amount').fill(amount);
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    // Assert
    await expect(page.locator('#money_value')).toHaveText(`${expectedBalance}`);
  });
});
