import { ITransaction } from '../../../Models/ITransaction'

export interface IPay extends ITransaction {
    reservationNumber?: string
}
