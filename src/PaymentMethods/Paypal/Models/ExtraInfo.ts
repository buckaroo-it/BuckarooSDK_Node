import { Payload } from '../../../Models/ITransaction'
import IAddress from '../../../Models/Services/IAddress'
import { ModelStrategy } from '../../../Utils/ModelStrategy'

export interface ExtraInfo {
    costumer: {
        name: string
    }
    phone: {
        mobile: string
    }
    address: Omit<IAddress, 'houseNumber' | 'houseNumberAdditional'> & {
        street2: string
    }
    noShipping?: number
    addressOverride: boolean
}
export type IExtraInfo = ExtraInfo & Payload
export class PayPalModelStrategy extends ModelStrategy<ExtraInfo> {
    constructor(data) {
        super(data)
        this.keys = {
            address: {
                street: 'street1',
                city: 'cityName',
                state: 'stateOrProvince',
                zipcode: 'postalCode'
            }
        }
    }
}
