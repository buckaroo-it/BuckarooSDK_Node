import { IPaymentRequest } from '../../../Models/IRequest'
import { ServiceParameter } from '../../../Models/ServiceParameters'

export interface ICardData extends IPaymentRequest {
    encryptedCardData: string
}
export class CardData extends ServiceParameter {
    set encryptedCardData(value: string) {
        this.set('encryptedCardData', value)
    }
}
