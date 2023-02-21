import PaymentMethod from '../PaymentMethod'
import { Pay, IPay } from '../Afterpay/Models/Pay'

class Afterpay extends PaymentMethod {
    constructor() {
        super({
            paymentName: 'afterpaydigiaccept'
        })
    }
}
const afterpaydigiaccept = new Afterpay()
const pay = (data: IPay) => afterpaydigiaccept.pay(data, new Pay(data))
const refund = (data) => afterpaydigiaccept.pay(data, {}, 'Refund')

const authorize = (data) => afterpaydigiaccept.pay(data, new Pay(data), 'Authorize')
const capture = (data) => afterpaydigiaccept.pay(data, new Pay(data), 'Capture')
const cancelAuthorize = (data) => afterpaydigiaccept.pay(data, {}, 'CancelAuthorize')
const payRemainder = (data) => afterpaydigiaccept.pay(data, new Pay(data), 'PayRemainder')
const authorizeRemainder = (data) =>
    afterpaydigiaccept.pay(data, new Pay(data), 'AuthorizeRemainder')

export { pay, authorize, capture, refund, cancelAuthorize, payRemainder, authorizeRemainder }
