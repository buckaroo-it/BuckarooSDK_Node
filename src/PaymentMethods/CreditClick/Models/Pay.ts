import { Payload } from '../../../Models/ITransaction'

export interface Pay extends Payload {
    firstName?: string
    lastName?: string
    email?: string
}
