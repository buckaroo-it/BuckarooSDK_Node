import IAddress from '../../../Models/Services/IAddress'
import { IPay, Pay } from './Pay'
import { ServiceParameters } from '../../../Utils/ServiceParameters'
import { Payload } from '../../../Models/ITransaction'

export interface IExtraInfo extends Payload {
    bic: string
    iban: string
    mandateReference?: string
    mandateDate?: string
    collectDate?: string
    customer: {
        name: string
        code: string
        referenceParty: {
            code: string
            name: string
        }
    }
    address: IAddress
    contractID: string
}
export const ExtraInfo = (data: IExtraInfo) => {
    let address = new ServiceParameters(data.address)
    address.setParameterKeys({
        houseNumberAdditional: 'HouseNumberSuffix'
    })
    return {
        ...Pay(<IPay>data),
        address: address,
        mandateReference: data.mandateReference,
        mandateDate: data.mandateDate,
        customerName: data.customer.name,
        customerCode: data.customer.code,
        customerReferencePartyCode: data.customer.referenceParty.code,
        customerReferencePartyName: data.customer.referenceParty.name
    }
}
