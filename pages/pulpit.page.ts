import { Page } from "@playwright/test";

export class PulpitPage {
    constructor(private page: Page) { }
    
    pulpitInfoMessage = this.page.locator('#show_messages')
    pulpitMoneyValue = this.page.locator('#money_value')
    pulpitCloseButton = this.page.getByTestId('close-button')

    quickPaymentRecivier = this.page.locator('#widget_1_transfer_receiver')
    quickPaymentAmount = this.page.locator('#widget_1_transfer_amount')
    quickPaymentTitle = this.page.locator('#widget_1_transfer_title')
    quickPaymentExecuteButton = this.page.getByRole('button', { name: 'wykonaj' })

    phoneTopUpReciever = this.page.locator('#widget_1_topup_receiver')
    phoneTopUpAmount = this.page.locator('#widget_1_topup_amount')
    phoneTopUpAgreementCheckbox = this.page.locator('#uniform-widget_1_topup_agreement span')
    phoneTopUpExecuteButton = this.page.getByRole('button', { name: 'doładuj telefon' })
}