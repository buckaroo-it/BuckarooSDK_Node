import PaymentMethod from '../PaymentMethod'
import { IPayForm } from '../../Models/PayForm'

export default class Tinka extends PaymentMethod {
    // public serviceVersion = 1
    constructor() {
        super({
            paymentName: 'Tinka'
        })
    }
}

const tinka = new Tinka()

const pay = (data: IPayForm) => tinka.pay(data, {})

const refund = (data: IPayForm) => tinka.pay(data, {}, 'Refund')

export { pay, refund }
