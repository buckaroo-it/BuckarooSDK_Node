import { ITransactionData } from '../../../Models/TransactionData'

export interface IPay extends ITransactionData {
    buyerEmail?: string
    productName?: string
    billingAgreementDescription?: string
    pageStyle?: string
    startrecurrent?: boolean
    payPalOrderId?: string
}

export class Pay implements IPay {
    billingAgreementDescription: string
    buyerEmail: string
    pageStyle: string
    payPalOrderId: string
    productName: string
    startrecurrent: boolean

    constructor(data) {
        this.billingAgreementDescription = data.billingAgreementDescription
        this.buyerEmail = data.buyerEmail
        this.pageStyle = data.pageStyle
        this.payPalOrderId = data.payPalOrderId
        this.productName = data.productName
        this.startrecurrent = data.startrecurrent
    }
}
