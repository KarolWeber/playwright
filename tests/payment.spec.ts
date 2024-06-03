import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { cashTransferData } from '../test-data/payment.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';
import { PulpitPage } from '../pages/pulpit.page';
import { SideMenuComponent } from '../components/side-menu.component';

test.describe('Payments', () => {
  let paymentPage: PaymentPage;
  let sideMenu: SideMenuComponent;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const userLogin = loginData.userLogin;
    const userPassword = loginData.userPassword;
    sideMenu = new SideMenuComponent(page);
    paymentPage = new PaymentPage(page);

    await page.goto('/');
    await loginPage.login(userLogin, userPassword)
  });

  test('Simple payment',
    { tag: "@Payment" },
    async ({ page }) => {
      // Arrange
      const puplitPage = new PulpitPage(page);
      const paymentPage = new PaymentPage(page);
      const receiver = cashTransferData.receiver;
      const amount = cashTransferData.amount;
      const account = cashTransferData.account;
      const title = cashTransferData.title;
      const expectedMessage = `Przelew wykonany! ${amount},00PLN dla ${receiver}`;

      // Act
      await sideMenu.paymentTab.click()
      await paymentPage.cashTransfer(receiver, account, amount, title);
      await puplitPage.pulpitCloseButton.click();

      // Assert
      await test.expect(puplitPage.pulpitInfoMessage).toHaveText(`${expectedMessage}`);
    });
});