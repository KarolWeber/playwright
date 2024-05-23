import { Page } from "@playwright/test";

export class PaymentPage {
    constructor(private page: Page) { }

    transferRecivierInput = this.page.getByTestId('transfer_receiver')
    transferRecivierAccount = this.page.getByTestId('form_account_to')
    transferRecivierAmount = this.page.getByTestId('form_amount')
    transferRecivierTitle = this.page.getByTestId('form_title')
    transferRecivierExecuteButton = this.page.getByRole('button', { name: 'wykonaj przelew' })

    async cashTransfer(receiver: string, account: string, amount: string, title: string): Promise<void> {
        await this.transferRecivierInput.fill(`${receiver}`);
        await this.transferRecivierAccount.fill(`${account}`);
        await this.transferRecivierAmount.fill(`${amount}`);
        await this.transferRecivierTitle.fill(`${title}`);
        await this.transferRecivierExecuteButton.click();
    }
}