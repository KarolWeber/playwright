import { Page } from "@playwright/test";
import { paymentLocators } from "../locators/payment"

export class PaymentPage {
    constructor(private page: Page) { }

    transferRecivierInput = this.page.getByTestId(paymentLocators.receiver)
    transferRecivierAccount = this.page.getByTestId(paymentLocators.iban)
    transferRecivierAmount = this.page.getByTestId(paymentLocators.amount)
    transferRecivierTitle = this.page.getByTestId(paymentLocators.title)
    transferRecivierExecuteButton = this.page.getByRole('button', { name: 'wykonaj przelew' })

    async cashTransfer(receiver: string, account: string, amount: string, title: string): Promise<void> {
        await this.transferRecivierInput.fill(`${receiver}`);
        await this.transferRecivierAccount.fill(`${account}`);
        await this.transferRecivierAmount.fill(`${amount}`);
        await this.transferRecivierTitle.fill(`${title}`);
        await this.transferRecivierExecuteButton.click();
    }
}