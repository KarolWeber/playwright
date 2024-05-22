import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit', () => {
  test.beforeEach(async ({ page }) => {
    const userLogin = loginData.userLogin;
    const userPassword = loginData.userPassword;
    const loginPage = new LoginPage(page);
    
    await page.goto('/');
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
    const puplitPage = new PulpitPage(page);

    // Act
    await puplitPage.quickPaymentRecivier.selectOption(revicer);
    await puplitPage.quickPaymentAmount.fill(amount);
    await puplitPage.quickPaymentTitle.fill(title);

    await puplitPage.quickPaymentExecuteButton.click();
    await puplitPage.pulpitCloseButton.click();

    // Assert
    await expect(puplitPage.pulpitInfoMessage).toHaveText(message);
  });

  test('Phone top up', async ({ page }) => {
    // Arrange
    const revicer = '500 xxx xxx';
    const amount = '150';
    const message = `Doładowanie wykonane! ${amount},00PLN na numer ${revicer}`;
    const pulpitPage = new PulpitPage(page);

    // Act
    await pulpitPage.phoneTopUpReciever.selectOption(revicer);
    await pulpitPage.phoneTopUpAmount.fill(amount);
    await pulpitPage.phoneTopUpAgreementCheckbox.click();

    await pulpitPage.phoneTopUpExecuteButton.click();
    await pulpitPage.pulpitCloseButton.click();

    // Assert
    await expect(pulpitPage.pulpitInfoMessage).toHaveText(message);
  });

  test('Correct balance after successful phone top up -> ', async ({ page }) => {
    // Arrange
    const pulpitPage = new PulpitPage(page);
    const revicer = '500 xxx xxx';
    const amount = '150';
    const initialBalance = await pulpitPage.pulpitMoneyValue.innerText();
    const expectedBalance = Number(initialBalance) - Number(amount)

    // Act
    await pulpitPage.phoneTopUpReciever.selectOption(revicer);
    await pulpitPage.phoneTopUpAmount.fill(amount);
    await pulpitPage.phoneTopUpAgreementCheckbox.click();

    await pulpitPage.phoneTopUpExecuteButton.click();
    await pulpitPage.pulpitCloseButton.click();

    // Assert
    await expect(pulpitPage.pulpitMoneyValue).toHaveText(`${expectedBalance}`);
  });
});
