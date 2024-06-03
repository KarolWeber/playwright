import { Page } from "@playwright/test";
import { loginLocators } from "../locators/login"
import { loginErrors } from "../locators/login"
import { userData } from "../locators/pulpit"

export class LoginPage {
    constructor(private page: Page) { }

    loginInput = this.page.getByTestId(loginLocators.login_id)
    passwordInput = this.page.getByTestId(loginLocators.login_password)
    loginButton = this.page.getByTestId(loginLocators.login_button)

    loginError = this.page.getByTestId(loginErrors.error_login)
    passwordError = this.page.getByTestId(loginErrors.error_password)

    userName = this.page.getByTestId(userData.user_name)

    async login(userLogin: string, userPassword: string): Promise<void> {
        await this.loginInput.fill(userLogin);
        await this.passwordInput.fill(userPassword);
        await this.loginButton.click();
    }
}