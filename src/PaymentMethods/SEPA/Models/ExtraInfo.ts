import IAddress from '../../../Models/Services/IAddress'
import { Payload } from '../../../Models/ITransaction'
import { ModelStrategy } from '../../../Utils/ModelStrategy'

export interface ExtraInfo {
    bic: string
    iban: string
    collectDate: string
    mandateReference?: string
    mandateDate?: string
    customer: {
        name: string
        code: string
        accountName: string
        referenceParty: {
            code: string
            name: string
        }
    }
    address: IAddress
    contractID: string
}
export type IExtraInfo = ExtraInfo & Payload

export class ExtraInfoModelStrategy extends ModelStrategy<ExtraInfo> {
    constructor(data) {
        super(data)
        this.keys = {
            bic: 'customerbic',
            iban: 'customerIBAN',
            customer: {
                name: 'customerName',
                accountName: 'customeraccountname',
                code: 'customerName',
                referenceParty: {
                    code: 'customerReferencePartyCode',
                    name: 'customerReferencePartyName'
                }
            },
            address: {
                houseNumberAdditional: 'HouseNumberSuffix'
            }
        }
    }
}
