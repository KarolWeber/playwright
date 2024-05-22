import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';

test.describe('Pulpit', () => {
  test.beforeEach(async ({ page }) => {
    const userLogin = loginData.userLogin;
    const userPassword = loginData.userPassword;
    await page.goto('/');
    await page.getByTestId('login-input').fill(userLogin);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
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
