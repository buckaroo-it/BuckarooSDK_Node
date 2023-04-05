import { PayablePaymentMethod } from '../PayablePaymentMethod'
import { IPay } from './Models/Pay'
import { RefundPayload } from '../../Models/ITransaction'
import { ICreate } from './Models/Create'

export default class Buckaroovoucher extends PayablePaymentMethod {
    protected _paymentName = 'buckaroovoucher'

    pay(payload: IPay) {
        return super.pay(payload)
    }
    refund(payload: RefundPayload) {
        return super.refund(payload)
    }
    getBalance(payload: Pick<IPay, 'voucherCode'>) {
        this.action = 'GetBalance'
        return this.dataRequest(payload)
    }
    createApplication(payload: ICreate) {
        this.action = 'CreateApplication'
        return this.dataRequest(payload)
    }
    deactivateVoucher(payload: Pick<IPay, 'voucherCode'>) {
        this.action = 'DeactivateVoucher'
        return this.dataRequest(payload)
    }
}
