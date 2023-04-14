import { ITransaction } from '../../../Models/ITransaction'

interface Create extends ITransaction {
    debtorReference: string
    sequenceType: 0 | 1
    purchaseId: string
    mandateId?: string
    language: string
    emandateReason?: string
    maxAmount?: number
}
export type ICreate = Create &
    ({ debtorBankId: string } | Required<Pick<ITransaction, 'continueOnIncomplete'>>)
