import AfterpayClass from '../Afterpay'

export default class AfterpayDigiAccept extends AfterpayClass {
    protected _paymentName = 'afterpaydigiaccept'
    protected _serviceVersion = 2
    pay(payload) {
        return super.pay(payload)
    }
    refund(payload) {
        return super.refund(payload)
    }
    authorize(payload) {
        return super.authorize(payload)
    }
    authorizeRemainder(payload) {
        return super.authorizeRemainder(payload)
    }
    cancelAuthorize(payload) {
        return super.cancelAuthorize(payload)
    }
    capture(payload) {
        return super.capture(payload)
    }
    payRemainder(payload) {
        return super.payRemainder(payload)
    }
}
