import { Payload } from '../../../Models/ITransaction'

export interface IEmandate extends Payload {
    mandateReference: string
    collectdate?: string
}
