import { Page } from "@playwright/test";
import { dashboard } from "../locators/pulpit";
import { phoneTopUp } from "../locators/pulpit";
import { quickPayment } from "../locators/pulpit";

export class PulpitPage {
    constructor(private page: Page) { }

    pulpitInfoMessage = this.page.locator(dashboard.message)
    pulpitMoneyValue = this.page.locator(dashboard.money_value)
    pulpitCloseButton = this.page.getByTestId(dashboard.close_button)

    quickPaymentRecivier = this.page.locator(quickPayment.reciever)
    quickPaymentAmount = this.page.locator(quickPayment.amount)
    quickPaymentTitle = this.page.locator(quickPayment.title)
    quickPaymentExecuteButton = this.page.getByRole('button', { name: 'wykonaj' })

    phoneTopUpReciever = this.page.locator(phoneTopUp.reciever)
    phoneTopUpAmount = this.page.locator(phoneTopUp.amount)
    phoneTopUpAgreementCheckbox = this.page.locator(phoneTopUp.checkbox)
    phoneTopUpExecuteButton = this.page.getByRole('button', { name: 'doładuj telefon' })

    async qiuckPayment(receiver: string, amount: string, title: string): Promise<void> {
        await this.quickPaymentRecivier.selectOption(receiver);
        await this.quickPaymentAmount.fill(amount);
        await this.quickPaymentTitle.fill(title);
        await this.quickPaymentExecuteButton.click();
        await this.pulpitCloseButton.click();
    }

    async phoneTopUp(receiver: string, amount: string): Promise<void> {
        await this.phoneTopUpReciever.selectOption(receiver);
        await this.phoneTopUpAmount.fill(amount);
        await this.phoneTopUpAgreementCheckbox.click();
        await this.phoneTopUpExecuteButton.click();
        await this.pulpitCloseButton.click();
    }

}