import PaymentMethod from '../PaymentMethod'
import { IPayForm } from '../../Models/PayForm'

export default class PayPerEmail extends PaymentMethod {
    constructor() {
        super({
            paymentName: 'payperemail',
            serviceVersion: 1
        })
    }
}

const payPerEmail = new PayPerEmail()

const pay = (data: IPayForm) => payPerEmail.pay(data, {})
const payRecurrent = (data: IPayForm) => payPerEmail.pay(data, {}, 'PayRecurrent')

const paymentInvitation = (data) => payPerEmail.pay(data, {}, 'paymentInvitation')

export { pay, payRecurrent, paymentInvitation }
