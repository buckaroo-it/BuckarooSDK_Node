import PaymentMethod from '../PaymentMethod'
import { IPayForm } from '../../Models/PayForm'

class PointOfSale extends PaymentMethod {
    constructor() {
        super({
            paymentName: 'pospayment'
        })
    }
}

const pointOfSale = new PointOfSale()

const pay = (data: IPayForm) => pointOfSale.pay(data, {})

export { pay }
