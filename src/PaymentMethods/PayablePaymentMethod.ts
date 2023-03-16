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

        return super.transactionRequest().then((response) => {
            return new TransactionResponse(response)
        })
    }
    pay(payload?: Payload) {
        this.action = 'Pay'

        return this.transactionRequest(payload)
    }

    protected refund(payload?: RefundPayload) {
        this.action = 'Refund'

        return this.transactionRequest(payload)
    }
    setPayload(payload) {
        payload.invoice = payload.invoice || uniqid()
        payload.order = payload.order || uniqid()
        this.setRequest(payload)
    }
}
