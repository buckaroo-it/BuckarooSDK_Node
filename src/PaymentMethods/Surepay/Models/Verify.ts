import { ITransaction } from '../../../Models/ITransaction'
import IBankAccount from '../../../Models/Services/IBankAccount'
import { ModelStrategy } from '../../../Utils/ModelStrategy'

export interface Verify {
    bankAccount: Required<Omit<IBankAccount, 'bic'>>
}
export type IVerify = Verify & ITransaction
export class surepayModelStrategy extends ModelStrategy<Verify> {
    constructor(data) {
        super(data)
        this.keys = {
            bankAccount: {
                accountName: 'customeraccountname'
            }
        }
    }
}
