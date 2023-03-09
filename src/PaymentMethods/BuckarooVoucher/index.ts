import { PayablePaymentMethod } from '../PayablePaymentMethod'

class Buckaroovoucher extends PayablePaymentMethod {
    protected _paymentName = 'buckaroovoucher'

    pay(payload) {
        return super.pay(payload)
    }
    refund(payload) {
        return super.refund(payload)
    }
    getBalance(payload) {
        this.action = 'GetBalance'
        return super.transactionRequest(payload)
    }
    deactivatevoucher(payload) {
        this.action = 'DeactivateVoucher'
        return super.transactionRequest(payload)
    }
    createApplication(payload) {
        this.action = 'CreateApplication'
        return super.transactionRequest(payload)
    }
}

let _buckaroovoucher: Buckaroovoucher
const buckaroovoucher: () => Buckaroovoucher = () => {
    if (!_buckaroovoucher) _buckaroovoucher = new Buckaroovoucher()
    return _buckaroovoucher
}
export default buckaroovoucher
