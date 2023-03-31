import { Payload } from '../../../Models/ITransaction'
import { ModelStrategy } from '../../../Utils/ModelStrategy'
import IPerson from '../../../Models/Services/IPerson'

export interface Pay {
    costumer: Pick<IPerson, 'firstName' | 'lastName'>
    email: string
}
export type IPay = Pay & Payload

export class Przelewy24ModelStrategy extends ModelStrategy<Pay> {
    constructor(data) {
        super(data)
        this.keys = {
            costumer: {
                firstName: 'customerFirstName',
                lastName: 'customerLastName'
            },
            email: 'customerEmail'
        }
    }
}
