import { Payload } from '../../../Models/ITransaction'

export interface Generate extends Payload {
    amount: number
    amountIsChangeable: boolean
    purchaseId: string
    Description: string
    isOneOff: boolean
    expiration: string
    isProcessing?: boolean
    minAmount: number
    maxAmount: number
    imageSize: number
}
