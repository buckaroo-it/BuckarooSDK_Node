import Model from '../../../Models/Model'
import { IPayForm } from '../../../Models/PayForm'

export interface IPayRecurring extends IPayForm {
    invoice: string
    originalTransactionKey: string
    amountDebit: number
}
export default class PayRecurring extends Model {
    invoice: string = ''
    originalTransactionKey: string = ''
    amountDebit: number = 0

    constructor(data) {
        super()
        this.setParameters(data)
    }
}
