import PaymentMethod from './PaymentMethod'
import { uniqid } from '../Utils/Functions'
import { Payload, RefundPayload } from '../Models/ITransaction'
import { TransactionResponse } from '../Models/TransactionResponse'
import { IConfig } from '../Utils/Types'

export abstract class PayablePaymentMethod extends PaymentMethod {
    protected requiredFields: Array<keyof IConfig> = [
        'currency',
        'returnURL',
        'returnURLCancel',
        'pushURL'
    ]
    protected transactionRequest(payload?): Promise<TransactionResponse> {
        if (payload) this.setPayload(payload)

        return super.transactionRequest()
    }
    protected pay(payload?: Payload) {
        this.action = 'Pay'
        //Call Transaction
        return this.transactionRequest(payload)
    }

    protected refund(payload?: RefundPayload) {
        this.action = 'Refund'

        //Call Transaction
        return this.transactionRequest(payload)
    }
    setPayload(payload) {
        this.request.setDataKey('order', payload.order || uniqid())
        this.request.setDataKey('invoice', payload.invoice || uniqid())
        this.setRequest(payload)
    }
}
