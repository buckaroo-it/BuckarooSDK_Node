import PaymentMethod from '../PaymentMethod'
import { Pay, IPay } from './Models/Pay'
import { ExtraInfo, IExtraInfo } from './Models/ExtraInfo'

class Paypal extends PaymentMethod {
    constructor() {
        super({
            paymentName: 'paypal'
        })
    }
}

const paypal = new Paypal()

const pay = (data: IPay) => paypal.pay(data, new Pay(data))
const payRecurrent = (data: IPay) => paypal.pay(data, {}, 'PayRecurrent')

const extraInfo = (data: IExtraInfo) => paypal.pay(data, new ExtraInfo(data), 'Pay,ExtraInfo')

export { pay, payRecurrent, extraInfo }
