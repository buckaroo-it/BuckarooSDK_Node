import { ITransaction } from '../../../Models/ITransaction'

export interface ICreate extends ITransaction {
    groupReference?: string
    /**
     * 1 = Single
     * 2 = Multiple
     */
    usageType: 1 | 2
    validFrom: string
    validUntil?: string
    creationBalance: number
}
