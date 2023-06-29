import { IPay } from './Models/Pay'
import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { RefundPayload } from '../../Models/ITransaction'

const enum IdealServiceCodes {
    ideal = 'ideal',
    idealProcessing = 'idealprocessing'
}
export default class Ideal extends PayablePaymentMethod {
    protected _paymentName = 'ideal'
    protected _serviceVersion = 2
    constructor(type?: keyof typeof IdealServiceCodes) {
        super();

        switch (type) {
            case 'idealProcessing':
                this._paymentName = IdealServiceCodes.idealProcessing
                break;
        }
    }
    pay(payload: IPay) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
    issuers() {
        return this.specification().then((response) => {
            return response
                .getActionRequestParameters('Pay')
                ?.find((item) => item.Name === 'issuer')
                ?.ListItemDescriptions.map((item) => {
                    return { [item.Value]: item.Description }
                })
        })
    }
    instantRefund(payload: RefundPayload){
        this.action = 'InstantRefund'
        return super.refund(payload)
    }
}
