import PaymentMethod from '../PaymentMethod'
import { Pay, IPay } from './Models/Pay'
import { Refund } from './Models/Refund'
import { ITransactionData } from '../../Models/TransactionData'

class Afterpay extends PaymentMethod {
    constructor() {
        super({
            paymentName: 'afterpay',
            serviceVersion: 1
        })
    }
}

const afterpay = new Afterpay()

interface IAuthorize extends ITransactionData {
    originalTransactionKey: string
    invoice: string
}

const pay = (data: IPay) => afterpay.pay(data, new Pay(data))

const refund = (data) => afterpay.pay(data, {}, 'Refund')

const authorize = (data: IPay) => afterpay.pay(data, new Pay(data), 'Authorize')
const capture = (data) => afterpay.pay(data, {}, 'Capture')
const cancelAuthorize = (data: IAuthorize) => afterpay.pay(data, {}, 'CancelAuthorize')
const payRemainder = (data) => afterpay.pay(data, {}, 'PayRemainder')
const authorizeRemainder = (data) => afterpay.pay(data, {}, 'AuthorizeRemainder')

export { pay, authorize, capture, refund, authorizeRemainder }
