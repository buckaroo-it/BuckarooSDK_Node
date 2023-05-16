import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { IPay } from './Models/Pay'
import { ICapture, RefundPayload } from '../../Models/ITransaction'
import { IExtraInfo } from './Models/ExtraInfo'
import { IEmandate } from './Models/Emandate'
import { uniqid } from '../../Utils/Functions'

const enum SepaServiceCodes {
    sepaDirectDebit = 'sepadirectdebit',
    sepaDirectDebitB2B = 'sepadirectdebitb2b'
}
export default class SEPA extends PayablePaymentMethod {

    protected _paymentName = SepaServiceCodes.sepaDirectDebit
    protected _serviceVersion = 1

    constructor(type?:keyof typeof SepaServiceCodes) {
        super();

        switch (type) {
            case 'sepaDirectDebitB2B':
                this._paymentName = SepaServiceCodes.sepaDirectDebitB2B
                break;
        }
    }

    pay(payload: IPay) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
    authorize(payload: IPay) {
        this.action = 'Authorize'
        return super.transactionRequest(payload)
    }
    payRecurrent(payload: Pick<IPay, 'collectDate'> & ICapture) {
        this.action = 'PayRecurrent'
        return super.transactionRequest(payload)
    }
    extraInfo(payload: IExtraInfo) {
        this.action = 'Pay,ExtraInfo'
        return super.transactionRequest(payload)
    }
    payWithEmandate(payload: IEmandate) {
        this.action = 'PayWithEmandate'
        payload.invoice = payload.invoice || uniqid()
        return super.transactionRequest(payload)
    }
}
