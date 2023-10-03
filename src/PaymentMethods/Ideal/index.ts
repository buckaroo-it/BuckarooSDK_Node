import { Pay, IPay } from './Models/Pay'
import PayablePaymentMethod from '../PayablePaymentMethod'
import { RequestTypes } from '../../Constants/Endpoints'
import { IRefundRequest } from '../../Models/IRequest'

export default class Ideal extends PayablePaymentMethod {
    protected _paymentName = 'Ideal'
    protected _serviceVersion = 2
    pay(data: IPay) {
        return super.pay(data, new Pay(data))
    }
    payRemainder(payload: IPay) {
        return super.payRemainder(payload, new Pay(payload))
    }
    issuers() {
        return this.specification(RequestTypes.Transaction)
            .request()
            .then((response) => {
                return response
                    .getActionRequestParameters('Pay')
                    ?.find((item) => item.name === 'issuer')
                    ?.listItemDescriptions?.map((item) => {
                        return { [item.value]: item.description }
                    })
            })
    }
    instantRefund(data: IRefundRequest) {
        return super.refund(data)
    }
}
