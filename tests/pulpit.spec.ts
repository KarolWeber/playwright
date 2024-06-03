import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { quickPayment } from '../test-data/pulpit.data';
import { phoneTopUp } from '../test-data/pulpit.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

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

  test('Quick payment',
    { tag: "@Pulpit" },
    async ({ page }) => {
      // Arrange
      const receiver = quickPayment.receiver;
      const amount = quickPayment.amount;
      const title = quickPayment.title;
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
      const receiver = phoneTopUp.receiver;
      const amount = phoneTopUp.amount;
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
      const receiver = phoneTopUp.receiver;
      const amount = phoneTopUp.amount;
      const initialBalance = await pulpitPage.pulpitMoneyValue.innerText();
      const expectedBalance = Number(initialBalance) - Number(amount)

      // Act
      pulpitPage.phoneTopUp(receiver, amount);

      // Assert
      await expect(pulpitPage.pulpitMoneyValue).toHaveText(`${expectedBalance}`);
    });
});
