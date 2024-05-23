import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';
import { PassThrough } from 'stream';

test.describe('Pulpit', () => {
  let pulpitPage: PulpitPage;

  test.beforeEach(async ({ page }) => {
    const userLogin = loginData.userLogin;
    const userPassword = loginData.userPassword;
    const loginPage = new LoginPage(page);
    pulpitPage = new PulpitPage(page);

    await page.goto('/');
    await loginPage.login(userLogin, userPassword);
  })

  test('Fast transfer',
    { tag: "@Pulpit" },
    async ({ page }) => {
      // Arrange
      const receiver = '2';
      const amount = '150';
      const title = 'Transfer';
      const message = `Przelew wykonany! Chuck Demobankowy - ${amount},00PLN - ${title}`;

      // Act

      await pulpitPage.qiuckPayment(receiver, amount, title);
      // Assert
      await expect(pulpitPage.pulpitInfoMessage).toHaveText(message);
    });

  test('Phone top up',
    { tag: "@Pulpit" },
    async ({ page }) => {
      // Arrange
      const receiver = '500 xxx xxx';
      const amount = '150';
      const message = `Doładowanie wykonane! ${amount},00PLN na numer ${receiver}`;
      const pulpitPage = new PulpitPage(page);

      // Act
      pulpitPage.phoneTopUp(receiver, amount);

      // Assert
      await expect(pulpitPage.pulpitInfoMessage).toHaveText(message);
    });

  test('Correct balance after successful phone top up',
    { tag: "@Pulpit" },
    async ({ page }) => {
      // Arrange
      const pulpitPage = new PulpitPage(page);
      const receiver = '500 xxx xxx';
      const amount = '150';
      const initialBalance = await pulpitPage.pulpitMoneyValue.innerText();
      const expectedBalance = Number(initialBalance) - Number(amount)

      // Act
      pulpitPage.phoneTopUp(receiver, amount);

      // Assert
      await expect(pulpitPage.pulpitMoneyValue).toHaveText(`${expectedBalance}`);
    });
});
