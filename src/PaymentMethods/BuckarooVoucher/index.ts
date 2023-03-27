import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { IPay } from './Models/Pay'
import { ITransaction, RefundPayload } from '../../Models/ITransaction'
import { ICreate } from './Models/Create'

class Buckaroovoucher extends PayablePaymentMethod {
    protected _paymentName = 'buckaroovoucher'

    pay(payload: IPay) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
    getBalance(payload: Pick<IPay, 'voucherCode'>) {
        this.action = 'GetBalance'
        this.setRequest(<ITransaction>payload)
        return this.dataRequest()
    }
    createApplication(payload: ICreate) {
        this.action = 'CreateApplication'
        this.setRequest(payload)
        return this.dataRequest()
    }
    deactivateVoucher(payload: Pick<IPay, 'voucherCode'>) {
        this.action = 'DeactivateVoucher'
        this.setRequest(<ITransaction>payload)
        return this.dataRequest()
    }
}

let _buckaroovoucher: Buckaroovoucher
const buckaroovoucher: () => Buckaroovoucher = () => {
    if (!_buckaroovoucher) _buckaroovoucher = new Buckaroovoucher()
    return _buckaroovoucher
}
export default buckaroovoucher
