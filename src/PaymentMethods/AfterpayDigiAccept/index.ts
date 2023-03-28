import {AfterpayClass} from "../Afterpay";

class AfterpayDigiAccept extends AfterpayClass {
    protected _paymentName = 'afterpaydigiaccept'
    protected _serviceVersion = 2
    serviceParametersStrategy(data) {
        return data;
    }
    pay(payload) {
        return super.pay(payload)
    }
    refund(payload) {
        return super.refund(payload)
    }
    authorize(payload){
        return super.authorize(payload)
    }
    authorizeRemainder(payload){
        return super.authorizeRemainder(payload)
    }
    cancelAuthorize(payload){
        return super.cancelAuthorize(payload)
    }
    capture(payload) {
        return super.capture(payload)
    }
    payRemainder(payload){
        return super.payRemainder(payload)
    }

}

let _afterpaydigiaccept: AfterpayDigiAccept
const afterpaydigiaccept: () => AfterpayDigiAccept = () => {
    if (!_afterpaydigiaccept) _afterpaydigiaccept = new AfterpayDigiAccept()
    return _afterpaydigiaccept
}
export default afterpaydigiaccept
