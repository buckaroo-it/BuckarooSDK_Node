import PaymentMethod from './PaymentMethod'
import { uniqid } from '../Utils/Functions'
import {Payload} from '../Models/ITransaction'
import {TransactionResponse} from "../Models/TransactionResponse";

export abstract class PayablePaymentMethod extends PaymentMethod {

    public isPayable(): this is PayablePaymentMethod{
        return true
    }
    pay(payload?): Promise<TransactionResponse> {

        //SetPayPayLoad
        if (payload) this.setPayload(payload)

        //Call Transaction
        return this.transactionRequest()
    }

    setPayload(payload: Payload) {
        payload.order = payload.order || uniqid()
        payload.invoice = payload.invoice || uniqid()
        this.action = 'Pay'
        this.setRequest(payload)
    }
}
