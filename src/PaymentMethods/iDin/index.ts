import { PayablePaymentMethod } from '../PayablePaymentMethod'

class Payment extends PayablePaymentMethod {

    protected _paymentName = 'name'
    pay(payload?) {
        return super.pay(payload)
    }
    refund(payload){
        return super.refund(payload)
    }
}

let _payment:Payment
const payment:() => Payment = () => {
    if (!_payment)
        _payment = new Payment()
    return _payment
}
export default payment