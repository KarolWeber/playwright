import { Page } from "@playwright/test";

export class LoginPage {
    constructor(private page: Page) { }

    loginInput = this.page.getByTestId('login-input')
    passwordInput = this.page.getByTestId('password-input')
    loginButton = this.page.getByTestId('login-button')

    loginError = this.page.getByTestId('error-login-id')
    passwordError = this.page.getByTestId('error-login-password')

    userName = this.page.getByTestId('user-name')

    async login(userLogin: string, userPassword: string): Promise<void> {
        await this.loginInput.fill(userLogin);
        await this.passwordInput.fill(userPassword);
        await this.loginButton.click();
    }
}