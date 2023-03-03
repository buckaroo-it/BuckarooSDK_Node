import PaymentMethod from './PaymentMethod'
import { uniqid } from '../Utils/Functions'
import { Payload } from '../Models/Payload'

export abstract class PayablePaymentMethod extends PaymentMethod {
    protected pay(payload?) {
        //SetPayPayLoad
        if (payload) this.setPayload(payload)

        //Call Transaction
        return this.transactionRequest()
    }

    setPayload(payload: Payload) {
        payload['order'] = payload['order'] || uniqid()
        this.action = 'Pay'
        this.setRequest(payload)
    }
}
