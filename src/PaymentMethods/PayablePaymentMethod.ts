import PaymentMethod from './PaymentMethod'
import { uniqid } from '../Utils/Functions'
import {ITransaction, Payload, RefundPayload} from '../Models/ITransaction'
import { TransactionResponse } from '../Models/TransactionResponse'
import { IConfig } from '../Utils/Types'

export abstract class PayablePaymentMethod extends PaymentMethod {
    protected _requiredFields: Array<keyof IConfig> = [
        'currency',
        'returnURL',
        'returnURLCancel',
        'pushURL'
    ]
    protected payTransaction(payload:ITransaction): Promise<TransactionResponse> {

        payload.invoice = payload.invoice || uniqid()
        payload.order = payload.order || uniqid()

        return this.transactionRequest(payload)
    }
    pay(payload: Payload) {
        this.action = 'Pay'
        return this.payTransaction(payload)
    }

    protected refund(payload: RefundPayload) {
        this.action = 'Refund'
        return this.payTransaction(payload)
    }
}
