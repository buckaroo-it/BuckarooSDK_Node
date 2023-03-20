import { PayablePaymentMethod } from '../PayablePaymentMethod'
import {Pay} from "./Models/Pay";
import {Refund} from "./Models/Refund";

class CreditClick extends PayablePaymentMethod {
    protected _paymentName = 'creditclick'

    pay(payload:Pay) {
        return super.pay(payload)
    }
    refund(payload:Refund) {
        return super.refund(payload)
    }
}

let _creditClick: CreditClick
const creditClick: () => CreditClick = () => {
    if (!_creditClick) _creditClick = new CreditClick()
    return _creditClick
}
export default creditClick
